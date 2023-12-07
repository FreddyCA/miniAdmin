import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
});

export default function UserFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authStateChanged = async (user) => {
    setIsLoading(true);
    if (!user) {
      setAuthUser(null);
      setIsLoading(false);
      return;
    }
    setAuthUser({
      uid: user.uid,
      email: user.email,
    });
    setIsLoading(false);
  };

  // registro de nuevos usuarios
  const register = async (email, password) => {
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setAuthUser({
        uid: user.uid,
        email: user.email,
      });

      setIsLoading(false);
    } catch (error) {
      console.log("Error al registrar el usuario:", error.message);
      setAuthUser(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsuscribe();
  }, []);

  return {
    authUser,
    isLoading,
    register,
  };
}

export function AuthUserProvider({ children }) {
  const auth = UserFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext);
