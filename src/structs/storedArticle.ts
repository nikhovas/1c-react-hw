import ArticleData from "./article";

export enum LoadingStates {
    NOT_STARTED = 0,
    LOADING = 1,
    ADDING = 2,
    EDITING = 3,
    REMOVING = 4,
    LOADED = 5,
    ERROR = 6,
}

export enum Sorting {
    BY_DATE = 'by-date',
    BY_LIKES = 'by-likes',
}

export interface CommentsData {
    data?: number[]
    sorting: Sorting,
    loadState: LoadingStates
}

export interface PostWithComments extends ArticleData {
    comments?: CommentsData
}

export interface PostWithState {
    articleData?: PostWithComments
    loadState: LoadingStates
    postId: number
}

export const wrapToStoredArticleData = (articleData: ArticleData) => ({
    ...articleData,
    comments: {
        data: undefined,
        loadState: LoadingStates.NOT_STARTED,
    },
})
