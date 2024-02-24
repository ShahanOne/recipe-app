import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [description, setDescripton] = useState();
  const [picture, setPicture] = useState();
  const [pictureUrl, setPictureUrl] = useState();

  const router = useRouter();

  const uploadImage = async () => {
    // const data = new FormData();
    // data.append('file', picture);
    // data.append('upload_preset', 'poster_upload');
    // data.append('cloud_name', process.env.CLOUD_NAME);
    // const res = await axios.post(
    //   'https://api.cloudinary.com/v1_1/dimzcf9j8/image/upload',
    //   { data }
    // );
    // setPictureUrl(res.data.url);
  };
  // console.log(pictureUrl);

  const addMovie = async () => {
    try {
      const res = await axios.post('/api/recipes', {
        name: name,
        description: description,
        picture: pictureUrl,
      });
      if (res.data) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-4 flex flex-col">
      <div>
        <label htmlFor="name">Name</label>
        <input
          className="rounded p-2 bg-orange-100 text-amber-700 outline-none m-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          className="rounded p-2 bg-orange-100 text-amber-700 outline-none m-2"
          value={description}
          onChange={(e) => setDescripton(e.target.value)}
          id="description"
        />
      </div>{' '}
      <div>
        {' '}
        <label htmlFor="picture">Display Picture</label>
        <input
          className="rounded p-2 bg-orange-100 text-amber-700 outline-none m-2"
          type="file"
          accept="image/png, image/jpeg,image/jpg,image/webp"
          onChange={(e) => setPicture(e.target.files[0])}
          id="picture"
        />
      </div>
      <button
        onClick={() => uploadImage()}
        className="bg-orange-400 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      <button
        onClick={() => addMovie()}
        className="bg-orange-400 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
};

export default AddRecipe;
