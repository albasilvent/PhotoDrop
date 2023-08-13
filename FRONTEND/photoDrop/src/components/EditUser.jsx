/* eslint-disable react/prop-types */
import { FormContext } from "../contexts/form-context";
import { useState, useEffect } from "react";
import "../styles/EditUser.css";
import { useNavigate } from "react-router-dom";
import { sendEditUser } from "../functions/api/send-edit-user";
import { useCurrentUser } from "../functions/utils/use-current-user";
import countryData from "../functions/utils/country-data.json";

const countryNames = countryData
    .map((c) => ({
        value: c.name.nativeName.spa?.common ?? c.name.common,
    }))
    .sort((a, b) => {
        return a.value.localeCompare(b.value);
    });

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
    const [payload, setPayload] = useState({
        name: nameValue,
        surname1: surname1Value,
        surname2: surname2Value,
        country: countryValue,
        profilePicture: profilePictureValue,
    });

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

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const newImage = URL.createObjectURL(file);
            setProfilePictureValue(newImage);
            setPayload({ ...payload, profilePicture: file });
        }
    }

    
    async function onSubmit(evt) {
        evt.preventDefault();
        
        setFormState({
            isSubmitting: true,
        });
        
        try {
            const data = new FormData();
            data.append("name", payload.name);
            data.append("surname1", payload.surname1);
            data.append("surname2", payload.surname2);
            data.append("country", payload.country);
            data.append("profilePicture", payload.profilePicture);
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
                    </div>
                    <FormContext.Provider value={formState}>
                        <form onSubmit={onSubmit} className="edit-form">
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={(event) => handleFileChange(event)}
                                accept="image/*"
                            />
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
                            <select
                                className="input"
                                onChange={(event) => {
                                    setPayload({
                                        ...payload,
                                        country: event.target.value,
                                    });
                                }}
                            >
                                <option selected="selected" disabled>
                                    {countryValue}
                                </option>
                                {countryNames.map((option, i) => {
                                    return (
                                        <option key={i} value={option.value}>
                                            {option.label ?? option.value}
                                        </option>
                                    );
                                })}
                            </select>
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
