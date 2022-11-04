import React from "react";
import defaultStyles from "./common.module.css";
import CommentData from "../structs/comment";

export interface CommentProps {
    id: number
    data: CommentData
    deleteCommentCallback: (commentId: number) => (void)
}

function Comment(props: CommentProps) {
    return (
        <div className={defaultStyles.blockUpperSeparator}>
            <h4>{props.data.author}</h4>
            <p>{props.data.text}</p>
            <div className={defaultStyles.button} onClick={() => props.deleteCommentCallback(props.id)}>
                Удалить комментарий
            </div>
        </div>
    )
}

export default Comment
