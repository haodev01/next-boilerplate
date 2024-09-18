'use client';

import http from '@/lib/http';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState({});
  const getDashboard = async () => {
    try {
      const response = await http.get(
        'http://localhost:8017/v1/dashboards/access',
      );
      setUser(response.data);

      return response;
    } catch (error) {
      //errror
    }
  };
  useEffect(() => {
    getDashboard();
  }, []);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div>
      {JSON.stringify(user)}
      <button onClick={handleLogout}>Signout</button>
      <h1>Home Page</h1>
      <h3>Xin chào các bạn mình là nguyễn chí hào</h3>
    </div>
  );
}
