/* eslint-disable react/prop-types */

export function FormInput({
    className,
    name,
    label,
    type,
    onChange,
    value,
    defaultValue,
    error,
}) {
    function inputChanged(evt) {
        if (onChange) {
            onChange(evt.target.value);
        }
    }

    return (
        <div className={"inputContainer " + className}>
            {label && <label htmlFor={name}>{label}</label>}
            <div className={"formInput " + (error ? "withError" : "")}>
                <input
                    id={name}
                    type={type}
                    name={name}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={inputChanged}
                />
            </div>
            {error && <p className="errorMsg">{error}</p>}
        </div>
    );
}