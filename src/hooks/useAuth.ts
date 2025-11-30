// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { auth } from "@/firebase/config";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error: any) {
      console.error("Google sign-in error:", error.message);
      alert("Failed to sign in with Google. Please try again.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      window.location.reload();
    } catch (error: any) {
      console.error("Sign out error:", error.message);
    }
  };

  return { user, loading, loginWithGoogle, logout };
};