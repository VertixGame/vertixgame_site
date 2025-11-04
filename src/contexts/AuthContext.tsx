import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'employee';
  name?: string;
  avatar?: string;
  points?: number;
  level?: number;
  companyId?: string;
  profileId?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for existing session in localStorage
    const checkSession = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Session check error:', error);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log('AuthContext: Starting login process');
      
      // Mock login - em produção seria substituído por autenticação real
      if (email === 'admin@vertix.com' && password === 'admin123') {
        const mockUser: User = {
          id: 'mock-admin-id',
          email: 'admin@vertix.com',
          role: 'admin',
          name: 'Administrador',
          points: 100,
          level: 5,
          companyId: 'mock-company-id',
          profileId: 'mock-profile-id'
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        console.log('AuthContext: Login successful');
      } else if (email === 'employee@vertix.com' && password === 'employee123') {
        const mockUser: User = {
          id: 'mock-employee-id',
          email: 'employee@vertix.com',
          role: 'employee',
          name: 'Funcionário',
          points: 50,
          level: 2,
          companyId: 'mock-company-id',
          profileId: 'mock-employee-profile-id'
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        console.log('AuthContext: Login successful');
      } else {
        throw new Error('E-mail ou senha incorretos');
      }
    } catch (error) {
      console.error('AuthContext: Login failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      console.log('AuthContext: Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      // Always clear local user state regardless of error
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}