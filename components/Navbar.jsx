'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const Navbar = ({ isSignedIn, signOut, signIn }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between bg-orange-400 text-white p-4 ">
      <p className="text-xl font-bold">Recipeas</p>
      <div className="flex justify-center gap-4 md:gap-12">
        <p
          className=" cursor-pointer"
          onClick={() =>
            isSignedIn ? router.push('/user/home') : router.push('/user/home')
          }
        >
          Home
        </p>
        {isSignedIn && (
          <p
            className=" cursor-pointer"
            onClick={() => router.push('/user/uploaded-recipes')}
          >
            My Recipes
          </p>
        )}
        <p
          className=" cursor-pointer"
          onClick={() => (isSignedIn ? signOut() : signIn())}
        >
          {isSignedIn ? 'SignOut' : 'SignIn'}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
