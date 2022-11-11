import React, {useEffect, useState} from 'react';

import Post from './components/posts/post/post';
import NewPost from './components/posts/newPost/newPost';

import styles from './app.module.scss';
import {getComments} from "./loaders/comments";
import {getArticles} from "./loaders/articles";
import ArticleData from "./structs/article";

function App() {
    let currentCommentId = 100
    let newCommentIdGetter = () => {
        currentCommentId += 1
        return currentCommentId
    }

    const [articles, setArticles] = useState<ArticleData[]>([])
    const [articlesLoaded, setArticlesLoaded] = useState<boolean>(false)
    useEffect(() => {
        getArticles().then((articles: ArticleData[]) => {
            setArticles(articles)
            setArticlesLoaded(true)
        })
    })

    const likeCallback = function (key: number) {
        console.log(key)
    }

    if (!articlesLoaded) {
        return (
            <div>
                Посты загрыжаются
            </div>
        )
    }

    return (
        <div className={styles.app}>
            <div className={styles.side}>
                <div className={styles.menu}>
                    <p>
                        There will be a menu
                    </p>
                </div>
            </div>
            <div className={styles.appInternal}>
                {articles.map(article => (
                    <Post
                        postData={article}
                        likeCallback={likeCallback}
                        key={article.articleId}
                        commentsGetter={getComments}
                        newCommentIdGetter={newCommentIdGetter}
                    />
                ))}
                <NewPost>
                </NewPost>
            </div>
        </div>
    );
}

export default App;
