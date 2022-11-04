import React, {useState} from "react";
import styles from './like.module.css'

export interface LikeProps {
    id: number
    isLiked: boolean
    count: number
    likeCallback: (key: number) => void
}

function Like(props: LikeProps) {
    const [isLiked, setIsLiked] = useState<boolean>(props.isLiked)
    const [count, setCount] = useState<number>(props.count)

    const likeClick = () => {
        props.likeCallback(props.id)
        setIsLiked(!isLiked)

        if (isLiked) {
            setCount(count - 1)
        } else {
            setCount(count + 1)
        }
    }

    let style: React.CSSProperties = {}
    if (isLiked) {
        style = {
            borderColor: "#F06292",
            backgroundColor: "#F48FB1",
        }
    }

    return (
        <div className={styles.like} style={style} onClick={likeClick}>
            {count} likes
        </div>
    )
}

export default Like
