/* eslint-disable react/prop-types */
import { useState } from "react";
import { sendLike } from "../functions/api/send-like";
import "../styles/LikeButton.css"

export function LikeButton({ postId, likeCount, setLikeCount }) {
    const [isLiked, setIsLiked] = useState(false);

    async function onLikeClick() {
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
        <p className={`material-symbols-rounded ${isLiked ? 'liked' : ''}`} onClick={onLikeClick}>Favorite
    </p>
    );
}
