/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDetails } from "../functions/api/get-post-details";
import { Link } from "react-router-dom";
import { FormContext } from "../contexts/form-context";
import { sendEditPost } from "../functions/api/send-edit-post";
import "../styles/EditPost.css";

export function EditPost() {
    const addImg = "/addimg.png";

    const navigate = useNavigate();
    const { id } = useParams();
    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [photos, setPhotos] = useState([]);
    const [payload, setPayload] = useState({});
    const [formState, setFormState] = useState({ isSubmitting: false });
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        getPostDetails(id).then((post) => {
            setTitleValue(post.postTitle);
            setDescriptionValue(post.postDescription);
            setPhotos([
                ...photos,
                post.postPhoto1,
                post.postPhoto2,
                post.postPhoto3,
            ]);
        });
    }, [id]);

    function onDeleteClick() {
        const newArray = [...photos];
        newArray.pop();
        setPhotos(newArray);
    }

    function onTitleChange(event) {
        const value = event.target.value;
        setTitleValue(value);
        setPayload({ ...payload, title: value });
    }

    function onDescriptionChange(event) {
        const value = event.target.value;
        setDescriptionValue(value);
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
                await sendEditPost(data);
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
        <div className={"Page" + "overflowHidden"}>
            <div className="editPostContainer">
                <div className="encabezado">
                    <Link to={`/posts/${id}`}>
                        <p className="material-symbols-rounded">close</p>
                    </Link>
                    <h2>Edita el post</h2>
                </div>
                <FormContext.Provider value={formState}>
                    <form className="form-editpost" onSubmit={onSubmit}>
                        <textarea
                            value={titleValue}
                            name="title"
                            onChange={onTitleChange}
                            className="editpost-textarea"
                            required
                            placeholder="Título"
                        ></textarea>
                        <input
                            name="fotos"
                            type="file"
                            id="añadir"
                            onChange={handlePhotosChange}
                            style={{ display: "none" }}
                            accept="image/*"
                        />

                        <div className="edit-imagenes-cargadas">
                            {photos.length > 0 &&
                                photos.map((photo) => {
                                    return (
                                        <img
                                            key={Math.random()}
                                            src={photo}
                                            alt="Imagen"
                                            className="edit-post-img"
                                        />
                                    );
                                })}

                            {!photos[2] && (
                                <label htmlFor="añadir">
                                    <img src={addImg} alt="Añadir imagen" />
                                </label>
                            )}
                            {photos.length > 0 && (
                                <p
                                    className="material-symbols-rounded addpostBorrar"
                                    onClick={onDeleteClick}
                                >
                                    delete
                                </p>
                            )}
                        </div>
                        <textarea
                            value={descriptionValue}
                            onChange={onDescriptionChange}
                            name="description"
                            className="addpost-textarea"
                            placeholder="Descripción"
                            rows="6"
                            required
                        ></textarea>

                        <button className="boton" type="submit">
                            Editar
                        </button>
                    </form>
                    {errorMsg && (
                        <p className="errormsg-editpost">{errorMsg}</p>
                    )}
                </FormContext.Provider>
            </div>
        </div>
    );
}
