import React, { useState } from "react";
import PropTypes from "prop-types";

const ItemCard = ({ item }) => {
  const [counter, setCounter] = useState(1);

  const handleIncrement = () => {
    setCounter((prevState) => prevState + 1);
  };
  const handleDecrement = () => {
    if (counter > 1) setCounter((prevState) => prevState - 1);
  };

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 my-2">
      <div className="d-flex flex-column h-100">
        <img src={item.imageUrl} className="item-img p-2" alt={item.name} />
        <div className="d-flex justify-content-around align-items-center">
          <h4>{item.name}</h4>
          <h4>
            <span className="badge bg-dark fw-normal text-warning">
              {item.price + " ₴"}
            </span>
          </h4>
        </div>
        <p className="fst-italic p-2">{item.description}</p>
        <div className="d-flex justify-content-around mt-auto mb-2">
          <button className="btn btn-dark text-warning w-50">Добавить</button>
          <div className="btn-group">
            <button
              className="btn btn-dark text-warning shadow-none"
              onClick={handleIncrement}
            >
              <i className="bi bi-chevron-up"></i>
            </button>
            <button className="btn btn-dark text-warning shadow-none">
              {counter}
            </button>
            <button
              className="btn btn-dark text-warning shadow-none"
              onClick={handleDecrement}
            >
              <i className="bi bi-chevron-down"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object
};

export default ItemCard;
