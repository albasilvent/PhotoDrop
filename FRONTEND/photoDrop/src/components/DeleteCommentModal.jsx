import { sendDeleteComment } from "../functions/api/send-delete-comment";
import "../styles/DeleteCommentModal.css"

/* eslint-disable react/prop-types */
export function DeleteCommentModal({ deleteModalDisplay, setDeleteModalDisplay, postId, commentId, deleteCommentById }) {

    function onAcceptClick(event) {
        event.preventDefault();
        sendDeleteComment(postId, commentId);
        deleteCommentById(commentId)
        setDeleteModalDisplay(!deleteModalDisplay);
    }

    function onCancelClick(event) {
        event.preventDefault();
        setDeleteModalDisplay(false);
    }
    return <div className={`deleteCommentModal ${deleteModalDisplay ? "" : "hidden"}`}>
        <p>¿Quieres borrar el comentario?</p>
        <form className="deleteButtons">
            <button onClick={onAcceptClick} type="submit">Aceptar</button>
            <button onClick={onCancelClick}>Cancelar</button>
        </form>
    </div>
}