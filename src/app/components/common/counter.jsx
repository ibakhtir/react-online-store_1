import React, { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(1);

  const handleIncrement = () => {
    setCounter((prevState) => prevState + 1);
  };

  const handleDecrement = () => {
    if (counter > 1) setCounter((prevState) => prevState - 1);
  };

  return (
    <div className="btn-group mx-1">
      <button className="btn btn-dark text-warning" onClick={handleIncrement}>
        <i className="bi bi-chevron-up"></i>
      </button>
      <button className="btn btn-dark text-warning">{counter}</button>
      <button className="btn btn-dark text-warning" onClick={handleDecrement}>
        <i className="bi bi-chevron-down"></i>
      </button>
    </div>
  );
};

export default Counter;
