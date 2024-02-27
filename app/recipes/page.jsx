'use client';
import LoginForm from '@/components/LoginForm';
import Navbar from '@/components/Navbar';
import RegisterForm from '@/components/RegisterForm';
import { Modal } from 'antd';
import axios from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Recipe = () => {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get('id');
  const [recipeData, setRecipeData] = useState();
  const [isSignedIn, setSignedIn] = useState();
  const [signingIn, setSigningIn] = useState(false);
  const [loginOrRegister, setLoginOrRegister] = useState('login');

  const router = useRouter();
  useEffect(() => {
    const isUser = localStorage.getItem('uid');
    if (isUser) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
    const fetchRecipe = async () => {
      try {
        const res = await axios.post('/api/recipes', { recipeId: recipeId });
        if (res.data) {
          setRecipeData(res.data);
        }
      } catch (err) {
        console.log('error');
      }
    };
    fetchRecipe();
  }, [, recipeId]);
  const signOut = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('u_name');
    router.push('/');
  };
  return (
    <>
      {' '}
      {isSignedIn ? (
        <Navbar isSignedIn={true} signOut={signOut} />
      ) : (
        <Navbar isSignedIn={false} signIn={() => setSigningIn(true)} />
      )}
      <div className="px-8 py-4">
        <p className="font-bold text-3xl text-slate-700">{recipeData?.name}</p>
        <p>
          Uploaded by :{' '}
          <span className="text-xl text-orange-600">
            {' '}
            {recipeData?.uploadedBy}
          </span>
        </p>
        <Image
          src={recipeData?.picture ? recipeData.picture : '/pasta.jpg'}
          className="w-[100%] h-[200px] object-cover my-8"
          layout="responsive"
          width={400}
          height={100}
          alt="recipe-image"
        />
        <div className="my-4">
          <p className="font-bold text-lg text-slate-600">Description :-</p>
          <p className="bg-orange-50 rounded-lg p-2">
            {recipeData?.description}
          </p>{' '}
        </div>
        <div className="my-4">
          <p className="font-bold text-lg text-slate-600">Ingredients :-</p>
          <div className="flex gap-4">
            {recipeData?.ingredients.length > 0 &&
              recipeData?.ingredients.map((ingredient, index) => {
                return (
                  <button
                    key={index}
                    className="bg-slate-50 p-1 rounded shadow-sm"
                  >
                    {ingredient}
                  </button>
                );
              })}
          </div>
        </div>
        <div className="my-4">
          <p className="font-bold text-lg text-slate-600">Steps :-</p>
          <div className="flex flex-col gap-2">
            {' '}
            {recipeData?.steps.length > 0 &&
              recipeData?.steps.map((step, index) => {
                return (
                  <p key={index} className="bg-orange-50 rounded-lg p-2">
                    Step {index + 1}:{' '}
                    <span className="text-slate-600 text-lg">{step}</span>
                  </p>
                );
              })}
          </div>
        </div>
      </div>
      {!isSignedIn && (
        <Modal
          centered
          title={
            <div style={{ textAlign: 'center', fontWeight: '400' }}>
              Login or Register {':)'}
            </div>
          }
          className=""
          open={signingIn}
          onCancel={() => setSigningIn(false)}
          footer={[]}
        >
          {' '}
          {loginOrRegister === 'login' ? (
            <LoginForm toRegister={() => setLoginOrRegister('register')} />
          ) : (
            <RegisterForm toLogin={() => setLoginOrRegister('login')} />
          )}
        </Modal>
      )}
    </>
  );
};
export default Recipe;
