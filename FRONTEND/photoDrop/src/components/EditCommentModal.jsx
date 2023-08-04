/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/EditCommentModal.css";
import { FormContext } from "../contexts/form-context";
import { sendEditComment } from "../functions/api/send-edit.comment";

export function EditCommentModal({
    comment,
    editModalDisplay,
    setEditModalDisplay,
    postId,
    commentMsg,
    setCommentMsg,
}) {
    const [formState, setFormState] = useState({ isSubmitting: false });
    const [payload, setPayload] = useState({ comment: commentMsg });
    const [inputValue, setInputValue] = useState(commentMsg);

    const blankProfilePicture = "/blankProfilePicture.jpg";

    function onInputChange(event) {
        const value = event.target.value;
        if (value.length == 0) {
            setPayload({ ...payload, comment: commentMsg })
        } else {
            setInputValue(value);
        }
        setPayload({ ...payload, comment: value });
    }

    function onCrossClick() {
        setEditModalDisplay(!editModalDisplay);
    }

    async function onSubmit(evt) {
        evt.preventDefault();

        setFormState({
            isSubmitting: true,
        });

        try {
            await sendEditComment(payload, postId, comment.id);
            setEditModalDisplay(!editModalDisplay);
            setCommentMsg(inputValue);
        } catch (error) {
            console.log(error);
        }

        setFormState({
            isSubmitting: false,
        });
    }

    return (
        <div
            className={`editModalContainer ${editModalDisplay ? "" : "hidden"}`}
        >
            <aside className="editCommentModal">
                <p className="material-symbols-rounded" onClick={onCrossClick}>
                    Close
                </p>
                <div className="commentUser commmentUserModal">
                    <div className="div1">
                        {comment.profilePicture && (
                            <img
                                className="profilePicture"
                                src={comment.profilePicture}
                                alt="Profile"
                            />
                        )}
                        {!comment.profilePicture && (
                            <img
                                className="profilePicture"
                                src={blankProfilePicture}
                                alt="Blank Profile"
                            />
                        )}
                        <FormContext.Provider value={formState}>
                            <form
                                onSubmit={onSubmit}
                                className="editCommentForm"
                            >
                                <input
                                    className="input"
                                    name="comentario"
                                    type="text"
                                    value={inputValue}
                                    onChange={onInputChange}
                                />
                                <button type="submit">Aceptar</button>
                            </form>
                        </FormContext.Provider>
                    </div>
                </div>
            </aside>
        </div>
    );
}
