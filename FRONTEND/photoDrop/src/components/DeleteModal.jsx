import "../styles/DeleteModal.css";
// eslint-disable-next-line react/prop-types
export function DeleteModal ({modalDisplay}) {
    console.log(modalDisplay);
    return <form className={`delete-modal ${modalDisplay ? "" : "hidden"}`}>
        <p>¿Eliminar post?</p>
        <div className="DeleteButtons">
            <button className="boton">Aceptar</button>
            <button className="boton">Cancelar</button>
        </div>
    </form>
}