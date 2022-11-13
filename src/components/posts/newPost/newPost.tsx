import React, {Reducer, useCallback, useReducer} from "react";
import {connect} from "react-redux";

import styles from './newPost.module.scss'
import SmallText from "../elements/smallText/smallText";
import TitleInput from "../elements/title/titleInput";
import ParagraphInput from "../elements/paragraph/paragraphInput";
import SmallTextInput from "../elements/smallText/smallTextInput";
import {startAddPost} from "../../../common/store/actions/posts";
import {PostWithComments} from "../../../structs/storedArticle";
import ArticleData from "../../../structs/article";

export interface WrappedNewArticleProps {
    parentPostId: number
}

export interface NewArticleProps extends WrappedNewArticleProps {
    addNewPostCallback: (post: PostWithComments) => void
}

enum NewPostFormActionType {
    AUTHOR = 0,
    TITLE = 1,
    TEXT = 2,
    RESTORE = 3,
}

interface SetFieldAction {
    type: NewPostFormActionType.TEXT |
        NewPostFormActionType.AUTHOR |
        NewPostFormActionType.TITLE
    data: string
}

interface RestoreAction {
    type: NewPostFormActionType.RESTORE
}

type NewPostFormAction = SetFieldAction | RestoreAction

function NewArticle({addNewPostCallback, parentPostId}: NewArticleProps) {
    const initialState: ArticleData = {
        postId: 0,
        parentPostId: parentPostId,
        author: '',
        title: '',
        text: '',
        currentLikes: 0,
        isLiked: false,
        creationDate: new Date().toISOString().slice(0, 10),
    }

    const reduceArticleData = (data: ArticleData, action: NewPostFormAction) => {
        switch (action.type) {
            case NewPostFormActionType.AUTHOR:
                return {...data, author: action.data}
            case NewPostFormActionType.TEXT:
                return {...data, text: action.data}
            case NewPostFormActionType.TITLE:
                return {...data, title: action.data}
            case NewPostFormActionType.RESTORE:
                return initialState
            default:
                return data
        }
    }

    const [data, dispatch] = useReducer<Reducer<ArticleData, NewPostFormAction>>(
        reduceArticleData,
        initialState,
    )

    const submitForm = () => {
        if (data.text === "") {
            return
        }

        addNewPostCallback(data)
        dispatch({type: NewPostFormActionType.RESTORE})
    }

    const titleChange = useCallback<((d: string) => void)>(d => dispatch({
        type: NewPostFormActionType.TITLE,
        data: d,
    }), [])

    const textChange = useCallback<((d: string) => void)>(d => dispatch({
        type: NewPostFormActionType.TEXT,
        data: d,
    }), [])

    const authorChange = useCallback<((d: string) => void)>(d => dispatch({
        type: NewPostFormActionType.AUTHOR,
        data: d,
    }), [])

    return (
        <div className={styles.newPost}>
            <TitleInput value={data.title} placeholder={'Title'} onChange={titleChange}/>
            <ParagraphInput value={data.text} placeholder={'Text'} onChange={textChange}/>
            <div className={styles.additionalInfo}>
                <SmallText initialText={data.creationDate}/>
                <SmallTextInput value={data.author} placeholder={'Author'} onChange={authorChange}/>
            </div>
            <div className={styles.buttons}>
                <div className={styles.button} onClick={submitForm}>
                    Добавить
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: any, props: WrappedNewArticleProps) => ({
    addNewPostCallback: (post: PostWithComments) => dispatch(startAddPost(post)),
})

export default connect(null, mapDispatchToProps)(NewArticle)
