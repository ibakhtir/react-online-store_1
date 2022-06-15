import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { MAIN_ROUTE } from "../../utils/constants";
import { validator } from "../../utils/validator";
import TextField from "../forms/textField";

const RegistrationForm = () => {
  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(true);
  const { signUp } = useAuth();
  const history = useHistory();

  const validatorConfig = {
    name: {
      isRequired: { message: "Имя обязательно для заполнения" }
    },
    surname: {
      isRequired: { message: "Фамилия обязательна для заполнения" }
    },
    email: {
      isRequired: { message: "Электронный адрес обязателен для заполнения" },
      isEmail: { message: "Введен некорректный электронный адрес" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isDigit: { message: "Пароль должен содержать хотя бы одну цифру" },
      isMinLength: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
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
        await signUp(data);
        history.push(MAIN_ROUTE);
      } catch (error) {
        setErrors(error);
        setValid(false);
      }
    } else {
      setValid(isValid);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Фамилия"
        name="surname"
        value={data.surname}
        onChange={handleChange}
        error={errors.surname}
      />
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
        Создать
      </button>
    </form>
  );
};

export default RegistrationForm;
