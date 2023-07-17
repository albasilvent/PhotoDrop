import React, { useState } from 'react';
import EditCommentModal from './EditCommentModal';

const Comment = ({ comment }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveComment = (editedComment) => {
        // Aquí puedes llamar a una función para guardar el comentario editado en tu backend o hacer cualquier otra acción necesaria
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
};

export default Comment;