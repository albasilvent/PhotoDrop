/* eslint-disable react/prop-types */
export function PostCard({ post }) {
    const {
        comment_count,
        name,
        profilePicture,
        title,
        description,
        photo1,
        photo2,
        photo3,
        likes,
        comments,
        createdAt
    } = post;

    return (
        <section>
            <img src={profilePicture}></img>
            <p>{name}</p>
            <h2>{title}</h2>
            <div>
                <img src={photo1}></img>
                <img src={photo2}></img>
                <img src={photo3}></img>
            </div>
            <p>Likes:{likes}</p>
            <p>Comments: {comment_count}</p>
            <p>{description}</p>
            {comments &&
                comments.map((comment, i) => {
                    return <p key={i}>{comment.comment}</p>;
                })}
            <p>{createdAt}</p>
        </section>
    );
}
