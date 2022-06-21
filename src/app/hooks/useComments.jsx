import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

import { useAuth } from "./useAuth";
import commentService from "../services/comment.service";

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const { itemId } = useParams();

  useEffect(() => {
    getComments();
  }, [itemId]);

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      created_at: Date.now(),
      itemId,
      userId: currentUser._id
    };
    try {
      const { content } = await commentService.createComment(comment);
      setComments((prevState) => [...prevState, content]);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id);
      if (content === null) {
        setComments((prevState) => prevState.filter((c) => c._id !== id));
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComments(itemId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
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
  }

  return (
    <CommentsContext.Provider
      value={{ comments, createComment, removeComment }}
    >
      {!isLoading ? children : "Loading..."}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default CommentsProvider;
