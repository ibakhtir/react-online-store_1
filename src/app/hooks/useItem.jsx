import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import itemService from "../services/item.service";

const ItemContext = React.createContext();

export const useItem = () => {
  return useContext(ItemContext);
};

const ItemProvider = ({ children }) => {
  const [item, setItem] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getItem();
  }, []);

  async function getItem() {
    try {
      const { content } = await itemService.get();
      setItem(content);
      setLoading(false);
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
    <ItemContext.Provider value={{ item }}>
      {!isLoading ? children : "Loading..."}
    </ItemContext.Provider>
  );
};

ItemProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default ItemProvider;
