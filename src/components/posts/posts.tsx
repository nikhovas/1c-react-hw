import styles from './posts.module.scss'
import {useEffect, useState} from "react";
import ArticleData from "../../structs/article";
import NewPost from "./newPost/newPost";
import Post from "./post/post"
import {dateSort, likesSort} from "../common/sorting/sorting";

export interface PostCommentsProps {
    parentPostId: number
    commentsGetter: (postId: number) => Promise<ArticleData[]>
    newPostIdGetter: () => number
    sorting: string
    currentDepth: number
    maxDepth: number
}

export default function PostComments(
    {parentPostId, commentsGetter, newPostIdGetter, sorting, currentDepth, maxDepth}: PostCommentsProps
) {
    const [comments, changeComments] = useState<ArticleData[]>([])
    const [commentsLoaded, setCommentsLoaded] = useState<boolean>(false);

    useEffect(() => {
        commentsGetter(parentPostId).then((comments: ArticleData[]) => {
            changeComments(comments)
            setCommentsLoaded(true)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addNewCommentCallback = (commentData: ArticleData) => {
        console.log("here")
        changeComments([...comments, commentData])
    }

    const deleteCommentCallback = (commentId: number) => {
        const newComments = comments.filter((comment) => comment.postId !== commentId)
        changeComments(newComments)
    }

    let sortedComments = [...comments]

    switch (sorting) {
        case dateSort.value:
            sortedComments = sortedComments.sort((l, r) => l.creationDate < r.creationDate ? 1 : -1)
            break
        case likesSort.value:
            sortedComments = sortedComments.sort((l, r) => l.currentLikes < r.currentLikes ? 1 : -1)
            break
    }

    if (!commentsLoaded) {
        return (
            <div className={styles.blockUpperSeparator}>
                Объекты загружаются
            </div>
        )
    } else {
        return (
            <div className={styles.comments}>
                {
                    sortedComments.map((comment: ArticleData) => {
                        return <Post
                            key={comment.postId}
                            postData={comment}
                            deletePostCallback={deleteCommentCallback}
                            commentsGetter={commentsGetter}
                            newPostIdGetter={newPostIdGetter}
                            currentDepth={currentDepth}
                            maxDepth={maxDepth}
                        />
                    })
                }
                <NewPost
                    newPostIdGetter={newPostIdGetter}
                    addNewPostCallback={addNewCommentCallback}
                    parentPostId={parentPostId}
                />
            </div>
        )
    }
}