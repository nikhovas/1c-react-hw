export default interface ArticleData {
    postId: number
    parentPostId: number
    author: string
    title: string
    text: string
    currentLikes: number
    isLiked: boolean
    creationDate: string
}
