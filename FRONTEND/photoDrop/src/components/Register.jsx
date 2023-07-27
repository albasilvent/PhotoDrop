import "../styles/Register.css";

export function Register() {
    return (
        <main className="Page">
            <div className="container">
                <div className="cajetin">
                    <h2 className="titulo">¡Regístrate!</h2>
                    <form className="form" action="">
                        <input type="text" placeholder="Nombre" required />
                        <input
                            type="text"
                            placeholder="Primer apellido"
                            required
                        />
                        <input type="text" placeholder="Segundo Apellido" />
                        <input type="email" placeholder="Email" required />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            required
                        />
                        <input type="date" required />
                        <input type="text" placeholder="País" />
                        <div className="div-checkbox">
                            <input type="checkbox" required />
                            <label className="label" htmlFor="">
                                Acepto los términos
                            </label>
                        </div>
                        <button>Crear cuenta</button>
                    </form>
                    <p>¿Tienes una cuenta?</p>
                    <a href="#">¡Entra aquí!</a>
                </div>
            </div>
        </main>
    );
}
