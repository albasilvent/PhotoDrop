/* eslint-disable react/prop-types */
import { useState } from 'react';

export function EditCommentModal({ comment, onSave, onCancel }) {
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
}