import { useState } from "react";
import "../styles/Menu.css";
import { DeleteModal } from "./DeleteModal";

export function PostMenu() {
    const [menuDisplay, setMenuDisplay] = useState(false);
    const [modalDisplay, setModalDisplay] = useState(false);

    function onClick(event) {
        event.stopPropagation();
        setMenuDisplay(!menuDisplay);
    }
    
    function onButtonClick(event) {
        event.stopPropagation();
        console.log("Hola");
        setModalDisplay(!modalDisplay);
        setMenuDisplay(!menuDisplay);
    }

    return (
        <div className="menu">
            <p className="material-symbols-rounded" onClick={onClick}>
                more_vert
            </p>
            <article className={`post-modal ${menuDisplay ? "" : "hidden"}`}>
                <div className="post-modal-div editar">
                    <p className="material-symbols-rounded">edit</p>
                    <p>Editar</p>
                </div>
                <div className= "post-modal-div eliminar" onClick={onButtonClick}>
                    <p className="material-symbols-rounded">delete</p>
                    <p>Eliminar</p>
                </div>
            </article>
            <DeleteModal modalDisplay={modalDisplay}/>
        </div>
    );
}
