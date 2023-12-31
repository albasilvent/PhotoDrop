import { Comment } from "./Comment.jsx";
import { Input } from "./Input.jsx";
import { useCurrentUser } from "../functions/utils/use-current-user";
import { useState } from "react";
import "../styles/CommentsModal.css";
import { sendAddComment } from "../functions/api/send-add-comment.js";
import { FormContext } from "../contexts/form-context.jsx";
import { useEffect } from "react";
/* eslint-disable react/prop-types */
export function CommentsModal({
    commentsState,
    setCommentsState,
    menuDisplay,
    setMenuDisplay,
    postId,
    deleteCommentById,
    commentsCount,
    setCommentsCount,
}) {
    const currentUser = useCurrentUser();
    const [profilePicture, setProfilePicture] = useState("");

    useEffect(() => {
        if (currentUser) {
            {
                fetch(`http://localhost:5000/users/${currentUser.id}`)
                    .then((res) => res.json())
                    .then((result) => {
                        setProfilePicture(result.data.profilePicture);
                    });
            }
        }
    }, [currentUser]);

    const blankProfilePicture = "/blankProfilePicture.jpg";

    function onCrossClick() {
        setMenuDisplay(!menuDisplay);
    }

    function addComment(newComment) {
        setCommentsState([newComment, ...commentsState]);
        setCommentsCount(commentsCount + 1);
    }

    const [formState, setFormState] = useState({ isSubmitting: false });
    const [payload, setPayload] = useState({});

    async function onSubmit(event) {
        event.preventDefault();

        setFormState({
            isSubmitting: true,
        });

        try {
            const newComment = await sendAddComment(payload, postId);
            addComment(newComment);
        } catch (err) {
            setFormState({ isSubmitting: false });
        }
    }

    return (
        <div
            className={`modal-comentarios ${
                menuDisplay ? "visible" : "hidden"
            }`}
        >
            <FormContext.Provider value={formState}>
                <form className="addComment" onSubmit={onSubmit}>
                    {currentUser?.profilePicture && (
                        <img
                            className="profilePicture"
                            src={profilePicture}
                        ></img>
                    )}
                    {!currentUser?.profilePicture && (
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
            {commentsState &&
                commentsState.map((comment) => {
                    // eslint-disable-next-line react/jsx-key
                    return (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            postId={postId}
                            deleteCommentById={deleteCommentById}
                        />
                    );
                })}
            {commentsState.length == 0 && <p>No hay comentarios</p>}
        </div>
    );
}
