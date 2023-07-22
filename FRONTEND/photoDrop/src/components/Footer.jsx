import { Link, useLocation } from "react-router-dom";
import "../styles/Footer.css";

export function Footer() {
    const location = useLocation();

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    return (
        <footer>
            <Link to="/">
                <p
                    className={
                        isActiveRoute("/")
                            ? "material-symbols-rounded active"
                            : "material-symbols-rounded"
                    }
                >
                    Home
                </p>
            </Link>
            <p className="material-symbols-rounded">add_box</p>
            <Link to="/search">
                <p
                    className={
                        isActiveRoute("/search")
                            ? "material-symbols-rounded active"
                            : "material-symbols-rounded"
                    }
                >
                    Search
                </p>
            </Link>
            <Link to="/login">
                <p className="material-symbols-rounded">login</p>
            </Link>
        </footer>
    );
}
