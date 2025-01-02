import "./ListContainer.css";
import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import Button from "../Button/Button";
import { TodoContext } from "../../context/TodoContext";
import DeleteModal from "../DeleteModal/DeleteModal";

const ListContainer = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const {
    addTask,
    updateTask,
    editingTask,
    setEditingTask,
    deleteTask,
    taskToDelete,
    setTaskToDelete,
  } = useContext(TodoContext);

  const handleOpenMenu = () => {
    setOpen(!open);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const handleDelete = (task) => {
    deleteTask(task.id);
    setTaskToDelete(null);
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
  };

  const handleModalAction = (data) => {
    if (editingTask) {
      updateTask(data);
      setEditingTask(null);
    } else {
      addTask(data);
    }
    setShowModal(false);
  };

  const containerClass = clsx("list-container", {
    "view-320": windowWidth === 320,
    "transform-translate": open && windowWidth === 320,
  });

  useEffect(() => {
    window.electron.onWindowResize(({ width }) => {
      setWindowWidth(width);
      setOpen(false);
    });

    return () => {
      window.electron.onWindowResize(() => {});
    };
  }, []);

  useEffect(() => {
    if (editingTask) {
      handleOpenModal(true);
    }
  }, [editingTask]);

  return (
    <div className={containerClass}>
      <Button label="+" onClick={handleOpenModal} />
      {windowWidth === 320 && open && (
        <MenuOpenRoundedIcon
          className="color-btn list-menu-close"
          onClick={handleOpenMenu}
        />
      )}
      {(windowWidth === 320 && !open) && 
        <MenuRoundedIcon
          className="color-btn list-menu-open"
          onClick={handleOpenMenu}
        />
      }
      {children}
      {showModal && (
        <Modal handleClose={handleCloseModal}>
          <Form onSubmit={handleModalAction} />
        </Modal>
      )}
      {taskToDelete && (
        <DeleteModal onConfirm={handleDelete} onCancel={handleCancelDelete} />
      )}
    </div>
  );
};

export default ListContainer;
