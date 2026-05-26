import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {User, getUserType} from "@shared/types/user"
interface AuthContextValue {
  token: any
  isAuthenticated: boolean;
  checkAuth: () => void;
  register: (user: User,firstname: string, lastname: string, username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

//To do
//Extract user type from retrieved user, if authenticated make a call to profile context and add profile


export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in (cookie exists)
    fetch("/backend/users/authJWT", {
      credentials: "include",
    })
      .then((res) => {
        setIsAuthenticated(res.ok);
      })
      .catch(() => {setIsAuthenticated(false);})
      .finally(() => {
      setAuthLoading(false);
      })
  }, []);

  const register = async (user: User, userName, passWord) => {

      try {
      const response = await fetch("/backend/users/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: 
          JSON.stringify({"firstname":  user.firstName, "lastname": user.lastName, "username": userName, "password": passWord, "usertype": getUserType(user)}), 
      });
      if (!response.ok) {
          const res = await response.json();
          throw new Error(res || "Request failed");
      }
      const res = await response.json();
      console.log(res)
      if (res.data) {
        setToken(res.token);
        localStorage.setItem("token", res.token);
        navigate("/onboarding", { replace: true });
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (username, password) => {
    try {
      let data = {username: username, password: password};
      const response = await fetch("/backend/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        setIsAuthenticated(res.ok)
        setToken(res.token);
        localStorage.setItem("token", res.token);
        navigate("/home");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };
  
  const logout = async () => {
    await fetch("/backend/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
    });
  };

  const checkAuth = () => {
    if (!isAuthenticated && !authLoading){
      navigate("/")
    }
  }

  return <AuthContext.Provider value={{token, isAuthenticated, checkAuth, register, login, logout}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
