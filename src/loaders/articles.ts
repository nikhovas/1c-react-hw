import articles from '../asserts/data.json'
import ArticleData from "../structs/article";

const ARTICLES_LOAD_DURATION = 1500;

function selectByArticleId(totalData: ArticleData[], articleId: number) {
    console.log(totalData)
    return totalData.filter((comment: ArticleData) => comment.parentPostId === articleId)
}

export async function getArticles(articleId: number): Promise<ArticleData[]> {
    return new Promise(resolve => {
        const targetPosts = selectByArticleId(articles, articleId)
        setTimeout(() => resolve(targetPosts), ARTICLES_LOAD_DURATION)
    })
}
