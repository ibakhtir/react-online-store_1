import React from "react";
import PropTypes from "prop-types";

import Comment from "./comment";

const CommentsList = ({ comments, onRemove }) => {
  return (
    <div className="card my-2">
      <div className="card-body">
        <h3>Отзывы</h3>
        <hr />
        {comments.map((comment) => (
          <Comment key={comment._id} {...comment} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array,
  onRemove: PropTypes.func
};

export default CommentsList;
