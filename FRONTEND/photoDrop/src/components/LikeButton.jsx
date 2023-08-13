/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { sendLike } from "../functions/api/send-like";
import { useCurrentUser } from "../functions/utils/use-current-user";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/LikeButton.css"

export function LikeButton({ post, postId, likeCount, setLikeCount }) {
    const currentUser = useCurrentUser();
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(post.alreadyLiked);

    useEffect(() => {
        setIsLiked(post.alreadyLiked);
        setLikeCount(likeCount);
    }, [post]);

    async function onLikeClick() {
        if (!currentUser) {
            navigate("/login");
            return;
        }

        await sendLike(postId);

        if (isLiked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
    }

    let classesToAdd = "";
    if (isLiked) {
        classesToAdd = "liked";
    }

    return (
        <p
            className={"material-symbols-rounded " + classesToAdd}
            onClick={onLikeClick}
        >
            Favorite
        </p>
    );
}
