import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const RegisterForm = ({ toLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

  const register = async () => {
    if (password !== confirmPassword || !isValidEmail) {
      return;
    }
    try {
      const res = await axios.post('/api/user/register', {
        username: username,
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
        {' '}
        <label htmlFor="username">Create Username</label>
        <input
          className="rounded p-2 bg-slate-50 outline-none my-2 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        />
      </div>
      <div className="pb-4">
        <label htmlFor="email">Email</label>
        <input
          className="rounded p-2 bg-slate-50 outline-none my-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />
      </div>
      <div className="pb-4">
        {' '}
        <label htmlFor="password">Create Password</label>
        <input
          className="rounded p-2 bg-slate-50 outline-none my-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
        />
      </div>

      <div className="pb-4">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          className="rounded p-2 bg-slate-50 outline-none my-2 w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          id="confirm-password"
        />
      </div>

      <button
        onClick={() =>
          !email || !password || !confirmPassword || !username
            ? alert('Please fill in all the fields')
            : register()
        }
        className={`bg-orange-400 text-white px-4 py-2 rounded ${
          !email || !password || !confirmPassword || !username
            ? ''
            : 'focus:animate-pulse'
        }`}
      >
        Register
      </button>
      <p className="text-orange-400 py-2">Already have an account?</p>
      <button
        onClick={() => toLogin()}
        className="bg-orange-50 text-orange-500 px-4 py-2 rounded "
      >
        Login
      </button>
    </div>
  );
};

export default RegisterForm;
