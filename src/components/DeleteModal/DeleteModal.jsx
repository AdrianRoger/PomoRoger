import React, { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import Button from "../Button/Button";
import "./DeleteModal.css";

const DeleteModal = ({ onConfirm, onCancel }) => {
  const { taskToDelete } = useContext(TodoContext);

  return (
    <div className="delete-modal">
      <div className="modal-content">
        <h4>Confirm Deletion</h4>
        <p>
          Are you sure you want to delete{" "}
          <span className="task-to-delete">"{taskToDelete.taskName}"</span>?
        </p>
        <div className="group-btn">
          <Button label="Delete" onClick={() => onConfirm(taskToDelete)} />
          <Button label="Cancel" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
