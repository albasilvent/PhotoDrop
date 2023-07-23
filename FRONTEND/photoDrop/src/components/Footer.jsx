import { Link, useLocation } from "react-router-dom";
import "../styles/Footer.css";
import { useCurrentUser } from "../functions/utils/use-current-user";

export function Footer() {
    const location = useLocation();
    const user = useCurrentUser();
    let imgRoute;

    if (user) {
        if (user.profilePicture !== null) {
            imgRoute = user.profilePicture;
        } else {
            imgRoute = "/blankProfilePicture.jpg";
        }
    }

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    const showLink = (path) => {
        return !isActiveRoute("/login") || path === "/";
    };

    return (
        <footer>
            {showLink("/") && (
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
            )}
            {showLink("/add-post") && (
                <Link to="/add-post">
                    <p
                        className={
                            isActiveRoute("/add-post")
                                ? "material-symbols-rounded active"
                                : "material-symbols-rounded"
                        }
                    >
                        add_box
                    </p>
                </Link>
            )}
            {showLink("/search") && (
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
            )}
            {showLink("/login") && (
                <>
                    {user ? (
                        <Link to="/profile">
                            <img
                                src={imgRoute}
                                alt="Profile"
                                className="profilePictureFooter"
                            />
                        </Link>
                    ) : (
                        <Link to="/login">
                            <p
                                className={
                                    isActiveRoute("/login")
                                        ? "material-symbols-rounded active"
                                        : "material-symbols-rounded"
                                }
                            >
                                login
                            </p>
                        </Link>
                    )}
                </>
            )}
        </footer>
    );
}
