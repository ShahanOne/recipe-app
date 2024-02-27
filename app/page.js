'use client';
import LoginForm from '@/components/LoginForm';
import Navbar from '@/components/Navbar';
import RecipeCard from '@/components/Recipes/RecipeCard';
import RegisterForm from '@/components/RegisterForm';
import { Modal, Spin } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [allRecipes, setAllRecipes] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [loginOrRegister, setLoginOrRegister] = useState('login');
  const [fetchAgain, setFetch] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const isUser = localStorage.getItem('uid');
    if (isUser) {
      router.push('/user/home');
    } else {
      const fetchRecipes = async () => {
        try {
          const res = await axios.get('/api/recipes');
          setAllRecipes(res.data);
        } catch (err) {
          console.log('error');
        }
      };
      fetchRecipes();
    }
  }, [, fetchAgain]);
  return (
    <>
      {' '}
      <Navbar isSignedIn={false} signIn={() => setSigningIn(true)} />
      <div className="home_main p-4">
        <div className="all_recipes_div flex flex-col md:flex-row gap-8 py-4">
          {!allRecipes ? (
            <Spin tip="Loading..." />
          ) : allRecipes?.length > 0 ? (
            allRecipes.map((recipe, index) => {
              return (
                <RecipeCard
                  onClick={() => router.push(`/recipes?id=${recipe._id}`)}
                  key={index}
                  name={recipe?.name}
                  description={recipe?.description}
                  picture={recipe?.picture}
                  uploadedBy={recipe?.uploadedBy}
                />
              );
            })
          ) : (
            <p>There are no recipes available yet</p>
          )}
        </div>
      </div>
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
    </>
  );
};

export default Home;
