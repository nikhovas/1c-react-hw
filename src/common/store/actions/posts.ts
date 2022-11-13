import {PostActions} from "../constants";
import articles from '../../../asserts/data.json'
import ArticleData from "../../../structs/article";
import {PostWithComments, Sorting} from "../../../structs/storedArticle";

const ARTICLES_LOAD_DURATION = 1500;

export enum ActionState {
    EXECUTING = 0,
    SUCCESS = 1,
    ERROR = 2,
}

export interface BaseActionContext {
    actionState: ActionState
}


export interface LoadComments extends BaseActionContext {
    type: PostActions.loadComments
    parentPostId: number
    comments?: PostWithComments[]
}

export const startLoadComments = (parentPostId: number) => {
    return async (dispatch: (_: LoadComments) => void) => {
        dispatch({
            actionState: ActionState.EXECUTING,
            type: PostActions.loadComments,
            parentPostId: parentPostId,
        })

        new Promise(resolve => {
            const rsp = articles.filter((comment: ArticleData) => comment.parentPostId === parentPostId)
            setTimeout(() => resolve(rsp), ARTICLES_LOAD_DURATION)
        }).then(_rsp => {
            let rsp = _rsp as ArticleData[]

            dispatch({
                actionState: ActionState.SUCCESS,
                type: PostActions.loadComments,
                parentPostId: parentPostId,
                comments: rsp,
            })
        })
    }
}


export interface SortComments extends BaseActionContext {
    type: PostActions.sortComments
    parentPostId: number
    sorting: Sorting
}

export const startSortComments = (parentPostId: number, sorting: Sorting) => {
    return async (dispatch: (_: SortComments) => void) => {
        dispatch({
            actionState: ActionState.EXECUTING,
            type: PostActions.sortComments,
            parentPostId: parentPostId,
            sorting: sorting,
        })
    }
}


export interface GetPostAction extends BaseActionContext {
    type: PostActions.loadPost
    post?: ArticleData
    postId: number
}

export const startGetPost = (postId: number) => {
    return async (dispatch: (_: GetPostAction) => void) => {
        dispatch({
            actionState: ActionState.EXECUTING,
            type: PostActions.loadPost,
            postId: postId,
        })

        new Promise(resolve => {
            let res: ArticleData | undefined = undefined
            const rsp = articles.filter((post: ArticleData) => post.postId === postId)
            if (rsp.length !== 0) {
                res = rsp[0]
            }
            setTimeout(() => resolve(res), ARTICLES_LOAD_DURATION)
        }).then(_rsp => {
            let rsp = _rsp as (ArticleData | undefined)

            dispatch({
                actionState: ActionState.SUCCESS,
                type: PostActions.loadPost,
                post: rsp,
                postId: postId,
            })
        })
    }
}


export interface AddPostAction extends BaseActionContext {
    type: PostActions.addPost
    post: ArticleData
}

export const startAddPost = (post: ArticleData) => {
    return async (dispatch: (_: AddPostAction) => void) => {
        dispatch({
            actionState: ActionState.EXECUTING,
            type: PostActions.addPost,
            post: post,
        })

        new Promise(resolve => {
            setTimeout(() => resolve(post), ARTICLES_LOAD_DURATION)
        }).then(_rsp => {
            let rsp = _rsp as ArticleData

            dispatch({
                actionState: ActionState.SUCCESS,
                type: PostActions.addPost,
                post: rsp,
            })
        })
    }
}


export interface EditPostAction extends BaseActionContext {
    type: PostActions.editPost
    post: ArticleData
}

export const startEditPost = (post: ArticleData) => {
    return async (dispatch: (_: EditPostAction) => void) => {
        dispatch({
            actionState: ActionState.EXECUTING,
            type: PostActions.editPost,
            post: post,
        })

        new Promise(resolve => {
            setTimeout(() => resolve(post), ARTICLES_LOAD_DURATION)
        }).then(_rsp => {
            let rsp = _rsp as ArticleData

            dispatch({
                actionState: ActionState.SUCCESS,
                type: PostActions.editPost,
                post: rsp,
            })
        })
    }
}


export interface DeletePostAction extends BaseActionContext {
    type: PostActions.deletePost
    postId: number
}

export const startDeletePost = (postId: number) => {
    return async (dispatch: (_: DeletePostAction) => void) => {
        dispatch({
            actionState: ActionState.EXECUTING,
            type: PostActions.deletePost,
            postId: postId,
        })

        new Promise(resolve => {
            setTimeout(() => resolve(postId), ARTICLES_LOAD_DURATION)
        }).then(_rsp => {
            dispatch({
                actionState: ActionState.SUCCESS,
                type: PostActions.deletePost,
                postId: postId,
            })
        })
    }
}


export type PostAction =
    | LoadComments
    | SortComments
    | GetPostAction
    | AddPostAction
    | EditPostAction
    | DeletePostAction
