import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1000); // 1 second delay to show message

    return () => clearTimeout(timer); // cleanup on unmount
  }, [navigate]);

  return <p>Logging out...</p>;
}
