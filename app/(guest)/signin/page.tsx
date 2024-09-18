'use client';
import { signIn } from 'next-auth/react';
import React from 'react';
export default function Page() {
  const handleLogin = async () => {
    const formData = {
      email: 'trungquandev.official@gmail.com',
      password: 'trungquandev@123',
    };

    signIn('credentials', { ...formData, redirect: false });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
