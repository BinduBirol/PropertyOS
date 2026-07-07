import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import api from 'src/api/axios';

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {

    const verifyToken = async () => {

      const token = localStorage.getItem('accessToken');

      if (!token) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }


      try {

        // Backend endpoint to verify JWT
        await api.get('/v1/me');

        setAuthenticated(true);

      } catch (error) {

        localStorage.removeItem('accessToken');

        setAuthenticated(false);

      } finally {

        setLoading(false);

      }
    };


    verifyToken();

  }, []);


  if (loading) {
    return <div>Checking authentication...</div>;
  }


  if (!authenticated) {
    return <Navigate to="/sign-in" replace />;
  }


  return <>{children}</>;
}