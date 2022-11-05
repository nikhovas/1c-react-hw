import Like from "./like/like";
import styles from './post.module.scss'
import {useState} from "react";
import ArticleData from "../../../structs/article";
import SmallText from "../elements/smallText/smallText";
import PostComments from "../posts";
import Paragraph from "../elements/paragraph/paragraph";
import Title from "../elements/title/title";
import classnames from "classnames/bind";
import Sorting, {dateSort} from "../../common/sorting/sorting";

const cn = classnames.bind(styles)

export interface PostProps {
    postData: ArticleData
    commentsGetter: (postId: number) => Promise<ArticleData[]>
    deletePostCallback: (commentId: number) => (void)
    newPostIdGetter: () => number
    currentDepth: number
    maxDepth: number
}

function Post(
    {postData, commentsGetter, deletePostCallback, newPostIdGetter, currentDepth, maxDepth}: PostProps
) {
    const [areCommentsShown, setAreCommentsShown] = useState<boolean>(false);
    const [text, setText] = useState<string>(postData.text)
    const [title, setTitle] = useState<string>(postData.title)
    const [sorting, setSorting] = useState<string>(dateSort.value)

    const likeCallback = function (key: number) {
        console.log(key)
    }

    return (
        <div key={postData.postId} className={cn('post', areCommentsShown ? ['postWithComments'] : [])}>
            {
                title !== "" && <Title initialText={title} newTextCallback={setTitle}/>
            }
            <Paragraph initialText={text} newTextCallback={setText}/>
            <div className={styles.additionalInfo}>
                <SmallText initialText={postData.creationDate}/>
                <SmallText initialText={postData.author}/>
            </div>
            <div className={styles.buttons}>
                <Like
                    count={postData.currentLikes}
                    id={postData.postId}
                    likeCallback={likeCallback}
                    isLiked={postData.isLiked}
                />
                <div className={styles.button} onClick={() => deletePostCallback(postData.postId)}>
                    Удалить
                </div>
                {
                    currentDepth < maxDepth &&
                    <div className={styles.button} onClick={() => setAreCommentsShown(!areCommentsShown)}>
                        {areCommentsShown ? "Скрыть вложения" : "Показать вложения"}
                    </div>
                }
                {areCommentsShown && <Sorting setSortingValue={setSorting} inputValue={sorting}/>}
            </div>
            {areCommentsShown &&
                <PostComments
                    parentPostId={postData.postId}
                    commentsGetter={commentsGetter}
                    newPostIdGetter={newPostIdGetter}
                    sorting={sorting}
                    currentDepth={currentDepth + 1}
                    maxDepth={maxDepth}
                />
            }
        </div>
    )
}

export default Post
