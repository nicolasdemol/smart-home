import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth/react-native";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const signup = (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        return updateProfile(userCredential.user, {
          displayName: name,
        });
      })
      .catch((error) => {
        setError(error);
      });
  };

  const signout = () => {
    return signOut(auth)
      .then(() => setUser())
      .catch((error) => {
        setError(error);
      });
  };

  const updateDisplayName = (displayName) => {
    return updateProfile(user, {
      displayName: displayName,
    }).catch((error) => {
      setError(error);
    });
  };

  const updateAvatar = (photoURL) => {
    return updateProfile(user, {
      photoURL: photoURL,
    }).catch((error) => {
      setError(error);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthenticating(false);
    });
    return () => unsubscribe();
  });

  const values = {
    user,
    isAuthenticating,
    signin,
    signup,
    signout,
    updateDisplayName,
    updateAvatar,
  };

  return (
    <AuthContext.Provider value={values}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
};
