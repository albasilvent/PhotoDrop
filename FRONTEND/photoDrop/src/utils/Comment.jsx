/* eslint-disable react/prop-types */
import { useState } from 'react';
import { EditCommentModal } from '../pages/EditComment';
import editComment from '../../../../BACKEND/use-cases/edit';

export function Comment({ comment }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveComment = (editedComment) => {
        editComment(); //Funcion del back
        console.log('Comentario editado:', editedComment); //¿Borrar?

        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    return (
        <div>
            <p>{comment}</p>
            {!isEditing && (
                <button onClick={handleEditClick}>Editar comentario</button>
            )}
            {isEditing && (
                <EditCommentModal
                    comment={comment}
                    onSave={handleSaveComment}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
}