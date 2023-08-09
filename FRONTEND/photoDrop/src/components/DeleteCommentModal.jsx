import "../styles/DeletePostModal.css"
import { sendDeleteComment } from "../functions/api/send-delete-comment";

/* eslint-disable react/prop-types */
export function DeleteCommentModal({ setDeleteDisplay, deleteDisplay, commentId }) {

    function onAcceptClick() {
        sendDeleteComment(commentId);
        window.location.reload();
    }

    function onCancelClick(event) {
        event.preventDefault();
        setDeleteDisplay();
    }
    return <div className={`deleteCommentModal ${deleteDisplay ? "" : "hidden"}`}>
        <p>¿Quieres borrar el comentario?</p>
        <form className="deleteButtons">
            <button onClick={onAcceptClick} type="submit">Aceptar</button>
            <button onClick={onCancelClick}>Cancelar</button>
        </form>
    </div>
}