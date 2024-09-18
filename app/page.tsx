'use client';

import http from '@/lib/http';
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

  return (
    <div>
      {JSON.stringify(user)}
      <h1>Home Page</h1>
      <h3>Xin chào các bạn mình là nguyễn chí hào</h3>
    </div>
  );
}
