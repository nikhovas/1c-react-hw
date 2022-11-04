import React, {useEffect, useState} from 'react';
import './App.css';
import Post from './components/post'
import comment from "./components/comment";
import {getComments} from "./loaders/comments";
import {getArticles} from "./loaders/articles";
import ArticleData from "./structs/article";

function App() {
    let currentCommentId = 100
    let newCommentIdGetter = () => {
        currentCommentId += 1
        return currentCommentId
    }

    // let commentsGetter = (articleId: number) => {
    //     return comments.filter((value: CommentData) => value.articleId === articleId)
    // }

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
        // for (let i = 0; i < articles.length; i++) {
        //     let elem = articles[i];
        //     if (elem.articleId === key) {
        //         elem.isLiked = !elem.isLiked
        //         if (elem.isLiked) {
        //             elem.currentLikes += 1
        //         } else {
        //             elem.currentLikes -= 1
        //         }
        //     }
        //     articles[i] = elem
        //     break
        // }
        // console.log(posts)
    }

    if (!articlesLoaded) {
        return (
            <div>
                Посты загрыжаются
            </div>
        )
    }

    return (
        <div>
            {articles.map(article => (
                <Post
                    postData={article}
                    likeCallback={likeCallback}
                    key={article.articleId}
                    commentsGetter={getComments}
                    newCommentIdGetter={newCommentIdGetter}
                />
            ))}
        </div>
    );
}

export default App;
