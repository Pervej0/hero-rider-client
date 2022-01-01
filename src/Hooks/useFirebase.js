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
  const [isAdmin, setIsAdmin] = useState(false);

  //   manuallySignUp
  const manuallySignUp = (email, pass, name, profile, location, navigate) => {
    createUserWithEmailAndPassword(auth, email, pass).then((result) => {
      const userInfo = result.user;
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: profile.startsWith("https")
          ? profile
          : "https://i.ibb.co/SJQMSqC/profile.png",
      })
        .then(() => {
          const destination = location?.state?.from || "/";
          navigate(destination);
        })
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

  // check user admin or not
  useEffect(() => {
    fetch(`https://guarded-oasis-87785.herokuapp.com/admin/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.admin);
      });
  }, [user]);

  return {
    user,
    isLoading,
    errors,
    isAdmin,
    manuallySignUp,
    manuallySignIn,
    logOut,
  };
};

export default useFirebase;
