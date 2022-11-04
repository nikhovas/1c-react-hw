import React from "react";
import styles from "./comment.module.scss";
import CommentData from "../../../../../structs/comment";

export interface CommentProps {
    id: number
    data: CommentData
    deleteCommentCallback: (commentId: number) => (void)
}

function Comment(props: CommentProps) {
    return (
        <div className={styles.comment}>
            <h4>{props.data.author}</h4>
            <p>{props.data.text}</p>
            <div className={styles.button} onClick={() => props.deleteCommentCallback(props.id)}>
                Удалить комментарий
            </div>
        </div>
    )
}

export default Comment
