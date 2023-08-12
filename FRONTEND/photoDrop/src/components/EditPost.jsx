import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostDetails } from "../functions/api/get-post-details";
import { Slider } from "./Slider";
import "../styles/EditPost.css";
import { Link } from "react-router-dom";

export function EditPost() {
    const { id } = useParams();
    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [photo1, setPhoto1] = useState("");
    const [photo2, setPhoto2] = useState("");
    const [photo3, setPhoto3] = useState("");

    useEffect(() => {
        getPostDetails(id).then((post) => {
            setTitleValue(post.postTitle);
            setDescriptionValue(post.postDescription);
            setPhoto1(post.postPhoto1);
            setPhoto2(post.postPhoto2);
            setPhoto3(post.postPhoto3);
        });
    }, [id]);

    function handleTitleChange(event) {
        setTitleValue(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescriptionValue(event.target.value);
    }

    return (
        <div className={"Page" + "overflowHidden"}>
            <div className="editPostContainer">
                <Link to={`/posts/${id}`}>
                    <p className="material-symbols-rounded">close</p>
                </Link>
                <form>
                    <div className="editPostTitle">
                        <textarea
                            name="title"
                            type="text"
                            placeholder=""
                            onChange={handleTitleChange}
                            value={titleValue}
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="editPhotos">
                        <Slider
                            photo1={photo1}
                            photo2={photo2}
                            photo3={photo3}
                        />

                        <div className="photosIcons">
                            <p className="material-symbols-rounded">Delete</p>
                            <label
                                className="material-symbols-rounded"
                                htmlFor="file"
                            >
                                add
                            </label>
                        </div>
                    </div>

                    <input
                        style={{ display: "none" }}
                        name="photos"
                        type="file"
                        id="file"
                        placeholder=""
                        onChange=""
                        value=""
                        required
                    ></input>

                    <textarea
                        name="title"
                        type="text"
                        placeholder=""
                        onChange={handleDescriptionChange}
                        value={descriptionValue}
                        rows="6"
                    ></textarea>
                    <div className="editPostButtons">
                        <button type="submit" className="boton"> Aceptar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
