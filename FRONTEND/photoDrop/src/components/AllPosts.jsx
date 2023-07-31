import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import "../styles/AllPosts.css";
import { useCurrentUser } from "../functions/utils/use-current-user";

export function AllPosts() {
    const currentUser= useCurrentUser();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/posts")
            .then((res) => res.json())
            .then((result) => {
                setPosts(result.data);
            });
    }, [currentUser, posts]);

    return (
        <main className="Page">
            {posts && posts.map((post, i) => {
                return <PostCard key={i} post={post}></PostCard>;
            })}
            {posts.length==0 && <p className= "cargando">Cargando...</p>}
        </main>
    );
}
