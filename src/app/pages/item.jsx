import React from "react";
import { useParams } from "react-router-dom";

import Comments from "../components/ui/comments";
import CommentsProvider from "../hooks/useComments";
import { useItems } from "../hooks/useItems";

const Item = () => {
  const { getItemById } = useItems();
  const { itemId } = useParams();
  const item = getItemById(itemId);

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-4 d-flex flex-column align-items-center text-center h-100">
          <img
            width={350}
            src={item.imageUrl}
            alt={item.name}
            className="img-fluid my-2"
          />
          <h4 className="mt-2">{item.name}</h4>
        </div>
        <div className="col-md-8">
          <CommentsProvider>
            <Comments />
          </CommentsProvider>
        </div>
      </div>
    </div>
  );
};

export default Item;
