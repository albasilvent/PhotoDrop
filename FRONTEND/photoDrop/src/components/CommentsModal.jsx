import { Comment } from "./Comment.jsx";
import { Input } from "./Input.jsx";
import { useCurrentUser } from "../functions/utils/use-current-user";
import { useState } from "react";
import "../styles/CommentsModal.css";
import { sendAddComment } from "../functions/api/send-add-comment.js";
import { FormContext } from "../contexts/form-context.jsx";
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export function CommentsModal({
    comments,
    menuDisplay,
    setMenuDisplay,
    postId,
}) {
    const currentUser = useCurrentUser();

    const blankProfilePicture = "/blankProfilePicture.jpg";

    function onCrossClick() {
        setMenuDisplay(!menuDisplay);
    }

    const [formState, setFormState] = useState({ isSubmitting: false });
    const [payload, setPayload] = useState({});

    async function onSubmit(event) {
        event.preventDefault();

        setFormState({
            isSubmitting: true,
        });

        try {
            await sendAddComment(payload, postId);
        } catch (err) {
            setFormState({ isSubmitting: false });
        }
    }

    return (
        <div className={`modal-comentarios ${menuDisplay ? "" : "hidden"}`}>
            <FormContext.Provider value={formState}>
                <form className="addComment" onSubmit={onSubmit}>
                    {currentUser.profilePicture && (
                        <img
                            className="profilePicture"
                            src={currentUser.profilePicture}
                        ></img>
                    )}
                    {!currentUser.profilePicture && (
                        <img
                            className="profilePicture"
                            src={blankProfilePicture}
                        ></img>
                    )}
                    <Input
                        name="comment"
                        type="text"
                        placeholder="Añade un comentario..."
                        onChange={(value) =>
                            setPayload({ ...payload, comment: value })
                        }
                    />
                    <button type="submit"> + </button>
                </form>
            </FormContext.Provider>
            <p
                style={{ padding: "0.5rem" }}
                className="material-symbols-rounded"
                onClick={onCrossClick}
            >
                Close
            </p>
            {comments &&
                comments.map((comment, i) => {
                    // eslint-disable-next-line react/jsx-key
                    return <Comment key={i} comment={comment} postId={postId}/>;
                })}
            {comments.length == 0 && <p>No hay comentarios</p>}
        </div>
    );
}
