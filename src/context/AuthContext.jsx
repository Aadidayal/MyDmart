import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      // Fetch user data
      fetchUserData(storedToken);
    }
  }, []);

  const fetchUserData = async (authToken) => {
    try {
      const response = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      console.log('Signup attempt with data:', userData);
      console.log('API URL:', API_URL);
      const response = await axios.post(`${API_URL}/signup`, userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      token, 
      user, 
      login, 
      signup, 
      logout,
      isAdmin: user?.role === 'admin' 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 