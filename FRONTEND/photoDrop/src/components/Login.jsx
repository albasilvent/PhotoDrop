import "../styles/Login.css";

export function Login() {
    return (
        <main className="main">
            <form className="form" action="">
                <input type="email" placeholder="Introduce@tuEmail.com" />
                <input type="password" placeholder="Contraseña" />
                <button>Enviar</button>
            </form>
            <a href="#">¿Has olvidado la contraseña?</a>
            <div>
                <p>¿No tienes cuenta?</p>
                <a href="#">Regístrate</a>
            </div>
        </main>
    );
}
