/* eslint-disable react/prop-types */
import "../styles/Select.css";

export function Select({ className, name, label, onChange, options }) {
  function inputChanged(evt) {
    if (onChange) {
      onChange(evt.target.value);
    }
  }

  return (
    <div className={"inputContainer " + className}>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        className="formSelect"
        onChange={inputChanged}
      >
        {options.map((option, i) => {
          return (
            <option key={i} value={option.value}>
              {option.label ?? option.value}
            </option>
          );
        })}
      </select>
    </div>
  );
}