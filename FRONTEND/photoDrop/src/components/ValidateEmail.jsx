import { useNavigate, useSearchParams } from "react-router-dom";
import { FormContext } from "../contexts/form-context";
import { Input } from "./Input";
import "../styles/ValidateEmail.css";
import { useState } from "react";
import { sendValidateEmail } from "../functions/api/send-validate-email";

export function ValidateEmail() {
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();
    const email = queryParams.get("email");

    const [formState, setFormState] = useState({ isSubmitting: false });
    const [payload, setPayload] = useState({ email: email });
    const [errorMsg, setErrorMsg] = useState("");

    async function onSubmit(evt) {
        evt.preventDefault();
        setFormState({ isSubmitting: true });

        try {
            await sendValidateEmail(payload);
            navigate("/login");
        } catch (err) {
            setFormState({ isSubmitting: false });
            setPayload({});
            setErrorMsg(err.msg);
        }
    }

    return (
        <main className="Page">
            <div className="container-validate">
                <div className="cajetin-validate">
                    <h2 className="h2-validate">Verifica tu email</h2>
                    <div className="text-validate">
                        <p>Hemos enviado un código al email:</p>
                        <p className="email-validate">{email}</p>
                    </div>
                    <FormContext.Provider value={formState}>
                        <form className="form-validate" onSubmit={onSubmit}>
                            <Input
                                name="text"
                                type="text"
                                placeholder="Escribe aquí tu código..."
                                required
                                onChange={(value) =>
                                    setPayload({ ...payload, code: value })
                                }
                            />
                            <button className="boton" type="submit">
                                Enviar
                            </button>
                        </form>
                    </FormContext.Provider>
                    {errorMsg && <p className="errormsg">{errorMsg}</p>}
                </div>
            </div>
        </main>
    );
}
