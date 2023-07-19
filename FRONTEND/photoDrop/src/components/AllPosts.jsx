import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import "../styles/AllPosts.css"

export function AllPosts() {

    const [posts, setPosts]= useState([])

    useEffect(() => {
        fetch("http://localhost:5000/posts")
            .then((res) => res.json())
            .then((result) => {
                setPosts(result.data);
            });
    }, [posts]);

    return <main>
        {posts.map((post, i)=> {
            return <PostCard key= {i} post={post}></PostCard>
        })}
    </main>;
}
