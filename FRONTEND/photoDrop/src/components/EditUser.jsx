/* eslint-disable react/prop-types */
import { FormContext } from "../contexts/form-context";
import { useState, useEffect } from "react";
import "../styles/EditUser.css";
import { useNavigate } from "react-router-dom";
import { sendEditUser } from "../functions/api/send-edit-user";
import { useCurrentUser } from "../functions/utils/use-current-user";

export function EditUser() {
    const currentUser = useCurrentUser();
    const blankImg = "/blankProfilePicture.jpg";

    useEffect(() => {
        if (currentUser) {
            {
                fetch(`http://localhost:5000/users/${currentUser.id}`)
                    .then((res) => res.json())
                    .then((result) => {
                        setUserId(result.data.id);
                        setNameValue(result.data.name);
                        setSurname1Value(result.data.surname1);
                        setSurname2Value(result.data.surname2);
                        setCountryValue(result.data.country);
                        setProfilePictureValue(result.data.profilePicture);
                    });
            }
        }
    }, [currentUser]);

    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [surname1Value, setSurname1Value] = useState("");
    const [surname2Value, setSurname2Value] = useState("");
    const [countryValue, setCountryValue] = useState("");
    const [profilePictureValue, setProfilePictureValue] = useState("");

    const [payload, setPayload] = useState({});

    const [formState, setFormState] = useState({ isSubmitting: false });

    function onNameChange(evt) {
        const value = evt.target.value;
        setNameValue(value);
        setPayload({ ...payload, name: value });
    }

    function onSurname1Change(evt) {
        const value = evt.target.value;
        setSurname1Value(value);
        setPayload({ ...payload, surname1: value });
    }

    function onSurname2Change(evt) {
        const value = evt.target.value;
        setSurname2Value(value);
        setPayload({ ...payload, surname2: value });
    }

    function onCountryChange(evt) {
        const value = evt.target.value;
        setCountryValue(value);
        setPayload({ ...payload, country: value });
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const newImage = URL.createObjectURL(file);
            console.log(newImage.slice(5));
            setProfilePictureValue(newImage);
            setPayload({ ...payload, profilePicture: newImage });
        }
    }

    async function onSubmit(evt) {
        evt.preventDefault();

        setFormState({
            isSubmitting: true,
        });

        try {
            const data = new FormData(evt.target);
            data.append("profilePicture", profilePictureValue);
            await sendEditUser(data);
            navigate(`/users/${userId}`);
        } catch (error) {
            setFormState({
                isSubmitting: false,
            });
        }
    }

    return (
        <main className="Page">
            <div className="edit-container">
                <div className="edit-cajetin">
                    <h2 className="editTitle">Edita tu usuario</h2>
                    <div className="editPhoto">
                        {profilePictureValue && (
                            <img
                                className="editProfilePicture"
                                src={profilePictureValue}
                            />
                        )}

                        {!profilePictureValue && (
                            <img
                                className="editProfilePicture"
                                src={blankImg}
                            />
                        )}

                        <label
                            className="material-symbols-rounded editButton"
                            htmlFor="fileInput"
                        >
                            edit
                        </label>

                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(event) => handleFileChange(event)}
                            accept="image/*"
                        />
                    </div>
                    <FormContext.Provider value={formState}>
                        <form onSubmit={onSubmit} className="edit-form">
                            <input
                                className="input"
                                name="name"
                                type="text"
                                value={nameValue}
                                placeholder="Nombre"
                                onChange={onNameChange}
                                required
                            ></input>
                            <input
                                className="input"
                                name="surname1"
                                type="text"
                                value={surname1Value}
                                placeholder="Primer apellido"
                                onChange={onSurname1Change}
                                required
                            ></input>
                            <input
                                className="input"
                                name="surname2"
                                type="text"
                                value={surname2Value ?? ""}
                                placeholder="Segundo apellido"
                                onChange={onSurname2Change}
                            ></input>
                            <input
                                className="input"
                                name="country"
                                type="text"
                                value={countryValue ?? ""}
                                placeholder="País"
                                onChange={onCountryChange}
                            ></input>
                            <button className="boton" type="submit">
                                Enviar
                            </button>
                        </form>
                    </FormContext.Provider>
                </div>
            </div>
        </main>
    );
}
