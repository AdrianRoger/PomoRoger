import React from "react";
import { useNavigate } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import IconButton from "../iconButton/iconButton";
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handlerNavigate = (path) => {
    navigate(path)
  }

  return (
    <header className="header">
      <h3>PomoRoger</h3>
      <div className="navigate-buttons">
      <IconButton children={<HomeRoundedIcon />} handlerClick={() => handlerNavigate('/')} />
      <IconButton children={<SettingsRoundedIcon />} handlerClick={() => handlerNavigate('/settings')} />
      </div>
    </header>
  );
};

export default Header;
