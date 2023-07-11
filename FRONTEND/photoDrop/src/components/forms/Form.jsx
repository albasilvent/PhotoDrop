/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const FormContext = createContext({
    isSubmitting: false,
});

export function Form({ children, onSubmit, className }) {
    const [formState, setFormState] = useState({ isSubmitting: false });
    async function localOnSubmit(evt) {
        evt.preventDefault();

        setFormState({
            isSubmitting: true,
        });

        if (onSubmit) await onSubmit();

        setFormState({
            isSubmitting: false,
        });
    }
    return (
        <FormContext.Provider value={formState}>
            <form onSubmit={localOnSubmit} className={className}>
                {children}
            </form>
        </FormContext.Provider>
    );
}