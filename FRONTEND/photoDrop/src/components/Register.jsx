import "../styles/Register.css";
import { Input } from "./Input";

export function Register() {
    return (
        <main className="main">
            <div className="cajetin">
                <h2 className="titulo">¡Regístrate!</h2>
                <form className="form" action="">
                    <Input
                        name="name"
                        type="text"
                        placeholder="Nombre"
                        required
                    />
                    <Input
                        name="surname1"
                        type="text"
                        placeholder="Primer apellido"
                        required
                    />
                    <Input
                        name="surname2"
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
                    <Input name="country" type="text" placeholder="País" />

                    <div className="div-checkbox">
                        <Input name="checkbox" type="checkbox" required />
                        <label className="label" htmlFor="checkbox">
                            Acepto los términos
                        </label>
                    </div>
                    <button>Crear cuenta</button>
                </form>
                <p>¿Tienes una cuenta?</p>
                <a href="#">¡Entra aquí!</a>
            </div>
        </main>
    );
}
