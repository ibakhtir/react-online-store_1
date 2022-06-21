import React from "react";
import { orderBy } from "lodash";

import { useComments } from "../../hooks/useComments";
import CommentsList from "../comments/commentsList";
import AddCommentForm from "../comments/addCommentForm";

const Comments = () => {
  const { comments, createComment, removeComment } = useComments();

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  const handleRemoveComment = (id) => {
    removeComment(id);
  };

  const handleSubmit = (data) => {
    createComment(data);
  };

  return (
    <>
      <AddCommentForm onSubmit={handleSubmit} />
      {sortedComments.length > 0 && (
        <CommentsList
          comments={sortedComments}
          onRemove={handleRemoveComment}
        />
      )}
    </>
  );
};

export default Comments;
