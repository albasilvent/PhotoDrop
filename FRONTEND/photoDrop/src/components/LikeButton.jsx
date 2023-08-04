/* eslint-disable react/prop-types */
import { useState } from "react";
import { sendLike } from "../functions/api/send-like";
import "../styles/LikeButton.css";
import { useCurrentUser } from "../functions/utils/use-current-user";
import { useNavigate } from "react-router-dom";

export function LikeButton({ postId, likeCount, setLikeCount }) {
    const [isLiked, setIsLiked] = useState(false);
    const currentUser = useCurrentUser();
    const navigate = useNavigate();

    async function onLikeClick() {
        if (!currentUser) {
            navigate("/login");
        }
        if (!isLiked) {
            await sendLike(postId);
            setLikeCount(likeCount + 1);
        } else {
            await sendLike(postId);
            setLikeCount(likeCount - 1);
        }

        setIsLiked(!isLiked);
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
