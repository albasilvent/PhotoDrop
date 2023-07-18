/* eslint-disable react/prop-types */
import { useState } from 'react';
import EditCommentModal from './EditCommentModal';

export function Comment({ comment }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveComment = (editedComment) => {
        // Añadir función del back
        console.log('Comentario editado:', editedComment);

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