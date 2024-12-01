import "./InputField.css";

const InputField = ({ label, value, onChange }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="input-group">
      <input
        className="input"
        type="text"
        value={value}
        autoComplete="off"
        onChange={handleInputChange}
        required
      />
      <label className="input-label">{label}</label>
    </div>
  );
};

export default InputField;
