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
    errorData?: string
}

const emulateServer = (resolve: any, reject: any, rsp: any) => {
    setTimeout(() => {
        if (Math.random() < 0.1) {
            reject('some error text')
        } else {
            resolve(rsp)
        }
    }, ARTICLES_LOAD_DURATION)
}

const emulatedPromise = (rsp: any, params: object) => {
    return new Promise((resolve, reject) => {
        emulateServer(resolve, reject, rsp)
    }).catch(_err => {
        console.error([
            `[${new Date().toISOString()}]`,
            `Error occurred while getting data from server.`,
            `Error text: ${_err}`,
            `Input:`].join('\n'), params,
        )
        throw _err
    })
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

        emulatedPromise(
            articles.filter((comment: ArticleData) => comment.parentPostId === parentPostId), {
                parentPostId: parentPostId,
            }
        ).then(_rsp => {
            let rsp = _rsp as ArticleData[]
            dispatch({
                actionState: ActionState.SUCCESS,
                type: PostActions.loadComments,
                parentPostId: parentPostId,
                comments: rsp,
            })
        }).catch(_err => {
            const err = _err as string
            dispatch({
                actionState: ActionState.ERROR,
                type: PostActions.loadComments,
                parentPostId: parentPostId,
                errorData: err,
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

        emulatedPromise(
            articles.filter((post: ArticleData) => post.postId === postId), {postId: postId}
        ).then(_rsp => {
            let rsp = _rsp as ArticleData[]
            dispatch({
                actionState: ActionState.SUCCESS,
                type: PostActions.loadPost,
                post: rsp.length > 0 ? rsp[0] : undefined,
                postId: postId,
            })
        }).catch(_err => {
            const err = _err as string
            dispatch({
                actionState: ActionState.ERROR,
                type: PostActions.loadPost,
                postId: postId,
                errorData: err,
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

        emulatedPromise(post, {post: post}).then(_rsp => {
            let rsp = _rsp as ArticleData
            dispatch({
                actionState: ActionState.SUCCESS,
                type: PostActions.addPost,
                post: rsp,
            })
        }).catch(_err => {
            const err = _err as string
            dispatch({
                actionState: ActionState.ERROR,
                type: PostActions.addPost,
                post: post,
                errorData: err,
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

        emulatedPromise(post, {post: post}).then(_rsp => {
            let rsp = _rsp as ArticleData
            dispatch({
                actionState: ActionState.SUCCESS,
                type: PostActions.editPost,
                post: rsp,
            })
        }).catch(_err => {
            const err = _err as string
            dispatch({
                actionState: ActionState.ERROR,
                type: PostActions.editPost,
                post: post,
                errorData: err,
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

        emulatedPromise(postId, {postId: postId}).then(_rsp => {
            const postId = _rsp as number
            dispatch({
                actionState: ActionState.SUCCESS,
                type: PostActions.deletePost,
                postId: postId,
            })
        }).catch(_err => {
            const err = _err as string
            dispatch({
                actionState: ActionState.ERROR,
                type: PostActions.deletePost,
                postId: postId,
                errorData: err,
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
