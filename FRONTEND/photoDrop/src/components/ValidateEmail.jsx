import { Input } from "./Input";
import "../styles/ValidateEmail.css"

export function ValidateEmail() {
    return (
        <main className="Page">
            <div className="container-validate">
                <div className="cajetin-validate">
                    <h2 className="h2-validate">Verifica tu email</h2>
                    <p className="p-validate">Hemos enviado un código a tu email</p>
                    <form className="form-validate">
                        <Input name="text"
                        type="text"
                        placeholder="Escribe aquí tu código..." 
                        required/> 
                        <button className="boton" type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </main>
    );
}