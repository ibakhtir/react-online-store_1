import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/useAuth";
import { MAIN_ROUTE } from "../../utils/constants";
import { validator } from "../../utils/validator";
import TextField from "../forms/textField";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(true);
  const { signIn } = useAuth();
  const history = useHistory();

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронный адрес обязателен для заполнения" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (isValid === false) validate();
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      try {
        await signIn(data);
        history.push(MAIN_ROUTE);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      setValid(isValid);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронный адрес"
        // type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <button
        type="submit"
        disabled={Object.keys(errors).length !== 0}
        className="btn btn-warning w-100 mx-auto mt-3"
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
