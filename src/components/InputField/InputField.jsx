import "./InputField.css";

const InputField = ({ label, value, onChange, type = "text", min, max }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="input-group">
      <input
        className="input"
        placeholder=" "
        type={type}
        value={value}
        autoComplete="off"
        onChange={handleInputChange}
        {...(type === "number" && { min, max })}
        required
      />
      <label className={type !== "date" ? "input-label" : "input-label date"}>{label}</label>
    </div>
  );
};

export default InputField;
