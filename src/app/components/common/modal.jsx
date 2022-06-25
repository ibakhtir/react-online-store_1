import React, { useState } from "react";
import PropTypes from "prop-types";

import EditForm from "../ui/editForm";
import AddForm from "../ui/addForm";

const Modal = ({ item, btnStyle, btnContent }) => {
  const [showModal, setShow] = useState(false);

  const getModalClasses = () => {
    return "modal fade" + (showModal ? " show d-block" : " d-none");
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <button className={btnStyle} onClick={handleShow}>
        {btnContent}
      </button>
      <div className={getModalClasses()}>
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {item ? "Редактирование" : "Создание"}
              </h5>
              <button className="btn btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              {item ? (
                <EditForm item={item} onClose={handleClose} />
              ) : (
                <AddForm onClose={handleClose} />
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

Modal.propTypes = {
  item: PropTypes.object,
  btnStyle: PropTypes.string,
  btnContent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Modal;
