import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

import itemService from "../services/item.service";

const ItemsContext = React.createContext();

export const useItems = () => {
  return useContext(ItemsContext);
};

const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    try {
      const { content } = await itemService.get();
      setItems(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function getItemById(itemId) {
    return items.find((i) => i._id === itemId);
  }

  async function createItem(data) {
    const newItem = {
      ...data,
      _id: nanoid()
    };
    try {
      const { content } = await itemService.create(newItem);
      setItems((prevState) =>
        prevState === null ? [content] : [...prevState, content]
      );
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function updateItemData(data) {
    try {
      const { content } = await itemService.update(data);
      setItems(
        items.map((item) => (item._id === content._id ? content : item))
      );
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function removeItem(itemId) {
    try {
      const { content } = await itemService.remove(itemId);
      if (content === null) {
        setItems((prevState) =>
          prevState.filter((item) => item._id !== itemId)
        );
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  function errorCatcher(error) {
    const { message } = error;
    setError(message);
    setLoading(false);
  }

  return (
    <ItemsContext.Provider
      value={{ items, createItem, getItemById, updateItemData, removeItem }}
    >
      {!isLoading ? children : "Loading..."}
    </ItemsContext.Provider>
  );
};

ItemsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default ItemsProvider;
