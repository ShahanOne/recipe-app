import Image from 'next/image';
import React from 'react';

const RecipeCard = ({
  name,
  description,
  picture,
  uploadedBy,
  onClick,
  onEditClick,
  isUser,
}) => {
  return (
    <div
      className="recipe_card rounded-md shadow-lg p-4 cursor-pointer"
      onClick={onClick}
    >
      <Image
        className="rounded-md w-full object-cover"
        src={'/pasta.jpg'}
        alt="recipe_picture"
        // layout="responsive"
        width={150}
        height={200}
      />
      <p className="font-bold text-lg my-2">{name}</p>
      <p className="text-sm">{description?.slice(0, 25) + '...'}</p>
      <div className="font-bold text-sm text-end mt-2">
        {!isUser ? (
          <span className="bg-slate-50 p-1 rounded hover:shadow-sm">
            {uploadedBy}
          </span>
        ) : (
          <button
            className="bg-orange-400 text-white px-2 my-2 rounded font-normal"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick();
            }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
