import firebaseAuthentication from "../Firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";

firebaseAuthentication();
const auth = getAuth();
const useFirebase = () => {
  const [user, setuser] = useState(null);
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //   manuallySignUp
  const manuallySignUp = (email, pass, name, profile) => {
    createUserWithEmailAndPassword(auth, email, pass).then((result) => {
      const userInfo = result.user;
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: profile.startsWith("https")
          ? profile
          : "https://i.ibb.co/SJQMSqC/profile.png",
      })
        .then(() => {})
        .catch((error) => {
          const errorMessage = error.message;
          setErrors(errorMessage);
        });
      setuser(userInfo);
      setIsLoading(false);
    });
  };

  // user manually sign in-
  const manuallySignIn = (email, password, from, history) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const userInfo = result.user;
        setuser(userInfo);
        setIsLoading(false);
        // history.push(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrors(errorMessage);
        setIsLoading(false);
      });
  };

  // obserbing redering---
  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user);
        setIsLoading(false);
      } else {
        setuser(null);
        setIsLoading(false);
      }
    });
  }, []);

  //   logout
  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrors(errorMessage);
      });
  };

  return {
    user,
    isLoading,
    errors,
    manuallySignUp,
    manuallySignIn,
    logOut,
  };
};

export default useFirebase;
