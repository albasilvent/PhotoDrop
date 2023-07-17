import React, { useState } from 'react';

const EditCommentModal = ({ comment, onSave, onCancel }) => {
    const [editedComment, setEditedComment] = useState(comment);

    const handleChange = (e) => {
        setEditedComment(e.target.value);
    };

    const handleSave = () => {
        onSave(editedComment);
    };

    return (
        <div>
            <textarea value={editedComment} onChange={handleChange} />
            <button onClick={handleSave}>Guardar</button>
            <button onClick={onCancel}>Cancelar</button>
        </div>
    );
};

export default EditCommentModal;