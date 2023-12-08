import { createContext, useContext, useEffect, useState } from "react";
// importando las referencias
import { auth, firestoreDB, storage } from "./firebase";

// importando lo necesario para auth
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

// importando para firestore
import { doc, setDoc } from "firebase/firestore";

// importando para storage
import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

// creando el contexto
const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
});

export default function UserFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // crearlo en el context de arriba
  const [errorCode, setErrorCode] = useState(null);

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
  const register = async (
    name,
    email,
    password,
    curso,
    idCurso,
    rol,
    date,
    dateDB,
    fileUser
  ) => {
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Actualizar el perfil del usuario con el nombre
      // await updateProfile(user, { name });

      // subir su foto o pdf
      const fileRef = ref(storage, `imagesUsers/${user.uid}`);
      await uploadBytesResumable(fileRef, fileUser);
      const fileURL = await getDownloadURL(fileRef);
      const metaData = await getMetadata(fileRef);
      const fileType = metaData.contentType;

      // subir info a firesotre
      const userDocRef = doc(firestoreDB, "usuarios", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        name: name,
        email: email,
        curso: curso,
        idCurso: idCurso,
        rol: rol,
        date: date,
        dateDB: dateDB,
        comprobante: fileURL,
        fileType: fileType,
      });

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

  // para login
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
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
      setErrorCode(null);
    } catch (error) {
      console.log("Error al iniciar sesión", error.message);
      setAuthUser(null);
      setIsLoading(false);
      setErrorCode(error.code);
    }
  };

  // para cerrar sesión
  const logout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      setAuthUser(null);
      setIsLoading(false);
    } catch (error) {
      console.log("error al cerrar sesión", error.message);
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
    errorCode,
    register,
    login,
    logout,
  };
}

export function AuthUserProvider({ children }) {
  const auth = UserFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext);
