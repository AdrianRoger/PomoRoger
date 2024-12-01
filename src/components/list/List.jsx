import "./List.css";

const List = ({ children }) => {
  return <dl className="task-list">{children}</dl>;
};

export default List;
