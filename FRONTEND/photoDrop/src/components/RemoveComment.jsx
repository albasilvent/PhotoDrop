import { useState } from 'react';
import { removeComment } from "../../../../BACKEND/use-cases/remove";

export function RemoveComment() {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        removeComment(); //Funcion del back
        setShowModal(false);
    };

    return (
        <div>
            <p>Tu comentario</p>
            <button onClick={() => setShowModal(true)}>Eliminar comentario</button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>¿Estás seguro de que deseas eliminar este comentario?</h2>
                        <button onClick={handleDelete}>Eliminar</button>
                        <button onClick={() => setShowModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}