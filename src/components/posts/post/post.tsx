import Like from "./like/like";
import styles from './post.module.scss'
import Comment from "./comments/comment/comment";
import {useEffect, useState} from "react";
import NewComment from "./comments/newComment/newComment";
import ArticleData from "../../../structs/article";
import CommentData from "../../../structs/comment";

export interface PostCommentsProps {
    postData: ArticleData
    commentsGetter: (postId: number) => Promise<CommentData[]>
    likeCallback: (key: number) => void
    newCommentIdGetter: () => number
}

export interface PostProps {
    postData: ArticleData
    commentsGetter: (postId: number) => Promise<CommentData[]>
    likeCallback: (key: number) => void
    newCommentIdGetter: () => number
}

function PostComments(props: PostCommentsProps) {
    const [comments, changeComments] = useState<CommentData[]>([])
    const [commentsLoaded, setCommentsLoaded] = useState<boolean>(false);

    const addNewCommentCallback = (commentData: CommentData) => {
        changeComments([...comments, commentData])
    }

    const deleteCommentCallback = (commentId: number) => {
        const newComments = comments.filter((comment) => comment.commentId !== commentId)
        changeComments(newComments)
    }

    useEffect(() => {
        props.commentsGetter(props.postData.articleId).then((comments: CommentData[]) => {
            changeComments(comments)
            setCommentsLoaded(true)
        })
    }, [])

    if (!commentsLoaded) {
        return (
            <div className={styles.blockUpperSeparator}>
                Коментарии загружаются
            </div>
        )
    } else {
        return (
            <div>
                {
                    comments.map((comment: CommentData) => {
                        return <Comment
                            id={comment.commentId}
                            key={comment.commentId}
                            data={comment}
                            deleteCommentCallback={deleteCommentCallback}
                        />
                    })
                }
                <NewComment
                    newCommentIdGetter={props.newCommentIdGetter}
                    addNewCommentCallback={addNewCommentCallback}
                    articleId={props.postData.articleId}
                />
            </div>
        )
    }
}

function Post(props: PostProps) {
    const [areCommentsShown, setAreCommentsShown] = useState<boolean>(false);

    return (
        <div key={props.postData.articleId} className={styles.post}>
            <h2>{props.postData.title}</h2>
            <p>{props.postData.text}</p>
            <div>
                <Like
                    count={props.postData.currentLikes}
                    id={props.postData.articleId}
                    likeCallback={props.likeCallback}
                    isLiked={props.postData.isLiked}
                />
                <div className={styles.button} onClick={() => setAreCommentsShown(!areCommentsShown)}
                     style={{marginLeft: 10}}>
                    {areCommentsShown ? "Скрыть комментарии" : "Показать комментарии"}
                </div>
            </div>
            {areCommentsShown &&
                <PostComments
                    postData={props.postData}
                    commentsGetter={props.commentsGetter}
                    newCommentIdGetter={props.newCommentIdGetter}
                    likeCallback={props.likeCallback}
                />
            }

        </div>
    )
}

export default Post
