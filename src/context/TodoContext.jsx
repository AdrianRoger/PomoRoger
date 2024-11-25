import React, { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [toDoList, setToDoList] = useState([]);
  const [toDoTimer, setToDoTimer] = useState(50);

  const getFromLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    try {
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error(`Erro ao analisar JSON do localStorage para a chave "${key}":`, error);
      return null; // Retorna um valor padrão seguro
    }
  }

  const setToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const handlerToDoTimer = (min) => {
    setToDoTimer(min);
    setToLocalStorage('timer', min);
  };

  const addTask = ({ taskName, taskDt, pomodoroQtd }) => {
    const newId = toDoList.length ? toDoList[toDoList.length - 1].id + 1 : 1;
    const newtask = { id: newId, taskName, taskDt, pomodoroQtd };
    setToDoList((prev) => [...prev, newtask]);
  };

  const updateTask = ({ id, taskName, taskDt, pomodoroQtd }) => {
    const updatedTask = { id, taskName, taskDt, pomodoroQtd };
    setToDoList((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setToDoList((prev) => prev.filter((task) => task.id !== id));
  };

  useEffect(() => {
    const timer = getFromLocalStorage('timer');
    if(!timer || isNaN(timer) || timer < 1){
      setToLocalStorage('timer', toDoTimer);
      return
    }

    setToDoTimer(Number(timer));
  }, []);

  useEffect(() => {
    const storedToDoList = getFromLocalStorage('tasks');
    if(storedToDoList){
      setToDoList(storedToDoList);
    }
  }, []);

  useEffect(() => {
    setToLocalStorage('tasks', toDoList);
  }, [toDoList]);

  return (
    <TodoContext.Provider
      value={{
        toDoList,
        addTask,
        updateTask,
        deleteTask,
        toDoTimer,
        handlerToDoTimer,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
