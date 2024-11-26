import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "../iconButton/iconButton";
import "./Header.css";

const Header = () => {
  const [isDragging, setIsDragging] = useState(false);
  // const [initialClientX, setInitialClientX] = useState(0);
  // const [initialClientY, setInitialClientY] = useState(0);

  const navigate = useNavigate();

  const handleMouseDown = (e) => {
    setIsDragging(true);
    // setInitialClientX(e.clientX);
    // setInitialClientY(e.clientY);
    window.electron.startDrag(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      window.electron.moveDrag(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    window.electron.stopDrag();
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleCloseApplication = () => {
    window.electron.closeApp();
  };

  return (
    <header
      className="header"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <h3>PomoRoger</h3>
      <div className="navigate-buttons">
        <IconButton
          children={<HomeRoundedIcon />}
          handleClick={() => handleNavigate("/")}
        />
        <IconButton
          children={<SettingsRoundedIcon />}
          handleClick={() => handleNavigate("/settings")}
        />
        <IconButton
          children={<CloseRoundedIcon />}
          handleClick={handleCloseApplication}
        />
      </div>
    </header>
  );
};

export default Header;
