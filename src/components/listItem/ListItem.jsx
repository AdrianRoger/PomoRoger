import "./ListItem.css";
import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
//{ id, taskName, taskDt, pomodoroQtd }

const ListItem = ({ data, handleEdit, handleDelete}) => {
  const iconSize = { fontSize: "11px" };
  const actionIconSize = { fontSize: "16px"};
  
  return (
    <>
      <div className="item">
        <div className="overlay">
          <div className="task">
            <dt className="task-name">{data.taskName}</dt>
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
          <EditRoundedIcon className="color-btn action-btn" sx={actionIconSize} onClick={() => handleEdit(data)}/>
          <DeleteForeverRoundedIcon
            className="color-btn action-btn"
            sx={actionIconSize}
            onClick={handleDelete} //need to update
          />
        </div>
      </div>
    </>
  );
};

export default ListItem;
