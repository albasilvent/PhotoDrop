import { Comment } from "./Comment";

/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export function CommentsModal({ comments, menuDisplay, setMenuDisplay}) {

    function onCrossClick(){
        setMenuDisplay(!menuDisplay);
    }

    return (
        <div className={`modal-comentarios ${menuDisplay ? "" : "hidden"}`}>
            <p style={{padding: "0.5rem"}} className="material-symbols-rounded" onClick={onCrossClick}>Close</p>
            {comments &&
                comments.map((comment, i) => {
                    // eslint-disable-next-line react/jsx-key
                    return <Comment key={i} comment={comment}/>;
                })}
            {comments.length == 0 && <p>No hay comentarios</p>}
        </div>
    );
}
