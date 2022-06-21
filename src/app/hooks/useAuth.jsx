import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";

import localStorageService, {
  setTokens
} from "../services/localStorage.service";
import userService from "../services/user.service";
import { MAIN_ROUTE } from "../utils/constants";
import { createAvatar } from "../utils/createAvatar";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: { key: "AIzaSyAZOEcCcApwhCVD9ElCSpCqt_cEJ2xOPGU" }
});

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  async function signIn({ email, password }) {
    const url = "accounts:signInWithPassword";
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await getUserData();
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
      await createUser({
        _id: data.localId,
        email,
        image: createAvatar("croodles-neutral"),
        ...rest
      });
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

  function signOut() {
    localStorageService.removeAuthData();
    history.push(MAIN_ROUTE);
    setUser(null);
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

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
    <AuthContext.Provider value={{ currentUser, signIn, signOut, signUp }}>
      {!isLoading ? children : "Loading..."}
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
