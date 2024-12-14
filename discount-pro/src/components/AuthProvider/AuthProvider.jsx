import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.info";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Fetch data from brands.json
    fetch("/brands.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load brands data");
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((err) => {
        setError(err.message);
      });

    // Cleanup the auth listener when component is unmounted
    return () => unsubscribe();
  }, []);

  // Register With Email and Password
  const handelEmailLog = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update user profile
  const updateUser = (name, photo) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      return updateProfile(currentUser, {
        displayName: name,
        photoURL: photo,
      }).then(() => {
        setUser({
          ...currentUser,
          displayName: name,
          photoURL: photo,
        });
      });
    }
    return Promise.reject(new Error("No user is currently logged in"));
  };

  // Sign in a user with an email address and password
  const handelLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const handelGoogle = () => {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        return user;
      })
      .catch((error) => {
        setError(error.message);
        throw error;
      });
  };

  // Log out function using Firebase Auth
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("You have logged out successfully!");
        setUser(null);
      })
      .catch((error) => {
        toast.error("Failed to log out. Please try again.");
        setError(error.message);
      });
  };

  // Forgot Password
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    data,
    user,
    loading,
    error,
    logout,
    handelEmailLog,
    handelGoogle,
    handelLogin,
    forgotPassword,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
