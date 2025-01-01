import React, { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import { WindowSizeContext } from "../../context/WindowSizeContext";
import List from "../../components/list/List";
import ListItem from "../../components/listItem/ListItem";
import ListContainer from "../../components/listContainer/ListContainer";
import PomodoroContainer from "../../components/pomodoroContainer/PomodoroContainer";

import "./Home.css";
import Timer from "../../components/Timer/Timer";

const Home = () => {
  const { toDoList, setEditingTask } = useContext(TodoContext);
  const { windowWidth } = useContext(WindowSizeContext);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  return (
    <main className="home">
      {windowWidth !== 300 && (
        <ListContainer>
          {toDoList.length === 0 ? (
            <div className="no-task">
              <h4 style={{color: "var(--yellow-color)"}}>No tasks here!</h4>
            </div>
          ) : (
            <List>
              <>
                {toDoList.map((task, index) => (
                  <ListItem
                    key={index}
                    data={task}
                    handleEdit={() => handleEdit(task)}
                  />
                ))}
              </>
            </List>
          )}
        </ListContainer>
      )}
      <PomodoroContainer>
        <Timer circleWidth="200" />
      </PomodoroContainer>
    </main>
  );
};

export default Home;
