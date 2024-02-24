import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        // router.push('/user/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-4 flex flex-col">
      <div>
        <label htmlFor="email">Email</label>
        <input
          className="rounded p-2 text-amber-700 outline-none m-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />
      </div>
      <div>
        {' '}
        <label htmlFor="password">Password</label>
        <input
          className="rounded p-2 text-amber-700 outline-none m-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
        />
      </div>

      <button
        onClick={() => login()}
        className="bg-orange-400 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;
