import styles from './newComment.module.css'
import defaultStyles from './common.module.css'
import React, {useState} from "react";
import CommentData from "../structs/comment";

export interface NewCommentProps {
    newCommentIdGetter: () => number
    addNewCommentCallback: (commentData: CommentData) => (void)
    articleId: number
}

function NewComment(props: NewCommentProps) {
    const [name, newName] = useState<string>("")
    const [text, newText] = useState<string>("")

    const submitForm = () => {
        if (name === "" || text === "") {
            return
        }

        props.addNewCommentCallback({
            commentId: props.newCommentIdGetter(),
            author: name,
            articleId: props.articleId,
            text: text,
        })

        newName("")
        newText("")
    }

    return (
        <div className={defaultStyles.blockUpperSeparator}>
            <div className={styles.newCommentInputArea}>
                <div>
                    <h5>Name:</h5>
                    <input className={defaultStyles.lineInput} type="text" value={name} onChange={(e) => newName(e.target.value)} />
                </div>
                <div>
                    <h5>Text:</h5>
                    <textarea value={text} onChange={(e) => newText(e.target.value)} />
                </div>
            </div>
            <div className={defaultStyles.button} onClick={submitForm}>
                Добавить комментарий
            </div>
        </div>
    )
}

export default NewComment
