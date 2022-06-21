import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

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
    getItem();
  }, []);

  async function getItem() {
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
    <ItemsContext.Provider value={{ items, getItemById }}>
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
