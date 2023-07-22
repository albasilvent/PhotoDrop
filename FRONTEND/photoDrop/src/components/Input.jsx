import "../styles/Input.css";

// eslint-disable-next-line react/prop-types
export function Input({name, type, placeholder, error, onChange, value}) {

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
                placeholder={placeholder}
                value={value}
                onChange={inputChange}
            />
            {error && <p>{error}</p>}
        </>
    );
}
