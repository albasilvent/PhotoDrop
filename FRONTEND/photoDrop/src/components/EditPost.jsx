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
    const [photo1, setPhoto1] = useState(null);
    const [photo2, setPhoto2] = useState(null);
    const [photo3, setPhoto3] = useState(null);
    const [payload, setPayload] = useState({});
    const [formState, setFormState] = useState({ isSubmitting: false });
    const [errorMsg, setErrorMsg] = useState("");

    const arrayPhotos = [photo1, photo2, photo3];

    useEffect(() => {
        getPostDetails(id).then((post) => {
            setTitleValue(post.postTitle);
            setDescriptionValue(post.postDescription);
            setPhoto1(post.postPhoto1);
            if (post.postPhoto2) {
                setPhoto2(post.postPhoto2);
            }
            if (post.postPhoto3) {
                setPhoto3(post.postPhoto3);
            }
            setPayload({
                title: post.postTitle,
                description: post.postDescription,
                photo1: post.postPhoto1,
                photo2: post.postPhoto2,
                photo3: post.postPhoto3,
            });
        });
    }, [id]);

    function onDeleteClick() {
        if (photo3) {
            setPhoto3("");
            setPayload({ ...payload, photo3: null });
        } else if (photo2) {
            setPhoto2("");
            setPayload({ ...payload, photo2: null });
        } else {
            setPhoto1("");
            setPayload({ ...payload, photo1: null });
        }
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
        if (!photo1) {
            const file = event.target.files[0];
            const newPhoto = URL.createObjectURL(file);
            setPhoto1(newPhoto);
            setPayload({ ...payload, photo1: newPhoto });
            event.target.value = null;
        }
        if (photo1 && !photo2) {
            const file = event.target.files[0];
            const newPhoto = URL.createObjectURL(file);
            setPhoto2(newPhoto);
            setPayload({ ...payload, photo2: newPhoto });
            event.target.value = null;
        }
        if (photo1 && photo2 && !photo3) {
            const file = event.target.files[0];
            const newPhoto = URL.createObjectURL(file);
            setPhoto3(newPhoto);
            setPayload({ ...payload, photo3: newPhoto });
            event.target.value = null;
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
            if (photo2) {
                data.append("photo2", payload.photo2);
            }
            if (photo3) {
                data.append("photo3", payload.photo3);
            }
            if (photo1) {
                await sendEditPost(data, id);
                navigate(`/posts/${id}`);
            } else {
                setErrorMsg("El post debe tener 1 foto");
            }
        } catch (error) {
            console.log(error);
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
                        <p className="material-symbols-rounded editPostClose">
                            close
                        </p>
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
                            {photo1 &&
                                arrayPhotos.map((photo) => {
                                    return (
                                        <img
                                            key={Math.random()}
                                            src={photo}
                                            className="edit-post-img"
                                        ></img>
                                    );
                                })}

                            {!photo3 && (
                                <label htmlFor="añadir">
                                    <img src={addImg} alt="Añadir imagen" />
                                </label>
                            )}
                            {photo1 && (
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
                            className="editpost-textarea"
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
