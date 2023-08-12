import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import "../styles/AllPosts.css";
import { useCurrentUser } from "../functions/utils/use-current-user";
import { getAllPosts } from "../functions/api/get-all-posts";

export function AllPosts() {
    const currentUser = useCurrentUser();
    const [posts, setPosts] = useState([]);

    function deletePostById(postId) {
        const filteredPosts = posts.filter((post) => post.postId !== postId);
        setPosts(filteredPosts);
    }

    useEffect(() => {
        getAllPosts().then((posts) => setPosts(posts));
    }, [currentUser]);

    return (
        <main className="Page">
            {posts &&
                posts.map((post) => {
                    return (
                        <PostCard
                            key={post.postId}
                            post={post}
                            deletePostById={deletePostById}
                        ></PostCard>
                    );
                })}
            {posts.length == 0 && <p className="cargando">Cargando...</p>}
        </main>
    );
}
