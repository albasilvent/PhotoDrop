import "../styles/PostDetails.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Slider } from "./Slider";
import { PostMenu } from "./PostMenu";
import { CommentsModal } from "./CommentsModal";
import { useEffect, useState } from "react";
import { LikeButton } from "./LikeButton";
import { useCurrentUser } from "../functions/utils/use-current-user";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPostDetails } from "../functions/api/get-post-details";

export function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [menuDisplay, setMenuDisplay] = useState(false);

    const user = useCurrentUser();
    const [likeCount, setLikeCount] = useState("");
    const [commentsState, setCommentsState] = useState([]);
    const [commentsCount, setCommentsCount] = useState("");

    const blankProfile = "/blankProfilePicture.jpg";

    dayjs.extend(relativeTime);

    function deletePostDetails() {
        navigate(`/users/${post.userId}`);
    }

    function deleteCommentById(commentId) {
        const filteredComments = commentsState.filter(
            (comment) => comment.id !== commentId
        );
        setCommentsState(filteredComments);
        setCommentsCount(commentsCount - 1);
    }

    useEffect(() => {
        getPostDetails(id).then((post) => {
            setPost(post);
            setLikeCount(post.likes);
            setCommentsState(post.comments);
            setCommentsCount(post.comment_count);
        });
    }, [id]);

    function onClick() {
        if (!user) {
            navigate("/login");
        }
        setMenuDisplay(!menuDisplay);
    }

    return (
        <div className={"Page"}>
            {post && (
                <div className="postDetailsContainer">
                    <div className="pd-postUser">
                        <Link
                            to={`/users/${post?.userId}`}
                            style={{ textDecoration: "none" }}
                        >
                            <div className="pd-first">
                                {post.userProfilePicture ? (
                                    <img
                                        className="profilePicture"
                                        src={post.userProfilePicture}
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
                        </Link>
                        {user?.id == post.userId && (
                            <PostMenu
                                postId={post.postId}
                                deletePostById={deletePostDetails}
                            />
                        )}
                    </div>
                    <h2 className="pd-postTitle">{post.postTitle}</h2>
                    <Slider
                        id={post.postId}
                        photo1={post.postPhoto1}
                        photo2={post.postPhoto2}
                        photo3={post.postPhoto3}
                    />
                    <div className="pd-postSocials">
                        <div className="pd-likes">
                            <LikeButton
                                post={post}
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
                            <p className="pd-count">{commentsCount}</p>
                        </div>
                    </div>
                    <p className="pd-postDescription">{post.postDescription}</p>
                    <div className="pd-postComments">
                        {commentsCount == 0 && (
                            <p onClick={onClick}>Se el primero en comentar!</p>
                        )}
                        {commentsCount > 1 && (
                            <p onClick={onClick}>
                                Ver {commentsCount} comentarios...
                            </p>
                        )}
                        {commentsCount == 1 && (
                            <p onClick={onClick}>
                                Ver {commentsCount} comentario...
                            </p>
                        )}
                    </div>
                    <p className="pd-postDate">
                        Posted {dayjs(post.createdAt).fromNow()}
                    </p>
                    {post.comments && (
                        <CommentsModal
                            commentsState={commentsState}
                            setCommentsState={setCommentsState}
                            menuDisplay={menuDisplay}
                            setMenuDisplay={setMenuDisplay}
                            postId={post.postId}
                            deleteCommentById={deleteCommentById}
                            commentsCount={commentsCount}
                            setCommentsCount={setCommentsCount}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
