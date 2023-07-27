/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/EditCommentModal.css";
import { FormContext } from "../contexts/form-context";

export function EditCommentModal({
    comment,
    editModalDisplay,
    setEditModalDisplay,
}) {

    const [formState, setFormState] = useState({ isSubmitting: false });

    const [textAreaValue, setTextAreaValue] = useState(comment.comment);

    const [payload, setPayload] = useState({
        comment: "",
    });


    const blankProfilePicture = "/blankProfilePicture.jpg";


    function onTextAreaChange(event) {
        setTextAreaValue(event.target.value);
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
            //funcion para enviar el payload del nuevo comentario
        } catch (error) {
            console.log(error); //hacer errores
            }

            setFormState({
                isSubmitting: false,
            });

            //Mostrar un toast / modal
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
                            ></img>
                        )}
                        {!comment.profilePicture && (
                            <img
                                className="profilePicture"
                                src={blankProfilePicture}
                            ></img>
                        )}
                        <FormContext.Provider value={formState}>
                            <form>
                                <textarea
                                    value={textAreaValue}
                                    onChange={onTextAreaChange}
                                />
                            </form>
                        </FormContext.Provider>
                    </div>
                </div>
            </aside>
        </div>
    );
}

