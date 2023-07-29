import "../styles/Login.css";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginContext } from "../contexts/auth-context.jsx";
import { sendLogin } from "../functions/api/send-login";
import { Input } from "./Input";
import { FormContext } from "../contexts/form-context";

export function Login() {
    const [errorMsg, setErrorMsg] = useState("");
    const [formState, setFormState] = useState({ isSubmitting: false });

    const login = useContext(LoginContext);
    const navigate = useNavigate();

    const [payload, setPayload] = useState({
        email: "",
        password: "",
    });

    async function onSubmit(evt) {
        evt.preventDefault();

        setFormState({
            isSubmitting: true,
        });

        try {
            const { token } = await sendLogin(payload);
            login(token);
            navigate("/");
        } catch (error) {

            setFormState({
                isSubmitting: false,
            });

            setErrorMsg(error.msg);

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
                                onChange={(value) =>
                                    setPayload({ ...payload, email: value })
                                }
                                required
                            />
                            <Input
                                name="password"
                                type="password"
                                placeholder="Contraseña"
                                onChange={(value) =>
                                    setPayload({ ...payload, password: value })
                                }
                                required
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
            {errorMsg && <p className="errormsg">{errorMsg}</p>}
                </div>
            </div>
        </main>
    );
}
