import React, { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [toDoList, setToDoList] = useState([]);
  const [toDoTime, setToDoTime] = useState({
    time: 50,
    shortBreak: 10,
    longBreak: 25,
  });
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const getFromLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    try {
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error(
        `Erro ao analisar JSON do localStorage para a chave "${key}":`,
        error
      );
      return null;
    }
  };

  const setToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const handlerToDoTime = (time) => {
    setToDoTime(time);
    setToLocalStorage("time", time);
  };

  const handleSelectedTask = (task) => {
    setSelectedTask(task);
  };

  const addTask = ({ taskName, taskDt, pomodoroQtd, status = false }) => {
    const newId = toDoList.length ? toDoList[toDoList.length - 1].id + 1 : 1;
    const newtask = { id: newId, taskName, taskDt, pomodoroQtd, status };
    setToDoList((prev) => [...prev, newtask]);
  };

  const updateTask = (editingTask) => {
    const updatedTask = editingTask;
    setToDoList((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setToDoList((prev) => prev.filter((task) => task.id !== id));
  };

  useEffect(() => {
    const time = getFromLocalStorage("time");
    if (!time || isNaN(time) || time < 1) {
      setToLocalStorage("time", toDoTime);
      return;
    }

    setToDoTime(Number(time));
  }, []);

  useEffect(() => {
    const storedToDoList = getFromLocalStorage("tasks");
    if (!storedToDoList || storedToDoList.length === 0) {
      setToLocalStorage("tasks", toDoList);
    } else {
      setToDoList(storedToDoList);
    }
  }, []);

  useEffect(() => {
    setToLocalStorage("tasks", toDoList);
  }, [toDoList]);

  return (
    <TodoContext.Provider
      value={{
        toDoList,
        addTask,
        updateTask,
        deleteTask,
        toDoTime,
        handlerToDoTime,
        editingTask,
        setEditingTask,
        taskToDelete,
        setTaskToDelete,
        selectedTask,
        handleSelectedTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
