/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/Menu.css";

export function CommentMenu({editModalDisplay, setEditModalDisplay}) {
    const [menuDisplay, setMenuDisplay] = useState(false);
    function onClick() {
        setMenuDisplay(!menuDisplay);
    }

    function onEditClick(){
        setMenuDisplay(!menuDisplay);
        setEditModalDisplay(!editModalDisplay);
    }

    return (
        <div className="menu">
            <p className="material-symbols-rounded" onClick={onClick}>
                more_vert
            </p>
            <article className={`post-modal ${menuDisplay ? "" : "hidden"}`}>
                <div className="post-modal-div editar" onClick={onEditClick}>
                    <p className="material-symbols-rounded">edit</p>
                    <p>Editar</p>
                </div>
                <div className= "post-modal-div borrar" onClick={onClick}>
                    <p className="material-symbols-rounded">delete</p>
                    <p>Eliminar</p>
                </div>
            </article>
        </div>
    );
}