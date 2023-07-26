import { useState } from "react";
import "../styles/Menu.css";

export function PostMenu() {
    const [menuDisplay, setMenuDisplay] = useState(false);
    function onClick() {
        setMenuDisplay(!menuDisplay);
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
                <div className= "post-modal-div">
                    <p className="material-symbols-rounded">delete</p>
                    <p>Eliminar</p>
                </div>
            </article>
        </div>
    );
}
