import "../styles/DeletePostModal.css";
import { sendDeletePost } from "../functions/api/send-delete-post";

/* eslint-disable react/prop-types */
export function DeletePostModal({
    setDeleteDisplay,
    deleteDisplay,
    postId,
    deletePostById,
}) {
    function onSubmit(event) {
        event.preventDefault();
    }

    async function onAcceptClick() {
        await sendDeletePost(postId);
        console.log(postId);
        setDeleteDisplay(!deleteDisplay);
        deletePostById(postId);
        console.log("postBorrado");
    }

    function onCancelClick() {
        setDeleteDisplay();
    }
    return (
        <div className={`deletePostModal ${deleteDisplay ? "" : "hidden"}`}>
            <p>¿Quieres borrar el post?</p>
            <form className="deleteButtons" onSubmit={onSubmit}>
                <button onClick={onAcceptClick} type="submit">
                    Aceptar
                </button>
                <button onClick={onCancelClick}>Cancelar</button>
            </form>
        </div>
    );
}
