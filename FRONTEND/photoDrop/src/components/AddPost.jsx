import "../styles/addpost.css";
import { useState } from "react";

export function AddPost() {
    const addImg = "../public/addimg.png";
    const [payload, setPayload] = useState({});
    const [photo1, setPhoto1] = useState("");
    const [photo2, setPhoto2] = useState("");
    const [photo3, setPhoto3] = useState("");

    function onTitleChange(event) {
        const value = event.target.value;
        setPayload({ ...payload, title: value });
    }

    function onDescriptionChange(event) {
        const value = event.target.value;
        setPayload({ ...payload, description: value });
    }

    function handlePhotosChange(event) {
        if (!photo1) {
            const file = event.target.files[0];
            if (file) {
                const newPhoto1 = URL.createObjectURL(file);
                setPhoto1(newPhoto1);
                event.target.value = null;
            }
        }
        if (photo1 && !photo2) {
            const file = event.target.files[0];
            if (file) {
                const newPhoto2 = URL.createObjectURL(file);
                setPhoto2(newPhoto2);
                event.target.value = null;
            }
        }
        if (photo1 && photo2 && !photo3) {
            const file = event.target.files[0];
            if (file) {
                const newPhoto3 = URL.createObjectURL(file);
                setPhoto3(newPhoto3);
            }
        }
    }

    return (
        <main className="Page">
            <div className="container-addpost">
                <div className="cajetin-addpost">
                    <h2 className="titulo-addpost">Añade una publicación</h2>
                    <form className="form-addpost">
                        <div className="div-titulo-area">
                            <textarea
                                className="textarea"
                                name=""
                                required
                                placeholder="Título"
                                onChange={onTitleChange}
                            ></textarea>
                        </div>
                        <div className="div-browse">
                            <input
                                type="file"
                                id="añadir"
                                style={{ display: "none" }}
                                accept="image/*"
                                multiple
                                required
                                onChange={(event) => handlePhotosChange(event)}
                            />
                            <div className="imagenes-cargadas">
                                {photo1 && (
                                    <img
                                        src={photo1}
                                        alt="Imagen 1"
                                        className="add-post-img"
                                    />
                                )}
                                {photo2 && (
                                    <img
                                        src={photo2}
                                        alt="Imagen 2"
                                        className="add-post-img"
                                    />
                                )}
                                {photo3 && (
                                    <img
                                        src={photo3}
                                        alt="Imagen 3"
                                        className="add-post-img"
                                    />
                                )}
                                {!photo3 && (
                                    <label htmlFor="añadir">
                                        <img src={addImg} alt="Añadir imagen" />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="div-descripcion-area">
                            <textarea
                                className="textarea"
                                placeholder="Descripción"
                                rows="8"
                                required
                                onChange={onDescriptionChange}
                            ></textarea>
                        </div>
                        <button className="boton" type="submit">
                            Publicar
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
