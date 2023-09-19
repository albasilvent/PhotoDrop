import { FormContext } from "../contexts/form-context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "./Input";
import { sendRegister } from "../functions/api/send-register";
import { Link } from "react-router-dom";
import countryData from "../functions/utils/country-data.json";
import "../styles/Register.css";

export function Register() {
    const countryNames = countryData
        .map((c) => ({
            value: c.name.nativeName.spa?.common ?? c.name.common,
        }))
        .sort((a, b) => {
            return a.value.localeCompare(b.value); /// (-1, +1)
        });

    const navigate = useNavigate();
    const [payload, setPayload] = useState({name: "", surname1: "", surname2: "", email: "", password: "", birthDate: "", country: "" , acceptedTOS: false });
    const [formState, setFormState] = useState({ isSubmitting: false });
    const [errorMsg, setErrorMsg] = useState("");

    async function onSubmit(evt) {
        evt.preventDefault();
        setFormState({ isSubmitting: true });
        try {
            await sendRegister(payload);
            navigate(`/validate-email?email=${payload.email}`);
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

                            <select
                                className="selectPais"
                                required
                                onChange={(event) => {
                                    if (event.target.value !== "Pais") {
                                        setPayload({
                                            ...payload,
                                            country: event.target.value,
                                        });
                                    } else {
                                        setPayload({
                                            ...payload,
                                            country: null,
                                        });
                                    }
                                }}
                            >
                                <option selected="selected" disabled>
                                    País
                                </option>
                                {countryNames.map((option, i) => {
                                    return (
                                        <option key={i} value={option.value}>
                                            {option.label ?? option.value}
                                        </option>
                                    );
                                })}
                            </select>

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
                    {errorMsg && (
                        <p className="errormsg-Register">{errorMsg}</p>
                    )}
                </div>
            </div>
        </main>
    );
}
