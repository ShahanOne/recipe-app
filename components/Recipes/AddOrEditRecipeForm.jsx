import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AddOrEditRecipeForm = ({
  operation,
  addedOrEdited,
  recipeData,
  closeModal,
}) => {
  const [name, setName] = useState('');
  const [ingredientInput, setIngredientInput] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [stepInput, setStepInput] = useState();
  const [steps, setSteps] = useState([]);
  const [showStepInput, setShowStepInput] = useState(false);
  const [description, setDescripton] = useState();
  const [picture, setPicture] = useState();
  const [pictureUrl, setPictureUrl] = useState();
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('uid');
    const userName = localStorage.getItem('u_name');
    setUser({ name: userName, id: userId });
    if (operation === 'edit') {
      setName(recipeData?.name);
      setDescripton(recipeData?.description);
      setIngredients([...recipeData?.ingredients]);
      setSteps([...recipeData?.steps]);
      // setPicture();
      // setPictureUrl();
    }
  }, []);

  const uploadImage = async () => {
    //   const data = new FormData();
    //   data.append('file', picture);
    //   data.append('upload_preset', 'poster_upload');
    //   data.append('cloud_name', process.env.CLOUD_NAME);
    //   const res = await axios.post(
    //     'https://api.cloudinary.com/v1_1/image/upload',
    //     { data }
    //   );
    //   setPictureUrl(res.data.url);
  };
  // console.log(pictureUrl);

  const operateOnMovie = async () => {
    if (operation === 'add') {
      try {
        const res = await axios.post('/api/user/add-recipe', {
          name: name,
          ingredients: ingredients,
          steps: steps,
          description: description,
          picture: pictureUrl ? pictureUrl : '',
          userId: user?.id,
          userName: user?.name,
        });
        if (res.data) {
          console.log(res.data);
          addedOrEdited();
          setDescripton();
          setIngredients();
          setName();
          setSteps();
          setPicture();
          setPictureUrl();
        }
      } catch (err) {
        console.log(err);
      }
      closeModal();
    } else if (operation === 'edit') {
      try {
        const res = await axios.post('/api/user/edit-recipe', {
          recipeId: recipeData._id,
          newName: name,
          newIngredients: ingredients,
          newSteps: steps,
          newDescription: description,
          newPicture: pictureUrl ? pictureUrl : '',
          userId: user?.id,
        });
        if (res.data) {
          addedOrEdited();
          setDescripton();
          setIngredients();
          setName();
          setSteps();
          setPicture();
          setPictureUrl();
        }
      } catch (err) {
        console.log(err);
      }
      closeModal();
    }
  };
  return (
    <div className=" flex flex-col bg-white text-slate-600">
      <div className="">
        <label htmlFor="name">Name</label>
        <input
          className="rounded p-2 bg-slate-50 outline-none my-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
        />
      </div>
      <div className="">
        <label htmlFor="description">Description</label>
        <textarea
          className="rounded p-2 bg-slate-50 outline-none my-2 w-full"
          value={description}
          onChange={(e) => setDescripton(e.target.value)}
          id="description"
        />
      </div>{' '}
      <div className="py-2">
        <label htmlFor="ingredients" className="flex justify-between">
          <p>Ingredients</p>{' '}
          {ingredientInput && (
            <p className="text-xs text-orange-600 flex items-center">
              Press enter to save !
            </p>
          )}
        </label>
        <input
          className="rounded p-2 bg-slate-50 outline-none my-2 w-full"
          placeholder="add ingredients"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter' && e.target.value !== '') {
              setIngredients((prev) => [...prev, e.target.value]);
              setIngredientInput('');
            }
          }}
          id="ingredients"
        />

        <div className="grid grid-cols-1 gap-4">
          {ingredients?.map((ingredient, index) => (
            <button
              key={index}
              className="p-1 rounded bg-slate-100 text-slate-600 "
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>
      <div className="py-2">
        <p>Steps :-</p>
        <div className="flex flex-col gap-2">
          {steps?.map((step, index) => (
            <p key={index} className="px-2 bg-slate-50 text-slate-600">
              Step {index + 1} : {step}
            </p>
          ))}
        </div>
        {showStepInput ? (
          <input
            className="rounded p-2 bg-slate-50 outline-none my-2 w-full"
            placeholder="input step"
            value={stepInput}
            onChange={(e) => setStepInput(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter' && e.target.value !== '') {
                setSteps((prev) => [...prev, e.target.value]);
                setStepInput('');
                setShowStepInput(false);
              }
            }}
            id="ingredients"
          />
        ) : (
          <button
            className="bg-slate-400 text-white px-2 my-2 rounded"
            onClick={() => setShowStepInput(true)}
          >
            Add
          </button>
        )}
      </div>
      <div className="">
        {' '}
        <label htmlFor="picture">Display Picture Url</label>
        <input
          className="rounded p-2 bg-slate-50 outline-none my-2 w-full"
          value={picture}
          onChange={(e) => setPictureUrl(e.target.value)}
          id="picture"
        />
        <p className="text-center">Or</p>
        <label htmlFor="picture" className="text-xs">
          (Feature Not Available)
        </label>
        <input
          hidden
          className="rounded p-2 bg-slate-50 outline-none my-2 w-full"
          type="file"
          accept="image/png, image/jpeg,image/jpg,image/webp"
          // onChange={(e) => setPicture(e.target.files[0])}
          onClick={() => alert('This feature will be available soon')}
          id="picture"
          disabled
        />
      </div>
      <button
        onClick={() => uploadImage()}
        className="bg-slate-100 text-slate-600 hover:shadow-sm px-4 py-2 rounded"
      >
        Upload
      </button>
      <br />
      <button
        onClick={() =>
          !name ||
          !ingredients.length > 0 ||
          !steps.length > 0 ||
          !description ||
          !pictureUrl
            ? alert('Please fill in all the fields')
            : operateOnMovie()
        }
        className={`bg-orange-400 text-white px-4 py-2 rounded ${
          !name ||
          !ingredients.length > 0 ||
          !steps.length > 0 ||
          !description ||
          !pictureUrl
            ? ''
            : 'focus:animate-pulse'
        }`}
      >
        {operation === 'edit' ? 'Save' : 'Add'}
      </button>
    </div>
  );
};

export default AddOrEditRecipeForm;
