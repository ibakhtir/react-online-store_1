import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";

import { setTokens } from "../services/localStorage.service";
import userService from "../services/user.service";

const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: { key: "AIzaSyAZOEcCcApwhCVD9ElCSpCqt_cEJ2xOPGU" }
});
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  const [error, setError] = useState(null);

  async function signIn({ email, password }) {
    const url = "accounts:signInWithPassword";
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
    } catch (error) {
      // errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (
          message === "EMAIL_NOT_FOUND" ||
          message === "INVALID_EMAIL" ||
          message === "INVALID_PASSWORD"
        ) {
          throw new Error("Неверный адрес или пароль");
        } else {
          throw new Error("Что-то пошло не так. Попробуйте позже.");
        }
      }
    }
  }

  async function signUp({ email, password, ...rest }) {
    const url = "accounts:signUp";
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
    } catch (error) {
      // errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObj = {
            email: "Пользователь с таким адресом уже существует"
          };
          throw errorObj;
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = userService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  function errorCatcher(error) {
    const { message } = error.response.data.error;
    setError(message);
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;
