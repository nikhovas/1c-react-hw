import Like from "./like";
import styles from './post.module.css'

export interface PostData {
    id: number
    title: string
    text: string
    currentLikes: number
    isLiked: boolean
}

export interface PostProps {
    postData: PostData
    likeCallback: (key: number) => void
}


function Post(props: PostProps) {
    return (
        <div key={props.postData.id} className={styles.post}>
            <h2>{props.postData.title}</h2>
            <p>{props.postData.text}</p>
            <Like
                count={props.postData.currentLikes}
                id={props.postData.id}
                likeCallback={props.likeCallback}
                isLiked={props.postData.isLiked}
            />
        </div>
    )
}

export default Post
