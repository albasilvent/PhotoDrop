import { useState } from "react";
import "../styles/Addpost.css";
import { FormContext } from "../contexts/form-context";
import { sendAddPost } from "../functions/api/send-add-post";
import { useNavigate } from "react-router-dom";

export function AddPost() {
    const addImg = "/addimg.png";
    const navigate = useNavigate();

    const [payload, setPayload] = useState({});
    const [photos, setPhotos] = useState([]);
    const [formState, setFormState] = useState({ isSubmitting: false });
    const [errorMsg, setErrorMsg] = useState("");

    function onDeleteClick() {
        const newArray = [...photos];
        newArray.pop();
        setPhotos(newArray);
    }

    function onTitleChange(event) {
        const value = event.target.value;
        setPayload({ ...payload, title: value });
    }

    function onDescriptionChange(event) {
        const value = event.target.value;
        setPayload({ ...payload, description: value });
    }

    function handlePhotosChange(event) {
        if (photos.length == 0) {
            const file = event.target.files[0];
            if (file) {
                const newPhoto = URL.createObjectURL(file);
                setPhotos([...photos, newPhoto]);
                setPayload({ ...payload, photo1: file });
                event.target.value = null;
            }
        }
        if (photos.length == 1) {
            const file = event.target.files[0];
            if (file) {
                const newPhoto = URL.createObjectURL(file);
                setPhotos([...photos, newPhoto]);
                setPayload({ ...payload, photo2: file });
                event.target.value = null;
            }
        }
        if (photos.length == 2) {
            const file = event.target.files[0];
            if (file) {
                const newPhoto = URL.createObjectURL(file);
                setPhotos([...photos, newPhoto]);
                setPayload({ ...payload, photo3: file });
                event.target.value = null;
            }
        }
    }

    async function onSubmit(evt) {
        evt.preventDefault();

        setFormState({
            isSubmitting: true,
        });

        try {
            const data = new FormData();
            data.append("title", payload.title);
            data.append("description", payload.description);
            data.append("photo1", payload.photo1);
            if (photos[1]) {
                data.append("photo2", payload.photo2);
            }
            if (photos[2]) {
                data.append("photo3", payload.photo3);
            }

            if (photos.length > 0) {
                await sendAddPost(data);
                navigate("/");
            } else {
                setErrorMsg("El post debe tener 1 foto");
            }
        } catch (error) {
            setFormState({
                isSubmitting: false,
            });
        }
    }

    return (
        <main className="Page">
            <div className="container-addpost">
                <div className="cajetin-addpost">
                    <h2 className="titulo-addpost">Añade una publicación</h2>
                    <FormContext.Provider value={formState}>
                        <form className="form-addpost" onSubmit={onSubmit}>
                            <textarea
                                name="title"
                                className="addpost-textarea"
                                required
                                placeholder="Título"
                                onChange={onTitleChange}
                            ></textarea>
                            <input
                                name="fotos"
                                type="file"
                                id="añadir"
                                style={{ display: "none" }}
                                accept="image/png, image/jpg, image/jpeg"
                                onChange={(event) => handlePhotosChange(event)}
                            />

                            <div className="imagenes-cargadas">
                                {photos &&
                                    photos.map((photo) => {
                                        return (
                                            <img
                                                key={Math.random()}
                                                src={photo}
                                                alt="Imagen"
                                                className="add-post-img"
                                            />
                                        );
                                    })}

                                <div className="iconos-addPost">
                                    {!photos[2] && (
                                        <label htmlFor="añadir">
                                            <img
                                                src={addImg}
                                                alt="Añadir imagen"
                                            />
                                        </label>
                                    )}
                                    {photos.length > 0 && (
                                        <p
                                            onClick={onDeleteClick}
                                            className="material-symbols-rounded addpostBorrar"
                                        >
                                            delete
                                        </p>
                                    )}
                                </div>
                            </div>
                            <textarea
                                name="description"
                                className="addpost-textarea"
                                placeholder="Descripción"
                                rows="6"
                                required
                                onChange={onDescriptionChange}
                            ></textarea>

                            <button className="boton" type="submit">
                                Publicar
                            </button>
                        </form>
                    </FormContext.Provider>
                    {errorMsg && <p className="errormsg-addpost">{errorMsg}</p>}
                </div>
            </div>
        </main>
    );
}
