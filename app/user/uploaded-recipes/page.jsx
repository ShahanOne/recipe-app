'use client';
import Navbar from '@/components/Navbar';
import AddOrEditRecipeForm from '@/components/Recipes/AddOrEditRecipeForm';
import RecipeCard from '@/components/Recipes/RecipeCard';
import { Modal, Spin } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const UploadedRecipes = () => {
  const [fetchAgain, setFetch] = useState(0);
  const [recipes, setRecipes] = useState();
  const [recipeToEdit, setRecipeToEdit] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editOrAdd, setEditOrAdd] = useState('edit');
  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem('uid');
    const fetchRecipes = async () => {
      try {
        const res = await axios.post('/api/user/uploaded-recipes', {
          userId: userId,
        });
        setRecipes(res.data);
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
    <div>
      {' '}
      <Navbar isSignedIn={true} signOut={signOut} />
      {!recipes ? (
        <div className="text-center">
          <Spin tip="Loading..." />
        </div>
      ) : recipes?.length > 0 ? (
        <div className="all_recipes_div flex gap- p-4">
          {recipes.map((recipe, index) => {
            return (
              <RecipeCard
                key={index}
                isUser={true}
                onClick={() => router.push(`/recipes?id=${recipe._id}`)}
                onEditClick={() => {
                  setEditOrAdd('edit');
                  setRecipeToEdit(recipe);
                  setShowEditModal(true);
                }}
                name={recipe?.name}
                description={recipe?.description}
                picture={recipe?.picture}
                uploadedBy={recipe?.uploadedBy}
              />
            );
          })}
        </div>
      ) : (
        <div className=" p-4">
          <p>There are no recipes available yet</p>
          <button
            className="bg-orange-400 rounded-lg shadow-md my-2 px-4 py-2 text-white hover:bg-orange-500"
            onClick={() => {
              setEditOrAdd('add');
              setShowEditModal(true);
            }}
          >
            Add recipe
          </button>
        </div>
      )}
      <Modal
        width={'auto'}
        centered
        title={
          <div style={{ textAlign: 'center', fontWeight: '400' }}>
            Add your exciting Recipe
          </div>
        }
        className="invite_modal"
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={[]}
      >
        <AddOrEditRecipeForm
          operation={editOrAdd}
          recipeData={recipeToEdit}
          addedOrEdited={() => {
            setShowEditModal(false);
            setFetch((prev) => (prev += 1));
          }}
          closeModal={() => setShowEditModal(false)}
        />
      </Modal>
    </div>
  );
};

export default UploadedRecipes;
