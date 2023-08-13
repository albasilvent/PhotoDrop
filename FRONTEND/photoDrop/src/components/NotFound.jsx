import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export function NotFound() {
    return (
        <article>
            <div className="nf-container">
                <p>
                    Es posible que el enlace que has seguido sea incorrecto o
                    que se haya eliminado la página.
                </p>
                <Link to="/">
                    <p>Volver a PhotoDrop</p>
                </Link>
            </div>
        </article>
    );
}
