import "../styles/Header.css";
import { Link } from "react-router-dom";

export function Header() {
    return (
        <header>
            <Link to={`/`} style={{ textDecoration: "none", color: "black" }}>
                <h1>PhotoDrop</h1>
            </Link>
        </header>
    );
}
