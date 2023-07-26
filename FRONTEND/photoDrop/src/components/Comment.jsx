import "../styles/Comment.css"
/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function Comment({ comment }) {
    dayjs.extend(relativeTime);
    const date = dayjs(comment.createdAt).fromNow();

    const blankProfilePicture = "/blankProfilePicture.jpg";

    return (
        <aside className="comment">
            <div className="commentUser">
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
            <p>{comment.comment}</p>
            <p className="commentDate">{date}</p>
        </aside>
    );
}
