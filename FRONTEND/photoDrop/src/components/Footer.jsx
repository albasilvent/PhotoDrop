import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Footer.css";
// import { getUser } from "../functions/utils/get-user";

export function Footer() {
    const [user] = useState(null);
    // let imgRoute;

    // function getImgUser(imgRoute) {
    //     setUser(getUser());

    //     user
    //         ? (imgRoute = user.profilePicture)
    //         : (imgRoute = "/blankProfilePicture.jpg");
    //     return imgRoute;
    // }

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
            {!user && <p className="material-symbols-rounded">login</p>}
            {/* {user && <img className="profilePicture" src={imgRoute} />} */}
        </footer>
    );
}
