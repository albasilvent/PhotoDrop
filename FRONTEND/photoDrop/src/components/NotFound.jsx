import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export function NotFound() {
    return (
        <article className="notFound">
            <div className="nf-container">
                <p>
                    Es posible que el enlace que has seguido sea incorrecto o
                    que se haya eliminado la página.
                </p>
                <Link to="/" style={{color: "gray", textDecoration:"none", fontStyle: "italic"}}>
                    <p>Volver a PhotoDrop</p>
                </Link>
            </div>
        </article>
    );
}
