import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store'; // Certifique-se de que AppDispatch está corretamente importado
import { login } from '../redux/actions/auth_actions';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 bg-white shadow-lg rounded'>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='border p-2 rounded w-full mb-4' required />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='border p-2 rounded w-full mb-4'
          required
        />
        <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
