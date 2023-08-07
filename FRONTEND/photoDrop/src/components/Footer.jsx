import { Link, useLocation } from "react-router-dom";
import "../styles/Footer.css";
import { useCurrentUser } from "../functions/utils/use-current-user";

export function Footer() {
    const location = useLocation();
    const currentUser = useCurrentUser();
    const blankImg = "/blankProfilePicture.jpg";

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    const showLink = (path) => {
        if (location.pathname === "/register") {
            return path === "/";
        } else if (location.pathname === "/validate-email") {
            return path === "/";
        } else {
            return !isActiveRoute("/login") || path === "/";
        }
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
                    {currentUser ? (
                        <Link to={`/users/${currentUser?.id}`}>
                            {currentUser?.profilePicture && (
                                <img
                                    src={currentUser?.profilePicture}
                                    alt="Profile"
                                    className="profilePictureFooter"
                                />
                            )}

                            {!currentUser?.profilePicture && (
                                <img
                                    src={blankImg}
                                    alt="Profile"
                                    className="profilePictureFooter"
                                />
                            )}
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
