import "../styles/Comment.css";
/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CommentMenu } from "./CommentMenu";
import { useCurrentUser } from "../functions/utils/use-current-user";
import { EditCommentModal } from "./EditCommentModal";
import { useState } from "react";

export function Comment({ comment }) {
    const [editModalDisplay, setEditModalDisplay] = useState(false);

    const user = useCurrentUser();

    dayjs.extend(relativeTime);
    const date = dayjs(comment.createdAt).fromNow();

    const blankProfilePicture = "/blankProfilePicture.jpg";

    return (
        <aside className="comment">
            <div className="commentUser">
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
                    <p>{comment.userName}</p>
                </div>
                <div className="div2">
                    {user.id == comment.userId && (
                        <CommentMenu
                            editModalDisplay={editModalDisplay}
                            setEditModalDisplay={setEditModalDisplay}
                        ></CommentMenu>
                    )}
                    <EditCommentModal
                        comment={comment}
                        editModalDisplay={editModalDisplay}
                        setEditModalDisplay={setEditModalDisplay}
                    />
                </div>
            </div>
            <p>{comment.comment}</p>
            <p className="commentDate">{date}</p>
        </aside>
    );
}
