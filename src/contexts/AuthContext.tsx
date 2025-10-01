import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import AuthService from '../services/authService';

interface User {
  email: string;
  name: string;
  phone?: string;
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
          const userData = JSON.parse(savedUser);
          
          // Validate token with server
          try {
            const response = await AuthService.validateToken();
            if (response.success && response.data?.valid) {
              setUser(userData);
            } else {
              // Token invalid, clear storage
              localStorage.removeItem('authToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
            }
          } catch (error) {
            // If validation fails, try to get current user info
            try {
              const userResponse = await AuthService.getCurrentUser();
              if (userResponse.success && userResponse.data) {
                const updatedUser = {
                  email: userResponse.data.email,
                  name: userResponse.data.name,
                  phone: userResponse.data.phone,
                  isLoggedIn: true,
                };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
              } else {
                throw new Error('Cannot get user info');
              }
            } catch (userError) {
              // Clear all auth data if both validation and user fetch fail
              localStorage.removeItem('authToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
            }
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      // Call logout API
      await AuthService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state and storage regardless of API call result
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user?.isLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
