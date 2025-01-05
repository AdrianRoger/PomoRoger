import React, { useContext, useState } from "react";
import ReactSlider from "react-slider";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../../context/TodoContext";
import "./Settings.css";

const Settings = () => {
  const { toDoTime, handleToDoTime } = useContext(TodoContext);
  const navigate = useNavigate();

  const [work, setWork] = useState(toDoTime.work);
  const [shortBreak, setShortBreak] = useState(toDoTime.shortBreak);
  const [longBreak, setLongBreak] = useState(toDoTime.longBreak);

  const saveToDoSettings = () => {
    handleToDoTime({ work, shortBreak, longBreak });
  };

  return (
    <div className="settings-container">
      <h2>Settings Page</h2>
      <div className="settings">
        <div className="slider-group">
          <label>Work: {work}</label>
          <ReactSlider
            className={"slider"}
            thumbClassName={"thumb"}
            trackClassName={"track"}
            value={work}
            onChange={(newValue) => setWork(newValue)}
            min={1}
            max={60}
          />
        </div>
        <div className="slider-group">
          <label>Short Break: {shortBreak}</label>
          <ReactSlider
            className={"slider"}
            thumbClassName={"thumb"}
            trackClassName={"track"}
            value={shortBreak}
            onChange={(newValue) => setShortBreak(newValue)}
            min={1}
            max={60}
          />
        </div>
        <div className="slider-group">
          <label>Long Break: {longBreak}</label>
          <ReactSlider
            className={"slider"}
            thumbClassName={"thumb"}
            trackClassName={"track"}
            value={longBreak}
            onChange={(newValue) => setLongBreak(newValue)}
            min={1}
            max={60}
          />
        </div>
        <div className="btn-group">
          <Button onClick={() => navigate("/")} label="Back" />
          <Button onClick={saveToDoSettings} label="Save" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
