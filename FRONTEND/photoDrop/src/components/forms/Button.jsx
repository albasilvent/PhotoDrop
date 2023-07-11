/* eslint-disable react/prop-types */
import { useContext } from "react";
import { FormContext } from "./Form.jsx";
import { Spinner } from "../icons/Spinner.jsx";  //Buscar otro?

export function Button({ children, onClick, className, type }) {
    const { isSubmitting } = useContext(FormContext);
    return (
        <button
            type={type ?? "button"}
            className={"button  " + className}
            onClick={onClick}
            disabled={isSubmitting}
        >
            {isSubmitting && <Spinner />}
            {children}
        </button>
    );
}