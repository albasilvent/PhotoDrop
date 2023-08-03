import "../styles/PostCard.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Slider } from "./Slider";
import { PostMenu } from "./PostMenu";
import { CommentsModal } from "./CommentsModal";
import { useState } from "react";
import { LikeButton } from "./LikeButton";
import { useCurrentUser } from "../functions/utils/use-current-user";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export function PostCard({ post, deletePostById }) {
    const {
        postId,
        postTitle,
        postDescription,
        postPhoto1,
        postPhoto2,
        postPhoto3,
        like_count,
        comment_count,
        userName,
        userId,
        surname1,
        userProfilePicture,
        createdAt,
        comments,
    } = post;

    const user = useCurrentUser();

    const [likeCount, setLikeCount] = useState(like_count);

    dayjs.extend(relativeTime);
    const date = dayjs(createdAt).fromNow();

    const [menuDisplay, setMenuDisplay] = useState(false);
    function onClick() {
        setMenuDisplay(!menuDisplay);
    }

    const blankProfile = "/blankProfilePicture.jpg";

    return (
        <section>
            <div className="postUser">
                <Link to={`/users/${userId}`}>
                    <div className="first">
                        {!userProfilePicture && (
                            <img
                                className="profilePicture"
                                src={blankProfile}
                            ></img>
                        )}
                        {userProfilePicture && (
                            <img
                                className="profilePicture"
                                src={userProfilePicture}
                            ></img>
                        )}
                        <div className= "nameSurname">
                            <p className="userName">{userName}</p>
                            <p className="userName">{surname1}</p>
                        </div>
                    </div>
                </Link>
                {user.id == userId && (
                    <PostMenu postId={postId} deletePostById={deletePostById} />
                )}
            </div>
            <h2 className="postTitle">{postTitle}</h2>
            <Slider
                photo1={postPhoto1}
                photo2={postPhoto2}
                photo3={postPhoto3}
            />
            <div className="postSocials">
                <div className="likes">
                    <LikeButton
                        postId={postId}
                        likeCount={likeCount}
                        setLikeCount={setLikeCount}
                    />
                    <p className="count">{likeCount}</p>
                </div>
                <div className="comments">
                    <p className="material-symbols-rounded" onClick={onClick}>
                        chat_bubble
                    </p>
                    <p className="count">{comment_count}</p>
                </div>
            </div>
            <p className="postDescription">{postDescription}</p>
            <div className="postComments">
                {comment_count == 0 && (
                    <p onClick={onClick}>Se el primero en comentar!</p>
                )}
                {comment_count > 1 && (
                    <p onClick={onClick}>Ver {comment_count} comentarios...</p>
                )}
                {comment_count == 1 && (
                    <p onClick={onClick}>Ver {comment_count} comentario...</p>
                )}
            </div>
            <p className="postDate">Posted {date}</p>
            {comments && (
                <CommentsModal
                    comments={comments}
                    menuDisplay={menuDisplay}
                    setMenuDisplay={setMenuDisplay}
                    postId={postId}
                />
            )}
        </section>
    );
}
