import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProfileMenu } from "./ProfileMenu.jsx";
import "../styles/Profile.css";
import { useCurrentUser } from "../functions/utils/use-current-user.js";

export function Profile() {
    const { id } = useParams();
    const currentUser = useCurrentUser();

    const [userData, setUserData] = useState({});
    const [postData, setPostData] = useState([]);

    const blankImg = "/blankProfilePicture.jpg";

    useEffect(() => {
        {
            fetch(`http://localhost:5000/users/${id}`)
                .then((res) => res.json())
                .then((result) => {
                    setUserData(result.data);
                    setPostData(result.data.posts);
                });
        }
    }, [id, currentUser]);

    return (
        <main className="profilePage">
            <div className="profilePageUser">
                <div className="profileUserData">
                    {userData?.profilePicture && (
                        <img
                            className="profilePageImg"
                            src={userData?.profilePicture}
                        ></img>
                    )}
                    {!userData?.profilePicture && (
                        <img className="profilePageImg" src={blankImg}></img>
                    )}
                    <h2 className="profileUserName">
                        {userData?.name} {userData?.surname1}
                    </h2>
                </div>
                {currentUser?.id == userData?.id && <ProfileMenu />}
            </div>
            <div className="postProfileContainer">
                <p className="postProfileTitle">Publicaciones</p>
                <div className="p-publicaciones">
                    {postData?.length == 0 && (
                        <p className="p1"> Aún no hay publicaciones</p>
                    )}
                    {postData?.length == 0 &&
                        currentUser?.id == userData?.id && (
                            <Link to="/add-post">
                                <p className="p2">Haz tu primera publicación</p>
                            </Link>
                        )}
                </div>
                <div className="profilePagePosts">
                    {postData &&
                        postData.map((post, i) => {
                            return (
                                <Link to={`/posts/${post.id}`} key={i}>
                                    <img src={post.photo1}></img>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </main>
    );
}
