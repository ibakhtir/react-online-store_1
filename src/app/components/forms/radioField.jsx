import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ label, options, name, value, onChange }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="my-2">
      {label && <label className="form-label">{label}</label>}
      {options.map((option) => (
        <div key={option.value} className="form-check-inline">
          <input
            className="form-check-input mx-2 radio-btn"
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor={option.value}>
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

RadioField.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default RadioField;
