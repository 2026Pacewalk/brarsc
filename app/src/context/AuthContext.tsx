import React, { createContext, useContext, useState, useCallback } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'superadmin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'student' | 'superadmin', adminCode?: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('brar_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string, role: 'student' | 'superadmin', adminCode?: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (role === 'superadmin') {
      if (adminCode !== 'ADMIN123') {
        return false;
      }
      const superAdmin: User = {
        id: 'admin-1',
        name: 'Super Admin',
        email,
        role: 'superadmin',
      };
      setUser(superAdmin);
      localStorage.setItem('brar_user', JSON.stringify(superAdmin));
      return true;
    }

    if (email && password) {
      const student: User = {
        id: 'student-' + Date.now(),
        name: email.split('@')[0],
        email,
        role: 'student',
      };
      setUser(student);
      localStorage.setItem('brar_user', JSON.stringify(student));
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (name && email && password) {
      const student: User = {
        id: 'student-' + Date.now(),
        name,
        email,
        role: 'student',
      };
      setUser(student);
      localStorage.setItem('brar_user', JSON.stringify(student));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('brar_user');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
