import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "../iconButton/iconButton";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";
import MinimizeRoundedIcon from "@mui/icons-material/MinimizeRounded";
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import "./Header.css";

const Header = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLargeSize, setIsLargeSize] = useState(true);
  const [isSmallSize, setIsSmallSize] = useState(false);
  const iconSize = {fontSize:"18px"};

  const navigate = useNavigate();

  const handleMouseDown = (e) => {
    setIsDragging(true);
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
  const handleMinimezeApp = () => {
    window.electron.setMinimized();
  }

  const handleResizeLarge = () => {
    window.electron.setSizeLarge();
    setIsLargeSize(true);
  }
  const handleResizeMedium = () => {
    window.electron.setSizeMedium();
    setIsLargeSize(false);
  }
  const handleResizeSmall = () => {
    window.electron.setSizeSmall();
    setIsSmallSize(true);
  }
  const handleResizeRestore = () => {
    window.electron.setSizeRestore();
    setIsSmallSize(false);
  }

  return (
    <header
      className="header"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {!isSmallSize && <div className="navigate-buttons">
        <IconButton
          children={<HomeRoundedIcon sx={iconSize}/>}
          handleClick={() => handleNavigate("/")}
        />
        <IconButton
          children={<SettingsRoundedIcon sx={iconSize}/>}
          handleClick={() => handleNavigate("/settings")}
        />
      </div>}
      <h4 className="pomoroger">PomoRoger</h4>
      <div className="navigate-buttons">
        <IconButton
          children={<MinimizeRoundedIcon sx={iconSize}/>}
          handleClick={handleMinimezeApp}
        />
        {!isSmallSize && <IconButton
          children={<CloseFullscreenRoundedIcon  sx={iconSize}/>}
          handleClick={handleResizeSmall}
        />}
        {isSmallSize && <IconButton
          children={<OpenInFullRoundedIcon  sx={iconSize}/>}
          handleClick={handleResizeRestore}
        />}
        {isLargeSize && !isSmallSize && <IconButton
          children={<FullscreenExitRoundedIcon sx={iconSize}/>}
          handleClick={handleResizeMedium}
        />}
        {!isLargeSize && !isSmallSize && <IconButton
          children={<FullscreenRoundedIcon sx={iconSize}/>}
          handleClick={handleResizeLarge}
        />}
        <IconButton
          children={<CloseRoundedIcon sx={iconSize}/>}
          handleClick={handleCloseApplication}
        />
      </div>
    </header>
  );
};

export default Header;
