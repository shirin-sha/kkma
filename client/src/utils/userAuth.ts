const TOKEN_KEY = 'user_token';
const USER_KEY = 'user_data';

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export const setUserToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getUserToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeUserToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const setUserData = (user: UserData): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserData = (): UserData | null => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const isUserAuthenticated = (): boolean => {
  return !!getUserToken();
};

export const logout = (): void => {
  removeUserToken();
  window.location.href = '/user';
};

