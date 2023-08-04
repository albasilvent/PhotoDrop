/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/Menu.css";

export function CommentMenu({ editModalDisplay, setEditModalDisplay, deleteModalDisplay, setDeleteModalDisplay }) {
    const [menuDisplay, setMenuDisplay] = useState(false);

    function onClick() {
        setMenuDisplay(!menuDisplay);
    }

    function onEditClick() {
        setMenuDisplay(!menuDisplay);
        setEditModalDisplay(!editModalDisplay);
    }

    function onDeleteClick(){
        setMenuDisplay(!menuDisplay);
        setDeleteModalDisplay(!deleteModalDisplay);
    }

    return (
        <div className="menu">
            <p className="material-symbols-rounded" onClick={onClick}>
                more_vert
            </p>
            <article className={`post-modal ${menuDisplay ? "" : "hidden"}`}>
                <div className="post-modal-div editar" onClick={onEditClick}>
                    <p className="material-symbols-rounded">edit</p>
                    <p className="editarBorrar">Editar</p>
                </div>
                <div className="post-modal-div borrar" onClick={onDeleteClick}>
                    <p className="material-symbols-rounded">delete</p>
                    <p className="editarBorrar">Eliminar</p>
                </div>
            </article>
        </div>
    );
}
