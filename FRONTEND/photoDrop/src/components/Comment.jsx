import "../styles/Comment.css";
/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CommentMenu } from "./CommentMenu";
import { useCurrentUser } from "../functions/utils/use-current-user";
import { EditCommentModal } from "./EditCommentModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteCommentModal } from "./DeleteCommentModal";

export function Comment({ comment, postId, deleteCommentById }) {
    const [editModalDisplay, setEditModalDisplay] = useState(false);
    const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);
    const [commentMsg, setCommentMsg]= useState(commment.comment);



    const user = useCurrentUser();

    dayjs.extend(relativeTime);
    const date = dayjs(comment.createdAt).fromNow();

    const blankProfilePicture = "/blankProfilePicture.jpg";

    return (
        <aside className="comment">
            <div className="commentUser">
                <Link to={`/users/${comment.userId}`}>
                    <div className="div1">
                        {comment.profilePicture && (
                            <img
                                className="profilePicture"
                                src={comment.profilePicture}
                            ></img>
                        )}
                        {!comment.profilePicture && (
                            <img
                                className="profilePicture"
                                src={blankProfilePicture}
                            ></img>
                        )}
                        <div className="div2">
                            <p>{comment.userName}</p>
                            <p>{comment.surname1}</p>
                        </div>
                    </div>
                </Link>
                <div className="div2">
                    {user?.id == comment.userId && (
                        <CommentMenu
                            editModalDisplay={editModalDisplay}
                            setEditModalDisplay={setEditModalDisplay}
                            deleteModalDisplay={deleteModalDisplay}
                            setDeleteModalDisplay={setDeleteModalDisplay}
                        ></CommentMenu>
                    )}
                    <EditCommentModal
                        comment={comment}
                        editModalDisplay={editModalDisplay}
                        setEditModalDisplay={setEditModalDisplay}
                        postId={postId}
                    />
                    <DeleteCommentModal
                        deleteModalDisplay={deleteModalDisplay}
                        setDeleteModalDisplay={setDeleteModalDisplay}
                        postId={postId}
                        commentId={comment.id}
                        deleteCommentById={deleteCommentById}
                    />
                </div>
            </div>
            <p>{comment.comment}</p>
            <p className="commentDate">{date}</p>
        </aside>
    );
}
