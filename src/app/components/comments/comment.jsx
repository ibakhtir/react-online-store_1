import React from "react";
import PropTypes from "prop-types";

import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../hooks/useAuth";
import { displayDate } from "../../utils/displayDate";

const Comment = ({
  _id: id,
  content,
  created_at: created,
  userId,
  choice,
  onRemove
}) => {
  const { getUserById } = useUsers();
  const { currentUser } = useAuth();
  const user = getUserById(userId);

  return (
    <div className="bg-light card-body rounded mb-2">
      <div className="d-flex flex-start">
        <img
          src={user.image}
          className="rounded-circle me-3"
          alt="avatar"
          width="60"
          height="60"
        />
        <div className="flex-grow-1 flex-shrink-1">
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">
              {user.name}
              <span className="small text-muted">
                {" - " + displayDate(created)}
              </span>
            </p>
            {currentUser && currentUser._id === userId && (
              <button
                className="btn btn-close"
                onClick={() => onRemove(id)}
              ></button>
            )}
          </div>
          <p className="small mb-0 mt-1">{content}</p>
          <p className="text-end mb-0 me-1">
            {choice === "recommend" ? (
              <i className="bi bi-emoji-smile text-success"></i>
            ) : (
              <i className="bi bi-emoji-frown text-danger"></i>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  _id: PropTypes.string,
  content: PropTypes.string,
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  userId: PropTypes.string,
  choice: PropTypes.string,
  onRemove: PropTypes.func
};

export default Comment;
