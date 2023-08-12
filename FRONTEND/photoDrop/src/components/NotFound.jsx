import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <main>
            <p>
                Es posible que el enlace que has seguido sea incorrecto o que se
                haya eliminado la página.
            </p>
            <Link to="/">
                <p>Volver a PhotoDrop</p>
            </Link>
        </main>
    );
}
