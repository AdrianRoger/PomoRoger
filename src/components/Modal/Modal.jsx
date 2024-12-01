import "./Modal.css";
import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Modal = ({ children, handleClose }) => {
  const handleClick = () => {
    handleClose();
  };

  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <CloseRoundedIcon className="modal-close" onClick={handleClick} />
      {children}
    </div>
  );
};

export default Modal;
