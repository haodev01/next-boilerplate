'use client';
import { signIn } from 'next-auth/react';
import React from 'react';
export default function Page() {
  const handleLogin = async () => {
    const formValues = {
      email: 'trungquandev.official@gmail.com',
      password: 'trungquandev@123',
    };

    signIn('credentials', { ...formValues, redirectTo: '/' });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
