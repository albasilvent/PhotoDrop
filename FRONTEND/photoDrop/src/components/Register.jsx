import "../styles/Register.css";
import { Input } from "./Input";

export function Register() {
    return (
        <main className="Page">
            <div className="container">
                <div className="cajetin">
                    <h2 className="titulo">Regístrate</h2>
                    <form className="form" action="">
                        <Input
                            name="text"
                            type="text"
                            placeholder="Nombre"
                            required
                        />
                        <Input
                            name="text"
                            type="text"
                            placeholder="Primer apellido"
                            required
                        />
                        <Input
                            name="text"
                            type="text"
                            placeholder="Segundo apellido"
                        />
                        <Input
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Contraseña"
                            required
                        />
                        <Input name="date" type="date" required />
                        <Input name="text" type="text" placeholder="País" />

                        <div className="div-checkbox">
                            <Input name="checkbox" type="checkbox" required />
                            <label className="label" htmlFor="checkbox">
                                Acepto los términos
                            </label>
                        </div>
                        <button className="boton" type="submit">
                            Crear cuenta
                        </button>
                    </form>
                    <div className="log">
                        <p>¿Tienes una cuenta?</p>
                        <a href="#">Inicia sesión</a>
                    </div>
                </div>
            </div>
        </main>
        nomedejahacerpush
    );
}
