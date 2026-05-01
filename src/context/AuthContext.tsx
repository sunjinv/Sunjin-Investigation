import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  refreshUserData: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async (uid: string, email: string | null) => {
    if (email === 'ops.yu@sunjinv.com') {
      setIsAdmin(true);
      return;
    }
    try {
      const adminDoc = await getDoc(doc(db, 'admins', uid));
      setIsAdmin(adminDoc.exists());
    } catch (e) {
      setIsAdmin(false);
    }
  };

  const refreshUserData = async () => {
    if (user) {
      await checkAdminStatus(user.uid, user.email);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await checkAdminStatus(user.uid, user.email);
        // Sync user doc
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          lastLogin: new Date().toISOString()
        }, { merge: true });
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
