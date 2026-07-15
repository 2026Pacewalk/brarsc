import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { readStored, writeStored, clearStored } from '@/lib/storage';

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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Intentional post-mount setState: the prerendered HTML is shared by every
    // visitor, so per-user state must not exist until after hydration or the
    // markup would not match. The one extra render is the cost of that.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(readStored<User | null>('brar_user', null));
  }, []);

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
      writeStored('brar_user', superAdmin);
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
      writeStored('brar_user', student);
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
      writeStored('brar_user', student);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    clearStored('brar_user');
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
