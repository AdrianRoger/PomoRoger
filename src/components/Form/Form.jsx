import "./Form.css";
import React, { useEffect, useState, useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    taskName: "",
    taskDt: "",
    pomodoroQtd: 1,
  });

  const { editingTask } = useContext(TodoContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (editingTask) {
      setFormData(editingTask);
    }
  }, [editingTask]);

  return (
    <form onSubmit={handleSubmit} className="form">
      <InputField
        label="Task Name"
        value={formData.taskName}
        onChange={(value) => handleChange("taskName", value)}
      />
      <InputField
        label="Task Date"
        value={formData.taskDt}
        onChange={(value) => handleChange("taskDt", value)}
      />
      <InputField
        label="Pomodoro Amount"
        value={formData.pomodoroQtd}
        onChange={(value) => handleChange("pomodoroQtd", value)}
      />
      <Button type="submit" label="Save"/>
    </form>
  );
};

export default Form;
