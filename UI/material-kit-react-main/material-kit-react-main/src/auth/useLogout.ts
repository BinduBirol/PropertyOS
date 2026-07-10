import { useNavigate } from 'react-router-dom';

import { logout } from 'src/api/authApi';
import { authStorage } from './authStorage';

export function useLogout() {
  const navigate = useNavigate();

  return async () => {
    const refreshToken = authStorage.getRefreshToken();

    try {
      if (refreshToken) {
        await logout(refreshToken);
      }
    } finally {
      authStorage.clear();

      navigate('/sign-in?reason=logged_out', {
        replace: true,
      });
    }
  };
}