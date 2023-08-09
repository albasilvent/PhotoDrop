/* eslint-disable react/prop-types */
import { sendLike } from "../functions/api/send-like";
import { useCurrentUser } from "../functions/utils/use-current-user";
import { useNavigate } from "react-router-dom";

export function LikeButton({ postId, likeCount, setLikeCount, isLiked, setIsLiked }) {
    
    const currentUser = useCurrentUser();
    const navigate = useNavigate();

    async function onLikeClick() {
        if (!currentUser) {
            navigate("/login");
        }
        if (!isLiked) {
            await sendLike(postId, currentUser);
            setLikeCount(likeCount + 1);
            setIsLiked(!isLiked);
        } else {
            await sendLike(postId, currentUser);
            setLikeCount(likeCount - 1);
            setIsLiked(!isLiked);
        }

        
    }

    return (
        <p
            className={`material-symbols-rounded ${isLiked ? "liked" : ""}`}
            onClick={onLikeClick}
        >
            Favorite
        </p>
    );
}
