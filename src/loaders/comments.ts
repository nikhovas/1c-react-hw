import comments from '../asserts/comments.json'
import CommentData from "../structs/comment";

const COMMENTS_LOAD_DURATION = 1000;

function selectByArticleId(totalData: CommentData[], articleId: number) {
    return totalData.filter((comment: CommentData) => comment.articleId === articleId)
}

export async function getComments(articleId: number): Promise<CommentData[]> {
    return new Promise(resolve => {
        const targetComments = selectByArticleId(comments, articleId)
        setTimeout(() => resolve(targetComments), COMMENTS_LOAD_DURATION)
    })
}
