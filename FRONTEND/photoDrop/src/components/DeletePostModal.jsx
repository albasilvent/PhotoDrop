import "../styles/DeletePostModal.css"
import { sendDeletePost } from "../functions/api/send-delete-post";

/* eslint-disable react/prop-types */
export function DeletePostModal({setDeleteDisplay, deleteDisplay, postId}){

    function onAcceptClick(){
        sendDeletePost(postId);
        console.log("postBorrado");
        window.location.reload();
    }

    function onCancelClick(event){
        event.preventDefault();
        setDeleteDisplay();
    }
    return <div className={`deletePostModal ${deleteDisplay ? "" : "hidden"}`}>
        <p>¿Quieres borrar el post?</p>
        <form className="deleteButtons">
            <button onClick={onAcceptClick} type="submit">Aceptar</button>
            <button onClick={onCancelClick}>Cancelar</button>
        </form>
    </div>
}