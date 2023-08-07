/* eslint-disable react/prop-types */
import { FormContext } from "../contexts/form-context";
import { Input } from "./Input";
import { useState } from "react";
import "../styles/EditUser.css";
import { useNavigate } from "react-router-dom";
import { sendEditUser } from "../functions/api/send-edit-user";

export function EditUser({ currentUser }) {
    const { id, name, surname1, surname2, country, profilePicture } =
        currentUser;
    const blankProfile = "/blankProfilePicture.jpg";

    const navigate = useNavigate();

    const [nameValue, setNameValue] = useState(name);
    const [surname1Value, setSurname1Value] = useState(surname1);
    const [surname2Value, setSurname2Value] = useState(surname2);
    const [countryValue, setCountryValue] = useState(country);
    const [profilePictureValue, setProfilePictureValue] =
        useState(profilePicture);

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
        setProfilePictureValue(URL.createObjectURL(file));
        setPayload({ ...payload, profilePicture: file });
    }

    async function onSubmit(evt) {
        evt.preventDefault();

        setFormState({
            isSubmitting: true,
        });

        try {
            console.log(payload);
            await sendEditUser(payload);
            navigate(`/users/${id}`);
        } catch (error) {
            console.log(error);
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
                                src={blankProfile}
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
                            <Input
                                name="name"
                                type="text"
                                value={nameValue}
                                placeholder="Nombre"
                                onChange={onNameChange}
                                required
                            ></Input>
                            <Input
                                name="surname1"
                                type="text"
                                value={surname1Value}
                                placeholder="Primer apellido"
                                onChange={onSurname1Change}
                                required
                            ></Input>
                            <Input
                                name="surname2"
                                type="text"
                                value={surname2Value}
                                placeholder="Segundo apellido"
                                onChange={onSurname2Change}
                            ></Input>
                            <Input
                                name="country"
                                type="text"
                                value={countryValue}
                                placeholder="País"
                                onChange={onCountryChange}
                            ></Input>
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
