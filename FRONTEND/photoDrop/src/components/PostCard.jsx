import "../styles/PostCard.css"

/* eslint-disable react/prop-types */
import { Comments } from "./Comments";

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
        comments,
        createdAt
    } = post;

    const blankProfile= "/blankProfilePicture.jpg"

    return (
        <section>
            {!userProfilePicture && <img className="profilePicture gridProfilePicture" src={blankProfile}></img>}
            {userProfilePicture && <img className="profilePicture" src={userProfilePicture}></img>}
            <p className="userName ">{userName}</p>
            <h2>{postTitle}</h2>
            <div>
                <img className="postImg" src={postPhoto1}></img>
                <img className="postImg" src={postPhoto2}></img>
                <img className="postImg" src={postPhoto3}></img>
            </div>
            <p>Likes:{like_count}</p>
            <p>Comments: {comment_count}</p>
            <p>{postDescription}</p>
            {comments &&
                comments.map((comment, i) => {
                    return <Comments key= {i} comment={comment}/>;
                })}
            <p>{createdAt}</p>
        </section>
    );
}
