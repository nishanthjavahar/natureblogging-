import React, {
  createContext,
  useState,
} from "react";

export const AuthContext =
  createContext();

function AuthProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      localStorage.getItem("admin")
        ? true
        : false
    );

  const login = () => {

    localStorage.setItem(
      "admin",
      "true"
    );

    setIsLoggedIn(true);

  };

  const logout = () => {

    localStorage.removeItem("admin");

    setIsLoggedIn(false);

  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;