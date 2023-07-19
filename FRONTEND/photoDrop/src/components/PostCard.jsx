import "../styles/PostCard.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Slider } from "./Slider";

/* eslint-disable react/prop-types */
export function PostCard({ post }) {
    const {
        postTitle,
        postDescription,
        postPhoto1,
        postPhoto2,
        postPhoto3,
        like_count,
        comment_count,
        userName,
        userProfilePicture,
        createdAt,
    } = post;

    dayjs.extend(relativeTime)
    const date= dayjs(createdAt).fromNow();


    const blankProfile = "/blankProfilePicture.jpg";

    return (
        <section>
            <div className="postUser">
                {!userProfilePicture && (
                    <img className="profilePicture" src={blankProfile}></img>
                )}
                {userProfilePicture && (
                    <img
                        className="profilePicture"
                        src={userProfilePicture}
                    ></img>
                )}
                <p className="userName">{userName}</p>
            </div>
            <h2 className="postTitle">{postTitle}</h2>
            <Slider photo1={postPhoto1} photo2={postPhoto2} photo3={postPhoto3}/>
            <div className="postSocials">
                <div className="likes">
                    <p className="material-symbols-rounded">Favorite</p>
                    <p>{like_count}</p>
                </div>
                <div className="comments">
                    <p className="material-symbols-rounded">chat_bubble</p>
                    <p>{comment_count}</p>
                </div>
            </div>
            <p className="postDescription">{postDescription}</p>
            <div className="postComments">
                {comment_count == 0 && <p>Se el primero en comentar!</p>}
                {comment_count > 0 && (
                    <p>Ver los {comment_count} comentarios...</p>
                )}
            </div>
            <p className="postDate">Posted {date}</p>
        </section>
    );
}
