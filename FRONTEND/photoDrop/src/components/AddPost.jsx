import "../styles/addpost.css";

export function AddPost() {
    const handleFileChange = (evt) => {
        const selectedFile = evt.target.files[0];
        const input = event.target;
        const files = input.files;

        if (files.length > 3) {
            alert("Solo puedes cargar un máximo de 3 fotos.");
            input.value = ""; // Limpiar la selección de archivos si excede el límite.
        } else {
            // Aquí puedes procesar los archivos seleccionados, si es necesario.
            // Por ejemplo, puedes mostrar una vista previa de las imágenes, etc.
        }

        console.log("Imagen seleccionada:", selectedFile);
    };

    return (
        <main className="Page">
            <div className="container-addpost">
                <div className="cajetin-addpost">
                    <h2 className="titulo-addpost">Añade una publicación</h2>
                    <form className="form-addpost">
                        <div className="div-titulo-area">
                            <label htmlFor="">Título:</label>
                            <textarea
                                className="textarea"
                                name=""
                                id=""
                                required
                            ></textarea>
                        </div>
                        <div className="div-browse">
                            <label htmlFor="imageInput">Fotos:</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                multiple
                                required
                            />
                        </div>
                        <div className="div-descripcion-area">
                            <label htmlFor="">Descripción:</label>
                            <textarea
                                className="textarea"
                                name=""
                                id=""
                            ></textarea>
                        </div>
                        <button className="publicar">Publicar</button>
                    </form>
                </div>
            </div>
        </main>
    );
}
