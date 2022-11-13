import React, {useState} from "react";
import {connect} from "react-redux";

import styles from './newPost.module.scss'
import SmallText from "../elements/smallText/smallText";
import TitleInput from "../elements/title/titleInput";
import ParagraphInput from "../elements/paragraph/paragraphInput";
import SmallTextInput from "../elements/smallText/smallTextInput";
import {startAddPost} from "../../../common/store/actions/posts";
import {PostWithComments} from "../../../structs/storedArticle";

export interface NewArticleProps {
    addNewPostCallback?: (post: PostWithComments) => void
    parentPostId: number
}

function NewArticle({addNewPostCallback, parentPostId}: NewArticleProps) {
    const [author, newAuthor] = useState<string>("")
    const [title, newTitle] = useState<string>("")
    const [text, newText] = useState<string>("")

    const currentDate = new Date().toISOString().slice(0, 10)

    const submitForm = () => {
        if (text === "") {
            return
        }

        const savedAuthor = author
        const savedTitle = title
        const savedText = text

        newAuthor("")
        newTitle("")
        newText("")

        addNewPostCallback!({
            postId: 0,
            parentPostId: parentPostId,
            author: savedAuthor,
            title: savedTitle,
            text: savedText,
            currentLikes: 0,
            isLiked: false,
            creationDate: currentDate,
            comments: undefined,
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

const mapDispatchToProps = (dispatch: any) => ({
    addNewPostCallback: (post: PostWithComments) => dispatch(startAddPost(post)),
})

export default connect(null, mapDispatchToProps)(NewArticle)
