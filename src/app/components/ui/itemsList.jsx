import React from "react";

import { useItems } from "../../hooks/useItems";
import ItemCard from "./itemCard";

const ItemsList = () => {
  const { items } = useItems();

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          {items &&
            items.map((item) => <ItemCard key={item._id} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default ItemsList;
