import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  signupUser,
  checkAuthStatus,
  logoutUser,
} from "../helpers/api-communicator";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // fetch if the user's cookies are valid then skip login
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUser({ email: data.email, name: data.name, profilePic: data.profilePic });
        setIsLoggedIn(true);
      }
    }
    checkStatus();
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({ email: data.email, name: data.name, profilePic: data.profilePic });
      setIsLoggedIn(true);
      // transfer to the previous page
      // window.history.back();
    }
  };
  const logout = async () => {
    await logoutUser();
    setUser(null);
    setIsLoggedIn(false);
  };
  const signup = async (name, email, password, profilePic) => {
    const data = await signupUser(name, email, password, profilePic);
    if (data) {
      setUser({ email: data.email, name: data.name, profilePic: data.profilePic });
      setIsLoggedIn(true);
    }
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
