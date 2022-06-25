import React from "react";

import { useItems } from "../hooks/useItems";
import ItemsTable from "../components/table/itemsTable";
import Modal from "../components/common/modal";

const Admin = () => {
  const { items, removeItem } = useItems();

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-start mb-3">
        <Modal
          btnStyle="btn btn-success"
          btnContent={
            <>
              <i className="bi bi-plus-circle-fill me-2"></i>
              <span>Добавить новый товар</span>
            </>
          }
        />
      </div>
      {items && <ItemsTable items={items} onRemove={handleRemoveItem} />}
    </div>
  );
};

export default Admin;
