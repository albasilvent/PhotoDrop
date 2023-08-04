import "../styles/PostDetails.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Slider } from "./Slider";
import { PostMenu } from "./PostMenu";
import { CommentsModal } from "./CommentsModal";
import { useEffect, useState } from "react";
import { LikeButton } from "./LikeButton";
import { useCurrentUser } from "../functions/utils/use-current-user";
import { useParams, useNavigate } from "react-router-dom";

export function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [commentsState, setCommentsState] = useState([]);
    const [likeCount, setLikeCount] = useState(null);
    const [menuDisplay, setMenuDisplay] = useState(false);

    const user = useCurrentUser();

    const blankProfile = "/blankProfilePicture.jpg";

    dayjs.extend(relativeTime);

    function deletePostDetails() {
        navigate(`/users/${post.userId}`);
    }

    function deleteCommentById(commentId){
        const filteredComments= commentsState.filter((comment)=> comment.id !== commentId);
        setCommentsState(filteredComments);
    }

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/posts/${id}`)
                .then((res) => res.json())
                .then((result) => {
                    setPost(result.data);
                    setLikeCount(result.data.likes);
                    setCommentsState(result.data.comments)
                });
        }
    }, [user, id]);

    function onClick() {
        setMenuDisplay(!menuDisplay);
    }

    return (
        <main className="Page">
            {post && (
                <div className="postDetailsContainer">
                    <div className="pd-postUser">
                        <div className="pd-first">
                            {post.profilePicture ? (
                                <img
                                    className="profilePicture"
                                    src={post.profilePicture}
                                />
                            ) : (
                                <img
                                    className="profilePicture"
                                    src={blankProfile}
                                />
                            )}
                            <p className="pd-userName">
                                {post.userName} {post.surname1}
                            </p>
                        </div>
                        {user?.id == post.userId && (
                            <PostMenu
                                postId={post.id}
                                deletePostById={deletePostDetails}
                            />
                        )}
                    </div>
                    <h2 className="pd-postTitle">{post.title}</h2>
                    <Slider
                        photo1={post.photo1}
                        photo2={post.photo2}
                        photo3={post.photo3}
                    />
                    <div className="pd-postSocials">
                        <div className="pd-likes">
                            <LikeButton
                                postId={id}
                                likeCount={likeCount}
                                setLikeCount={setLikeCount}
                            />
                            <p className="pd-count">{likeCount}</p>
                        </div>
                        <div className="pd-comments">
                            <p
                                className="material-symbols-rounded"
                                onClick={onClick}
                            >
                                chat_bubble
                            </p>
                            <p className="pd-count">{post.comments.length}</p>
                        </div>
                    </div>
                    <p className="pd-postDescription">{post.description}</p>
                    <div className="pd-postComments">
                        {post.comments.length == 0 && (
                            <p onClick={onClick}>Se el primero en comentar!</p>
                        )}
                        {post.comments.length > 1 && (
                            <p onClick={onClick}>
                                Ver {post.comments.length} comentarios...
                            </p>
                        )}
                        {post.comments.length == 1 && (
                            <p onClick={onClick}>
                                Ver {post.comments.length} comentario...
                            </p>
                        )}
                    </div>
                    <p className="pd-postDate">
                        Posted {dayjs(post.createdAt).fromNow()}
                    </p>
                    {post.comments && (
                        <CommentsModal
                            commentsState={commentsState}
                            setcommentsState={setCommentsState}
                            menuDisplay={menuDisplay}
                            setMenuDisplay={setMenuDisplay}
                            postId={post.id}
                            deleteCommentById={deleteCommentById} 
                        />
                    )}
                </div>
            )}
        </main>
    );
}
