import "../styles/PostCard.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Slider } from "./Slider";
import { PostMenu } from "./PostMenu";
import { CommentsModal } from "./CommentsModal";
import { useEffect, useState } from "react";
import { LikeButton } from "./LikeButton";
import { useCurrentUser } from "../functions/utils/use-current-user";
import { useParams } from "react-router-dom";

export function PostDetails() {

    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [likeCount, setLikeCount] = useState(post.like_count);
    const [menuDisplay, setMenuDisplay] = useState(false);

    const user = useCurrentUser();
    const blankProfile = "/blankProfilePicture.jpg";

    dayjs.extend(relativeTime);
    const date = dayjs(post.createdAt).fromNow();

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/posts/${id}`)
                .then((res) => res.json())
                .then((result) => {
                    setPost(result.data);
                });
        }
    }, [user, id]);

    function onClick() {
        setMenuDisplay(!menuDisplay);
    }

    return (
        <main className="Page">
            <section>
                <div className="postUser">
                    <div className="first">
                        {post.profilePicture && (
                            <img
                                className="profilePicture"
                                src={blankProfile}
                            ></img>
                        )}
                        {post.profilePicture && (
                            <img
                                className="profilePicture"
                                src={post.ProfilePicture}
                            ></img>
                        )}
                        <p className="userName">{post.userName}</p>
                    </div>
                    {user?.id == post.userId && (
                        <PostMenu
                            postId={post.postId}
                            deletePostById={post.deletePostById}
                        />
                    )}
                </div>
                <h2 className="postTitle">{post.postTitle}</h2>
                <Slider
                    photo1={post.postPhoto1}
                    photo2={post.postPhoto2}
                    photo3={post.postPhoto3}
                />
                <div className="postSocials">
                    <div className="likes">
                        <LikeButton
                            postId={post.postId}
                            likeCount={likeCount}
                            setLikeCount={setLikeCount}
                        />
                        <p className="count">{likeCount}</p>
                    </div>
                    <div className="comments">
                        <p
                            className="material-symbols-rounded"
                            onClick={onClick}
                        >
                            chat_bubble
                        </p>
                        <p className="count">{post.comment_count}</p>
                    </div>
                </div>
                <p className="postDescription">{post.postDescription}</p>
                <div className="postComments">
                    {post.comment_count == 0 && (
                        <p onClick={onClick}>Se el primero en comentar!</p>
                    )}
                    {post.comment_count > 1 && (
                        <p onClick={onClick}>
                            Ver {post.comment_count} comentarios...
                        </p>
                    )}
                    {post.comment_count == 1 && (
                        <p onClick={onClick}>
                            Ver {post.comment_count} comentario...
                        </p>
                    )}
                </div>
                <p className="postDate">Posted {date}</p>
                {post.comments && (
                    <CommentsModal
                        comments={post.comments}
                        menuDisplay={menuDisplay}
                        setMenuDisplay={setMenuDisplay}
                        postId={post.postId}
                    />
                )}
            </section>
        </main>
    );
}
