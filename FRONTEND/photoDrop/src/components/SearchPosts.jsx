import { PostCard } from "./PostCard";
import { useState, useEffect } from "react";
import "../styles/AllPosts.css";

// eslint-disable-next-line react/prop-types
export function SearchPosts({ search }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/posts")
            .then((res) => res.json())
            .then((result) => {
                const array = result.data;
                const sortedArray = array
                    .sort(
                        (a, b) => b.like_count - a.like_count
                        // eslint-disable-next-line react/prop-types
                    )
                    .filter(
                        (post) =>
                            post.userName
                                .toLowerCase()
                                // eslint-disable-next-line react/prop-types
                                .includes(search.toLowerCase()) ||
                            post.postTitle
                                .toLowerCase()
                                // eslint-disable-next-line react/prop-types
                                .includes(search.toLowerCase()) ||
                            post.postDescription
                                .toLowerCase()
                                // eslint-disable-next-line react/prop-types
                                .includes(search.toLowerCase())
                    );
                // let sortedPosts= result.data.map()
                setPosts(sortedArray);
            });
    }, [posts]);

    return (
        <main>
            {posts &&
                posts.map((post, i) => {
                    return <PostCard key={i} post={post}></PostCard>;
                })}

            {posts.length == 0 && (
                <p className= "noPosts" style={{ marginBottom: "650px", textAlign: "center" }}>
                    No hay posts que coincidan con la búsqueda
                </p>
            )}
        </main>
    );
}
