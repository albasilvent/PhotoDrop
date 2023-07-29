import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Footer.css";
import { useCurrentUser } from "../functions/utils/use-current-user";

export function Footer() {
    const location = useLocation();
    const user = useCurrentUser();
    const [imgRoute, setImgRoute] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (user) {
            setUserId(user.id);
            if (user.profilePicture !== null) {
                setImgRoute(user.profilePicture);
            } else {
                setImgRoute("/blankProfilePicture.jpg");
            }
        }
    }, [user]);

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    const showLink = (path) => {
        if (location.pathname === "/register") {
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
                    {user ? (
                        <Link to={`/users/${userId}`}>
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
