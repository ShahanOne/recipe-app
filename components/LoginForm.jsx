import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = ({ toRegister }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

  const login = async () => {
    if (!isValidEmail) {
      return;
    }
    try {
      const res = await axios.post('/api/user/login', {
        email: email,
        password: password,
      });
      if (res.data.username) {
        localStorage.setItem('uid', res.data._id);
        localStorage.setItem('u_name', res.data.username);
        router.push('/user/home');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-4 flex flex-col">
      <div className="pb-4">
        <label htmlFor="email">Email</label>
        <input
          className="rounded p-2  bg-slate-50 outline-none my-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />
      </div>
      <div className="pb-4">
        {' '}
        <label htmlFor="password">Password</label>
        <input
          className="rounded p-2  bg-slate-50 outline-none my-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
        />
      </div>

      <button
        onClick={() =>
          !email || !password ? alert('Please fill in all the fields') : login()
        }
        className={` bg-orange-400 text-white px-4 py-2 rounded ${
          !email || !password ? '' : 'focus:animate-pulse'
        }`}
      >
        Login
      </button>
      <p className="text-orange-400 py-2">Dont have an account yet?</p>
      <button
        onClick={() => toRegister()}
        className="bg-orange-50 text-orange-500 px-4 py-2 rounded"
      >
        Register
      </button>
    </div>
  );
};

export default LoginForm;
