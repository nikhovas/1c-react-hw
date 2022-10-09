import styles from './newComment.module.css'
import defaultStyles from './common.module.css'
import React, {useState} from "react";
import ArticleData from "../structs/article";

export interface NewArticleProps {
    newArticleIdGetter: () => number
    addNewArticleCallback: (articleData: ArticleData) => (void)
    articleId: number
}

function NewArticle(props: NewArticleProps) {
    const [name, newName] = useState<string>("")
    const [title, newTitle] = useState<string>("")
    const [text, newText] = useState<string>("")

    const submitForm = () => {
        if (name === "" || text === "" || title) {
            return
        }

        props.addNewArticleCallback({
            articleId: props.newArticleIdGetter(),
            title: title,
            text: text,
            currentLikes: 0,
            isLiked: false,
        })

        newName("")
        newTitle("")
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
                    <h5>Title:</h5>
                    <input className={defaultStyles.lineInput} type="text" value={name} onChange={(e) => newTitle(e.target.value)} />
                </div>
                <div>
                    <h5>Text:</h5>
                    <textarea value={text} onChange={(e) => newText(e.target.value)} />
                </div>
            </div>
            <div className={defaultStyles.button} onClick={submitForm}>
                Добавить пост
            </div>
        </div>
    )
}

export default NewArticle
