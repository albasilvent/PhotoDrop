import "../styles/Input.css";

// eslint-disable-next-line react/prop-types
export function Input({ name, type, id, placeholder, onChange, value, required }) {
    function inputChange(evt) {
        if (onChange) {
            onChange(evt.target.value);
        }
    }
    
    return (
        <>
            <input
                className="input"
                name={name}
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={inputChange}
                required={required}
            />
        </>
    );
}
