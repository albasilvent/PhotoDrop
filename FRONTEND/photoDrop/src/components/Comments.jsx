// eslint-disable-next-line react/prop-types
export function Comments(props){
    // eslint-disable-next-line react/prop-types
    const {userName, profilePicture, comment, createdAt} = props.comment
    return(
        <article>
            <img src={profilePicture}></img>
            <h3>{userName}</h3>
            <p>{comment}</p>
            <p>{createdAt}</p>
        </article>
    )
}