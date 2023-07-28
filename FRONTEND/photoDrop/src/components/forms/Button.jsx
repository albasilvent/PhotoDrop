/* eslint-disable react/prop-types */
import { useContext } from "react";
import { FormContext } from "./Form.jsx";

export function Button({ children, onClick, className, type }) {
    const { isSubmitting } = useContext(FormContext);
    return (
        <button
            type={type ?? "button"}
            className={"button  " + className}
            onClick={onClick}
            disabled={isSubmitting}
        >
            {children}
        </button>
    );
}