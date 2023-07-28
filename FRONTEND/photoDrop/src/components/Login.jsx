import "../styles/Login.css";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginContext } from "../contexts/auth-context.jsx";
import { createFormErrorsFromJoiDetails } from "../functions/utils/create-form-errors";
import { LoginValidation } from "../functions/utils/login-validator";
import { sendLogin } from "../functions/api/send-login";
import { Input } from "./Input";
import { FormContext } from "../contexts/form-context";

export function Login() {
    const [formState, setFormState] = useState({ isSubmitting: false });

    const login = useContext(LoginContext);
    const navigate = useNavigate();

    const [payload, setPayload] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    async function onSubmit(evt) {
        evt.preventDefault();

        setFormState({
            isSubmitting: true,
        });

        const result = LoginValidation.validate(payload, {
            abortEarly: false,
        });
        if (result.error) {
            setErrors(createFormErrorsFromJoiDetails(result.error.details));
            return;
        }
        setErrors({});

        try {
            const { token } = await sendLogin(payload);
            login(token);
            navigate("/");
        } catch (error) {
            if (error.code == "VALIDATION_ERROR") {
                setErrors(createFormErrorsFromJoiDetails(error.details));
                return;
            }

            setFormState({
                isSubmitting: false,
            });

            //Mostrar un toast / modal
            console.log(error);
        }
    }

    return (
        <main className="Page">
            <div className="container">
                <div className="cajetin">
                    <h2 className="login">Login</h2>
                    <FormContext.Provider value={formState}>
                        <form onSubmit={onSubmit} className="form">
                            <Input
                                name="email"
                                type="email"
                                placeholder="Correo electrónico"
                                error={errors.email}
                                onChange={(value) =>
                                    setPayload({ ...payload, email: value })
                                }
                            />
                            <Input
                                name="password"
                                type="password"
                                placeholder="Contraseña"
                                error={errors.password}
                                onChange={(value) =>
                                    setPayload({ ...payload, password: value })
                                }
                            />
                            <button type="submit" className="boton">
                                Enviar
                            </button>
                        </form>
                    </FormContext.Provider>
                    <div className="registrate">
                        <p>¿No tienes cuenta?</p>
                        <Link to="/register">
                            <p>Regístrate</p>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
