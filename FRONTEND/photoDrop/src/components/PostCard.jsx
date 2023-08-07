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
import { useNavigate } from "react-router-dom";

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
    const [commentsState, setCommentsState]= useState(comments);
    const [commentsCount, setCommentsCount]= useState(comment_count);

    function deleteCommentById(commentId){
        const filteredComments= commentsState.filter((comment)=> comment.id !== commentId);
        setCommentsState(filteredComments);
    }

    dayjs.extend(relativeTime);
    const date = dayjs(createdAt).fromNow();

    const [menuDisplay, setMenuDisplay] = useState(false);
    const navigate= useNavigate();

    function onClick() {
        if (!user){
            navigate("/login");
        }
        setMenuDisplay(!menuDisplay);
    }

    const blankProfile = "/blankProfilePicture.jpg";
    const linkProfile= `/users/${userId}`

    return (
        <section>
            <div className="postUser">
                <Link to={linkProfile}>
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
                        <div className="nameSurname">
                            <p className="userName">{userName}</p>
                            <p className="userName">{surname1}</p>
                        </div>
                    </div>
                </Link>
                {user?.id == userId && (
                    <PostMenu postId={postId} deletePostById={deletePostById}/>
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
                    <p className="count">{commentsCount}</p>
                </div>
            </div>
            <p className="postDescription">{postDescription}</p>
            <div className="postComments">
                {commentsCount == 0 && (
                    <p onClick={onClick}>Se el primero en comentar!</p>
                )}
                {commentsCount > 1 && (
                    <p onClick={onClick}>Ver {commentsCount} comentarios...</p>
                )}
                {commentsCount == 1 && (
                    <p onClick={onClick}>Ver {commentsCount} comentario...</p>
                )}
            </div>
            <p className="postDate">Posted {date}</p>
            {comments && (
                <CommentsModal
                    commentsState={commentsState}
                    setCommentsState={setCommentsState}
                    menuDisplay={menuDisplay}
                    setMenuDisplay={setMenuDisplay}
                    postId={postId}
                    deleteCommentById={deleteCommentById} 
                    commentsCount={commentsCount}
                    setCommentsCount={setCommentsCount}
                />
            )}
        </section>
    );
}
