import React from "react";
import './Button.css'

const Button = ({ type, label, onClick }) => {
  return (
    <button className="custom-action-btn" type={type || "submit"} onClick={onClick}>
      {label}
    </button>
  )
};

export default Button;
