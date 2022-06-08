import React from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="form-floating mb-2">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={label}
        onChange={handleChange}
        className={getInputClasses()}
        autoComplete="true" // устраняет ошибку autoComplete в браузере
      />
      <label htmlFor={name}>{label}</label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  autoComplete: PropTypes.string
};

export default TextField;
