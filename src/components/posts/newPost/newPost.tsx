import styles from './newPost.module.scss'
import React, {useState} from "react";
import ArticleData from "../../../structs/article";
import SmallText from "../elements/smallText/smallText";
import TitleInput from "../elements/title/titleInput";
import ParagraphInput from "../elements/paragraph/paragraphInput";
import SmallTextInput from "../elements/smallText/smallTextInput";

export interface NewArticleProps {
    newPostIdGetter: () => number
    addNewPostCallback: (commentData: ArticleData) => void
    parentPostId: number
}

function NewArticle({newPostIdGetter, addNewPostCallback, parentPostId}: NewArticleProps) {
    const [author, newAuthor] = useState<string>("")
    const [title, newTitle] = useState<string>("")
    const [text, newText] = useState<string>("")

    const currentDate = new Date().toISOString().slice(0, 10)

    const submitForm = () => {
        if (text === "") {
            return
        }

        console.log("here2")

        const savedAuthor = author
        const savedTitle = title
        const savedText = text

        newAuthor("")
        newTitle("")
        newText("")

        addNewPostCallback({
            postId: newPostIdGetter(),
            parentPostId: parentPostId,
            author: savedAuthor,
            title: savedTitle,
            text: savedText,
            currentLikes: 0,
            isLiked: false,
            creationDate: currentDate,
        })
    }

    return (
        <div className={styles.newPost}>
            <TitleInput value={title} placeholder={'Title'} onChange={newTitle}/>
            <ParagraphInput value={text} placeholder={'Text'} onChange={newText}/>
            <div className={styles.additionalInfo}>
                <SmallText initialText={currentDate}/>
                <SmallTextInput value={author} placeholder={'Author'} onChange={newAuthor}/>
            </div>
            <div className={styles.buttons}>
                <div className={styles.button} onClick={submitForm}>
                    Добавить
                </div>
            </div>
        </div>
    )
}

export default NewArticle
