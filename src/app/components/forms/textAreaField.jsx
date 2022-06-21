import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange, error }) => {
  const getInputClasses = () => {
    return (
      "input-field shadow-none form-control" + (error ? " is-invalid" : "")
    );
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="my-2">
      <textarea
        name={name}
        value={value}
        placeholder={label}
        onChange={handleChange}
        className={getInputClasses()}
        autoComplete="true" // устраняет ошибку autoComplete в браузере
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaField.defaultProps = {
  type: "text"
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  autoComplete: PropTypes.string
};

export default TextAreaField;
