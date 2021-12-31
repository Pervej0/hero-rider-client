import firebaseAuthentication from "../Firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";

firebaseAuthentication();
const auth = getAuth();
const useFirebase = () => {
  const [users, setUsers] = useState(null);
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //   manuallySignUp
  const manuallySignUp = (email, pass, name, profile) => {
    createUserWithEmailAndPassword(auth, email, pass).then((result) => {
      const userInfo = result.user;
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: profile,
      })
        .then(() => {})
        .catch((error) => {
          const errorMessage = error.message;
          setErrors(errorMessage);
        });
      setUsers(userInfo);
      setIsLoading(false);
    });
  };

  // obserbing redering---
  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsers(user);
        setIsLoading(false);
      } else {
        setUsers(null);
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

  console.log(users);
  return {
    users,
    isLoading,
    errors,
    manuallySignUp,
    logOut,
  };
};

export default useFirebase;
