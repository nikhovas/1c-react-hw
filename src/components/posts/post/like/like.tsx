import classnames from 'classnames/bind'
import React, {useState} from "react";

import styles from './like.module.scss'

const cn = classnames.bind(styles)

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

    return (
        <div className={cn('like', [isLiked ? `like-pressed` : `like-unpressed`])} onClick={likeClick}>
            {count} likes
        </div>
    )
}

export default Like
