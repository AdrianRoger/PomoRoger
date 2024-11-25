import "./iconButton.css";

const IconButton = ({ children, handlerClick }) => {
  return (
    <div className="btn" onClick={handlerClick}>
      {children}
    </div>
  );
};

export default IconButton;
