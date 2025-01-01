import "./ListItem.css";
import React, { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

const ListItem = ({ data, handleEdit }) => {
  const iconSize = { fontSize: "11px" };
  const actionIconSize = { fontSize: "16px"};

  const { setTaskToDelete, updateTask, selectedTask, handleSelectedTask } =
    useContext(TodoContext);

  const handleChange = (e) => {
    updateTask({ ...data, status: e.target.checked });
  };

  const toggleSelectedTask = (e) => {
    const ignoredTagNames = ["INPUT", "svg", "path"];

    if (ignoredTagNames.some((tag) => e.target.tagName === tag)) return;
    if (data.id === selectedTask?.id) return;

    handleSelectedTask(data);
  };

  return (
    <>
      <div className={data.id === selectedTask?.id ? "item selected" : "item"}>
        <div className="overlay" onClick={(e) => toggleSelectedTask(e)}>
          <input type="checkbox" checked={data.status} onChange={handleChange}></input>
          <div className="task">
            <dt className={data.status ? "task-name done" : "task-name"}>{data.taskName}</dt>
            <dd className="task-info">
              <span className="task-pomodoro-qtd">
                <AccessAlarmRoundedIcon sx={iconSize} />
                {data.pomodoroQtd}
              </span>
              <span className="task-date">
                <CalendarMonthRoundedIcon sx={iconSize} />
                {data.taskDt}
              </span>
            </dd>
          </div>
          <EditRoundedIcon
            className="color-btn action-btn"
            sx={actionIconSize}
            onClick={() => handleEdit(data)}
          />
          <DeleteForeverRoundedIcon
            className="color-btn action-btn"
            sx={actionIconSize}
            onClick={() => {
              setTaskToDelete(data);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ListItem;
