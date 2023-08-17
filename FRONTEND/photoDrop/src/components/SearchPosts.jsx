import { PostCard } from "./PostCard";
import { useState, useEffect } from "react";
import "../styles/AllPosts.css";

// eslint-disable-next-line react/prop-types
export function SearchPosts({ search }) {
    const [posts, setPosts] = useState([]);

    function deletePostById(postId) {
        const filteredPosts = posts.filter((post) => post.postId !== postId);
        setPosts(filteredPosts);
    }

    useEffect(() => {
        fetch(`http://localhost:5000/posts/search?search=${search}`)
            .then((res) => res.json())
            .then((result) => {
                const sortedArray = result.data.sort(
                    (a, b) => b.like_count - a.like_count
                );
                setPosts(sortedArray);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <main>
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

            {posts.length == 0 && (
                <p
                    className="noPosts"
                    style={{ marginBottom: "650px", textAlign: "center" }}
                >
                    No hay posts que coincidan con la búsqueda
                </p>
            )}
        </main>
    );
}
