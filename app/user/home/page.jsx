'use client';
import Navbar from '@/components/Navbar';
import AddRecipeForm from '@/components/Recipes/AddOrEditRecipeForm';
import RecipeCard from '@/components/Recipes/RecipeCard';
import { Modal, Spin } from 'antd';
import axios, { all } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [allRecipes, setAllRecipes] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const [fetchAgain, setFetch] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get('/api/recipes');
        setAllRecipes(res.data);
      } catch (err) {
        console.log('error');
      }
    };
    fetchRecipes();
  }, [, fetchAgain]);
  const signOut = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('u_name');
    router.push('/');
  };
  return (
    <>
      {' '}
      <Navbar isSignedIn={true} signOut={signOut} />
      <div className="home_main p-4">
        <div className="add_your_recipe flex justify-center">
          {' '}
          <button
            className="bg-orange-400 rounded-lg shadow-md my-2 px-4 py-2 text-white hover:bg-orange-500"
            onClick={() => setShowAddModal(true)}
            // onClick={() => router.push('/user/add-recipe')}
          >
            Add new recipe
          </button>
        </div>

        <div className="all_recipes_div grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 py-4">
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
        <Modal
          width={'auto'}
          centered
          title={
            <div style={{ textAlign: 'center', fontWeight: '400' }}>
              Add your exciting Recipe
            </div>
          }
          className="invite_modal"
          open={showAddModal}
          onCancel={() => setShowAddModal(false)}
          footer={[]}
        >
          <AddRecipeForm
            operation={'add'}
            added={() => {
              setShowAddModal(false);
              setFetch((prev) => (prev += 1));
            }}
            closeModal={() => setShowAddModal(false)}
          />
        </Modal>
      </div>
    </>
  );
};

export default Home;
