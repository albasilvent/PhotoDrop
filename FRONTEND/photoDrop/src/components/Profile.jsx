import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {ProfileMenu} from "./ProfileMenu.jsx"
import "../styles/Profile.css";

export function Profile() {
    const { id } = useParams();
    const [userData, setUserData] = useState({});
    const [postData, setPostData] = useState([]);

    const blankImg = "/blankProfilePicture.jpg";

    useEffect(() => {
        fetch(`http://localhost:5000/users/${id}`)
            .then((res) => res.json())
            .then((result) => {
                setUserData(result.data);
                setPostData(result.data.posts);
            });
    }, [id, userData]);

    return (
        <main className="profileMain">
            <div className="profilePageUser">
                <div className="profileUserData">
                    {userData.profilePicture && (
                        <img
                            className="profilePageImg"
                            src={userData.profilePicture}
                        ></img>
                    )}
                    {!userData.profilePicture && (
                        <img className="profilePageImg" src={blankImg}></img>
                    )}
                    <h2 className="profileUserName">{userData.name}</h2>
                </div>
                <ProfileMenu/>
            </div>
            <div className="profilePagePosts">
                {postData.map((post, i) => {
                    return (
                        // eslint-disable-next-line react/jsx-key
                        <Link to={`posts/${post.id}`}>
                            <img key={i} src={post.photo1}></img>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}
