import { useContext, useState } from "react";
import { LogoutContext } from "../contexts/auth-context";
import "../styles/Menu.css";
import { useNavigate } from "react-router-dom";

export function ProfileMenu() {
    const [menuDisplay, setMenuDisplay] = useState(false);
    const logout = useContext(LogoutContext);
    const navigate= useNavigate();

    function onClick() {
        setMenuDisplay(!menuDisplay);
    }

    function onLogoutClick(){
        logout();
        navigate("/");
    }

    return (
        <div className="menu">
            <p className="material-symbols-rounded" onClick={onClick}>
                more_vert
            </p>
            <article className={`post-modal ${menuDisplay ? "" : "hidden"}`}>
                <div className="post-modal-div">
                    <p className="material-symbols-rounded">edit</p>
                    <p>Editar</p>
                </div>
                <div className= "post-modal-div" onClick={onLogoutClick}>
                    <p className="material-symbols-rounded">logout</p>
                    <p>Cerrar sesión</p>
                </div>
            </article>
        </div>
    );
}