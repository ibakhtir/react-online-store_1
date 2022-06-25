import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { validator } from "../../utils/validator";
import { useItems } from "../../hooks/useItems";
import TextField from "../forms/textField";
import TextAreaField from "../forms/textAreaField";
import SelectField from "../forms/selectField";

const initialState = {
  name: "",
  description: "",
  imageUrl: "",
  dough: "",
  size: "",
  weight: "",
  calories: "",
  price: ""
};

const doughTypes = [
  { name: "Традиционное тесто", value: "traditional" },
  { name: "Бездрожжевое тесто", value: "yeast-free" },
  { name: "Слоеное тесто", value: "puff" }
];

const AddForm = ({ onClose }) => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(true);
  const { createItem } = useItems();

  const validatorConfig = {};

  Object.keys(data).map(
    (field) =>
      (validatorConfig[field] = {
        isRequired: { message: "Обязательное поле" }
      })
  );

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
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      await createItem(data);
      clearForm();
      onClose();
    } else {
      setValid(isValid);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Наименование"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextAreaField
        label="Описание"
        name="description"
        value={data.description}
        onChange={handleChange}
        error={errors.description}
      />
      <TextAreaField
        label="Изображение"
        name="imageUrl"
        value={data.imageUrl}
        onChange={handleChange}
        error={errors.imageUrl}
      />
      <SelectField
        defaultOption="Выбрать..."
        options={doughTypes}
        label="Тесто"
        name="dough"
        value={data.dough}
        onChange={handleChange}
        error={errors.dough}
      />
      <div className="row">
        <div className="col-sm-3">
          <TextField
            type="number"
            label="Размер"
            name="size"
            value={data.size}
            onChange={handleChange}
            error={errors.size}
          />
        </div>
        <div className="col-sm-3">
          <TextField
            type="number"
            label="Вес"
            name="weight"
            value={data.weight}
            onChange={handleChange}
            error={errors.weight}
          />
        </div>
        <div className="col-sm-3">
          <TextField
            type="number"
            label="Калории"
            name="calories"
            value={data.calories}
            onChange={handleChange}
            error={errors.calories}
          />
        </div>
        <div className="col-sm-3">
          <TextField
            type="number"
            label="Цена"
            name="price"
            value={data.price}
            onChange={handleChange}
            error={errors.price}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={Object.keys(errors).length !== 0}
        className="btn btn-dark text-warning w-100 mt-3"
      >
        Создать
      </button>
    </form>
  );
};

AddForm.propTypes = {
  onClose: PropTypes.func
};

export default AddForm;
