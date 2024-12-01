import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../../context/TodoContext";
import List from "../../components/list/List";
import ListItem from "../../components/listItem/ListItem";
import ListContainer from "../../components/listContainer/ListContainer";

import "./Home.css";

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { toDoList, deletetask, editingTask, setEditingTask } = useContext(TodoContext);
  // const navigate = useNavigate();

  useEffect(() => {
    window.electron.onWindowResize(({ width }) => {
      setWindowWidth(width);
    });
    return () => {
      window.electron.onWindowResize(() => {});
    };
  }, []);

  const handleEdit = (task) => {
    setEditingTask(task);
  }

  return (
    <main className="home">
        {windowWidth !== 300 && (
          <ListContainer>
            <List>
              <>
                {toDoList.map((task, index) => (
                  <ListItem
                    key={index}
                    data={task}
                    handleEdit={() => handleEdit(task)}
                    handleDelete={deletetask} //update info here
                  />
                ))}
              </>
            </List>
          </ListContainer>
        )}
      <div className="container-right"></div>
    </main>
  );
};

export default Home;
