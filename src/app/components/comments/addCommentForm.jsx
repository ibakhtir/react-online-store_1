import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { validator } from "../../utils/validator";
import { useAuth } from "../../hooks/useAuth";
import TextAreaField from "../forms/textAreaField";
import RadioField from "../forms/radioField";

const initialState = { choice: "recommend", content: "" };

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(true);
  const { currentUser } = useAuth();

  const getDisabledForm = () => {
    if (currentUser === undefined || currentUser === null) {
      return true;
    } else {
      return false;
    }
  };

  const validatorConfig = {
    content: {
      isRequired: {
        message: "Отзыв не может быть пустым"
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

  const clearForm = () => {
    setData(initialState);
    setValid(true);
    setErrors({});
  };

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      onSubmit(data);
      clearForm();
    } else {
      setValid(isValid);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3>Оставить отзыв</h3>
        <hr />
        <div className="bg-light rounded p-2">
          <form onSubmit={handleSubmit}>
            <fieldset disabled={getDisabledForm()}>
              <TextAreaField
                name="content"
                value={data.content}
                placeholder={
                  currentUser
                    ? "Введите текст"
                    : "Чтобы оставить отзыв, нужно зарегистрироваться"
                }
                onChange={handleChange}
                error={errors.content}
              />
              <RadioField
                options={[
                  { name: "Рекомендую", value: "recommend" },
                  { name: "Не рекомендую", value: "noRecommend" }
                ]}
                name="choice"
                value={data.choice}
                onChange={handleChange}
              />
              <div className="d-flex justify-content-end">
                <button className="btn btn-dark text-warning mb-1">
                  Опубликовать
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
};

export default AddCommentForm;
