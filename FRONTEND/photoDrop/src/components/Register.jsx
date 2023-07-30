import { FormContext } from "../contexts/form-context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Register.css";
import { Input } from "./Input";
import { sendRegister } from "../functions/api/send-register";
import { Link } from "react-router-dom";

export function Register() {
    const navigate = useNavigate();
    const [payload, setPayload] = useState({});
    const [formState, setFormState] = useState({ isSubmitting: false });
    const [errorMsg, setErrorMsg] = useState("");

    async function onSubmit(evt) {
        evt.preventDefault();
        setFormState({ isSubmitting: true });
        try {
            await sendRegister(payload);
            navigate("/validate-email");
        } catch (err) {
            setFormState({ isSubmitting: false });
            setErrorMsg(err.msg);
        }
    }

    return (
        <main className="Page">
            <div className="container-register">
                <div className="cajetin-register">
                    <h2 className="titulo">Regístrate</h2>
                    <FormContext.Provider value={formState}>
                        <form className="form-register" onSubmit={onSubmit}>
                            <Input
                                name="text"
                                type="text"
                                placeholder="Nombre"
                                required
                                onChange={(value) =>
                                    setPayload({ ...payload, name: value })
                                }
                            />
                            <Input
                                name="text"
                                type="text"
                                placeholder="Primer apellido"
                                required
                                onChange={(value) =>
                                    setPayload({ ...payload, surname1: value })
                                }
                            />
                            <Input
                                name="text"
                                type="text"
                                placeholder="Segundo apellido"
                                onChange={(value) =>
                                    setPayload({ ...payload, surname2: value })
                                }
                            />
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email"
                                required
                                onChange={(value) =>
                                    setPayload({ ...payload, email: value })
                                }
                            />
                            <Input
                                name="password"
                                type="password"
                                placeholder="Contraseña"
                                required
                                onChange={(value) =>
                                    setPayload({ ...payload, password: value })
                                }
                            />
                            <Input
                                name="date"
                                type="date"
                                required
                                onChange={(value) =>
                                    setPayload({ ...payload, birthDate: value })
                                }
                            />
                            <Input
                                name="text"
                                type="text"
                                placeholder="País"
                                onChange={(value) =>
                                    setPayload({ ...payload, country: value })
                                }
                            />

                            <div className="div-checkbox">
                                <Input
                                    name="checkbox"
                                    type="checkbox"
                                    required
                                    onChange={() => {
                                        setPayload({
                                            ...payload,
                                            acceptedTOS: true,
                                        });
                                    }}
                                />
                                <label className="label" htmlFor="checkbox">
                                    Acepto los términos
                                </label>
                            </div>
                            <button className="boton" type="submit">
                                Crear cuenta
                            </button>
                        </form>
                    </FormContext.Provider>
                    <div className="log">
                        <p>¿Tienes una cuenta?</p>
                        <Link to="/login">
                            <p href="#">Inicia sesión</p>
                        </Link>
                    </div>
                    {errorMsg && <p className="errormsg">{errorMsg}</p>}
                </div>
            </div>
        </main>
    );
}
