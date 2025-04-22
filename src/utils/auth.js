// utils/auth.js
export const saveToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');

export const saveUsername = (username) => localStorage.setItem('username', username);
export const getUsername = () => localStorage.getItem('username');
export const removeUsername = () => localStorage.removeItem('username');

export const isAuthenticated = () => !!getToken();
