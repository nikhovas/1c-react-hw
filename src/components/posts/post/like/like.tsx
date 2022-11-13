import classnames from 'classnames/bind'
import React from "react";

import styles from './like.module.scss'

const cn = classnames.bind(styles)

export interface LikeProps {
    id: number
    isLiked: boolean
    count: number
    likeCallback: (key: number) => void
}

function Like({id, isLiked, count, likeCallback}: LikeProps) {
    const likeClick = () => {
        likeCallback(id)
    }

    return (
        <div className={cn('like', [isLiked ? `like-pressed` : `like-unpressed`])} onClick={likeClick}>
            {count} likes
        </div>
    )
}

export default Like
