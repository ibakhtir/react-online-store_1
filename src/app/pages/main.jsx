import React from "react";

import ItemList from "../components/ui/itemList";
import ItemProvider from "../hooks/useItem";

const Main = () => {
  return (
    <ItemProvider>
      <ItemList />
    </ItemProvider>
  );
};

export default Main;
