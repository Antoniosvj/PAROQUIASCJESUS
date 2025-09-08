import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const admin = localStorage.getItem("isAdmin") === "true";
    setIsLoggedIn(loggedIn);
    setIsAdmin(admin);
  }, []);

  const handleLogin = (loggedIn, admin) => {
    setIsLoggedIn(loggedIn);
    setIsAdmin(admin);
    localStorage.setItem("isLoggedIn", loggedIn);
    localStorage.setItem("isAdmin", admin);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};