import "./iconButton.css";

const IconButton = ({ children, handleClick }) => {
  return (
    <div className="btn" onClick={handleClick}>
      {children}
    </div>
  );
};

export default IconButton;
