/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/Menu.css";
import { DeletePostModal } from "./DeletePostModal";
import { useLocation, useNavigate } from "react-router-dom";

export function PostMenu({postId, deletePostById}) {
    const [menuDisplay, setMenuDisplay] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    function onClick(event) {
        event.stopPropagation();
        setDeleteDisplay(false);
        setMenuDisplay(!menuDisplay);
    }

    const [deleteDisplay, setDeleteDisplay] = useState(false);
    function onDeleteClick() {
        setMenuDisplay(!menuDisplay);
        setDeleteDisplay(!deleteDisplay);
        if (location == "post/:id"){
            navigate("/users/:id")
        }
    }

    return (
        <>
            <div className="menu">
                <p className="material-symbols-rounded" onClick={onClick}>
                    more_vert
                </p>
                <article
                    className={`post-modal ${menuDisplay ? "" : "hidden"}`}
                >
                    <div className="post-modal-div editar" onClick={onClick}>
                        <p className="material-symbols-rounded">edit</p>
                        <p>Editar</p>
                    </div>
                    <div
                        className="post-modal-div borrar"
                        onClick={onDeleteClick}
                    >
                        <p className="material-symbols-rounded">delete</p>
                        <p>Eliminar</p>
                    </div>
                </article>
            </div>
            <DeletePostModal deleteDisplay={deleteDisplay} setDeleteDisplay={setDeleteDisplay} postId={postId} deletePostById={deletePostById}/>
        </>
    );
}
