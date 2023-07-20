import { PostCard } from "./PostCard";
import { useState, useEffect } from "react";
import "../styles/AllPosts.css";

export function SearchPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/posts")
            .then((res) => res.json())
            .then((result) => {
                const array= result.data;
                const sortedArray= array.sort((a, b) => b.like_count - a.like_count)
                // let sortedPosts= result.data.map()
                setPosts(sortedArray);
            });
    }, []);

    return (
        <main>
            {posts &&
                posts.map((post, i) => {
                    return <PostCard key={i} post={post}></PostCard>;
                })}
            {posts.length == 0 && <p className="cargando">Cargando...</p>}
        </main>
    );
}
