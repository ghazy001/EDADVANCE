import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'user';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/current-user', {
          withCredentials: true,
        });
        if (response.data) {
          setUser({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            role: response.data.role
          });
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post('http://localhost:3000/user/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
      <AuthContext.Provider value={{ user, loading, setUser, logout }}>
        {children}
      </AuthContext.Provider>
  );
};