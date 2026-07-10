export const authStorage = {
  getAccessToken: () => localStorage.getItem('accessToken'),

  getRefreshToken: () => localStorage.getItem('refreshToken'),

  getRole: () => localStorage.getItem('role'),

  saveTokens(accessToken: string, refreshToken: string, role: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('role', role);
  },

  clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
  },
};
