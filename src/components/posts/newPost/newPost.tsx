import styles from './newPost.module.scss'
import React, {useState} from "react";

export interface NewArticleProps {
}

function NewArticle(props: NewArticleProps) {
    const [name, newName] = useState<string>("")
    const [title, newTitle] = useState<string>("")
    const [text, newText] = useState<string>("")

    const submitForm = () => {
        if (name === "" || text === "" || title) {
            return
        }

        newName("")
        newTitle("")
        newText("")
    }

    return (
        <div className={styles.newPost}>
            <div>
                <div>
                    <h5>Name:</h5>
                    <input className={styles.lineInput} type="text" value={name}
                           onChange={(e) => newName(e.target.value)}/>
                </div>
                <div>
                    <h5>Title:</h5>
                    <input className={styles.lineInput} type="text" value={name}
                           onChange={(e) => newTitle(e.target.value)}/>
                </div>
                <div>
                    <h5>Text:</h5>
                    <textarea value={text} onChange={(e) => newText(e.target.value)}/>
                </div>
            </div>
            <div className={styles.button} onClick={submitForm}>
                Добавить пост
            </div>
        </div>
    )
}

export default NewArticle
