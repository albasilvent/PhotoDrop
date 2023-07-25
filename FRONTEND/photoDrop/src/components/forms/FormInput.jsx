/* eslint-disable react/prop-types */
import { Icon } from "../icons/Icon.jsx";

export function FormInput({
    className,
    name,
    label,
    type,
    onChange,
    value,
    defaultValue,
    iconPrefix,
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
                {iconPrefix && <Icon name={iconPrefix} className={"prefixIcon"} />}
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