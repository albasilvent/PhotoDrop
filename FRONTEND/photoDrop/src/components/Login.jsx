import "../styles/Login.css";

export function Login() {
    return (
        <main className="main">
            <div className="cajetin">
                <h2 className="login">Login</h2>
                <form className="form" action="">
                    <input type="email" placeholder="Correo electrónico" />
                    <input type="password" placeholder="Contraseña" />
                    <button>Enviar</button>
                </form>
                <a className="olvidado" href="#">
                    ¿Has olvidado la contraseña?
                </a>
                <div className="registrate">
                    <p>¿No tienes cuenta?</p>
                    <a href="#">Regístrate</a>
                </div>
            </div>
        </main>
    );
}
