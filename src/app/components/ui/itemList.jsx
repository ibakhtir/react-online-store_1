import React from "react";

import { useItem } from "../../hooks/useItem";
import ItemCard from "./itemCard";

const ItemList = () => {
  const { item } = useItem();

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          {item.map((i) => (
            <ItemCard key={i._id} item={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemList;
