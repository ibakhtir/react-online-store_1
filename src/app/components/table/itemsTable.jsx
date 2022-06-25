import React from "react";
import PropTypes from "prop-types";

import Table from "./table";
import Modal from "../common/modal";

const ItemsTable = ({ items, onRemove }) => {
  const columns = {
    name: {
      path: "name",
      name: "Наименование"
    },
    description: {
      path: "description",
      name: "Описание"
    },
    imageUrl: {
      path: "imageUrl",
      name: "Изображение",
      component: (item) => (
        <a href={item.imageUrl} target="_blanc" className="text-muted">
          Ссылка
        </a>
      )
    },
    dough: {
      path: "dough",
      name: "Тесто"
    },
    size: {
      path: "size",
      name: "Размер"
    },
    weight: {
      path: "weight",
      name: "Вес"
    },
    calories: {
      path: "calories",
      name: "Калории"
    },
    price: {
      path: "price",
      name: "Цена"
    },
    action: {
      path: "action",
      name: "Действие",
      component: (item) => (
        <div className="d-flex justify-content-around">
          <Modal
            item={item}
            btnStyle="btn btn-warning btn-sm"
            btnContent={<i className="bi bi-pencil"></i>}
          />
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onRemove(item._id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )
    }
  };

  return (
    <div className="table-responsive">
      <Table items={items} columns={columns} />
    </div>
  );
};

ItemsTable.propTypes = {
  items: PropTypes.array,
  onRemove: PropTypes.func
};

export default ItemsTable;
