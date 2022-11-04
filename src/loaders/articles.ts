import articles from '../asserts/data.json'
import ArticleData from "../structs/article";

const ARTICLES_LOAD_DURATION = 1500;

export async function getArticles(): Promise<ArticleData[]> {
    return new Promise(resolve => {
        setTimeout(() => resolve(articles), ARTICLES_LOAD_DURATION)
    })
}
