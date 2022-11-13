import {PostActions} from "../constants";
import {LoadingStates, PostWithState, Sorting} from "../../../structs/storedArticle";
import {combineReducers} from "redux";
import {ActionState, PostAction} from "../actions/posts";


let newPostId: number = 200

export interface PostsState {
    links: Map<number, PostWithState>
}

const initialState = {
    links: new Map<number, PostWithState>([
        [0, {
            loadState: LoadingStates.LOADED,
            postId: 0,
            articleData: {
                author: "",
                comments: undefined,
                creationDate: "",
                currentLikes: 0,
                isLiked: false,
                parentPostId: 0,
                postId: 0,
                text: "",
                title: ""
            }
        }],
    ]),
}


const updatePost = (postsMap: Map<number, PostWithState>, newPost?: PostWithState) => {
    if (newPost === undefined) {
        return undefined
    }

    let oldPost = postsMap.get(newPost.postId)

    if (oldPost === undefined) {
        oldPost = newPost
    } else {
        let postToSet: PostWithState = {
            postId: newPost.postId,
            loadState: newPost.loadState,
        }

        if (newPost.articleData === undefined) {
            postToSet.articleData = undefined
        } else if (oldPost.articleData === undefined) {
            postToSet.articleData = newPost.articleData
        } else {
            postToSet.articleData = {
                ...oldPost.articleData,
                ...newPost.articleData,
            }
        }
        oldPost = postToSet
    }
    postsMap.set(oldPost.postId, oldPost)
    return oldPost
}

const updatePostWithParent = (postsMap: Map<number, PostWithState>, newPost?: PostWithState) => {
    newPost = updatePost(postsMap, newPost)
    if (newPost === undefined) {
        return undefined
    }

    let parentPostId = newPost.articleData?.parentPostId
    if (parentPostId !== undefined) {
        let loadedParentPostWithState = postsMap.get(parentPostId)

        let parentPostComments = loadedParentPostWithState?.articleData?.comments
        let parentPostCommentsData = parentPostComments?.data
        if (parentPostCommentsData !== undefined) {
            if (parentPostCommentsData.findIndex((p) => p === newPost!.postId) === -1) {
                loadedParentPostWithState!.articleData!.comments = {
                    data: [...parentPostCommentsData, newPost.postId],
                    sorting: parentPostComments!.sorting,
                    loadState: parentPostComments!.loadState,
                }
            }
        }
    }
}

const recourseDelete = (postsMap: Map<number, PostWithState>, postId: number) => {
    let post = postsMap.get(postId)
    let commentsData = post?.articleData?.comments?.data
    if (commentsData !== undefined) {
        commentsData.map(p => recourseDelete(postsMap, p))
    }
    postsMap.delete(postId)
}

export const postReducers = (state: PostsState = initialState, action: PostAction) => {
    const sortByDate = (l: number, r: number) => state.links.get(l)!.articleData!.creationDate < state.links.get(r)!.articleData!.creationDate ? 1 : -1
    const sortByLikes = (l: number, r: number) => state.links.get(l)!.articleData!.currentLikes < state.links.get(r)!.articleData!.currentLikes ? 1 : -1
    const SORTERS = new Map<Sorting, (l: number, r: number) => number>([
        [Sorting.BY_DATE, sortByDate],
        [Sorting.BY_LIKES, sortByLikes],
    ]);

    let loadedParentPostWithState: PostWithState | undefined = undefined

    switch (action?.type) {
        case PostActions.loadComments:
            loadedParentPostWithState = state.links.get(action.parentPostId)
            if (loadedParentPostWithState?.articleData !== undefined) {
                switch (action.actionState) {
                    case ActionState.EXECUTING:
                        loadedParentPostWithState.articleData.comments = {
                            loadState: LoadingStates.LOADING,
                            sorting: Sorting.BY_DATE,
                        }
                        break
                    case ActionState.SUCCESS:
                        action.comments!.map(p => updatePost(state.links, {
                                articleData: p,
                                postId: p.postId,
                                loadState: LoadingStates.LOADED,
                            })
                        )
                        loadedParentPostWithState.articleData.comments = {
                            data: action.comments!.map(p => p.postId).sort(SORTERS.get!(Sorting.BY_DATE)),
                            sorting: Sorting.BY_DATE,
                            loadState: LoadingStates.LOADED,
                        }
                        break
                    case ActionState.ERROR:
                        loadedParentPostWithState.articleData.comments = {
                            sorting: Sorting.BY_DATE,
                            loadState: LoadingStates.ERROR,
                        }
                        break
                }
            }
            break
        case PostActions.sortComments:
            loadedParentPostWithState = state.links.get(action.parentPostId)
            let parentPostComments = loadedParentPostWithState?.articleData?.comments
            if (parentPostComments !== undefined) {
                parentPostComments.sorting = action.sorting
                if (parentPostComments.data !== undefined) {
                    loadedParentPostWithState!.articleData!.comments = {
                        data: parentPostComments.data.sort(SORTERS.get!(action.sorting)),
                        sorting: action.sorting,
                        loadState: parentPostComments.loadState,
                    }
                }
            }
            break
        case PostActions.loadPost:
            switch (action.actionState) {
                case ActionState.EXECUTING:
                    updatePostWithParent(state.links, {
                        postId: action.postId,
                        loadState: LoadingStates.LOADING,
                    })
                    break
                case ActionState.SUCCESS:
                    if (action.post === undefined) {
                        updatePostWithParent(state.links, {
                            articleData: undefined,
                            postId: action.postId,
                            loadState: LoadingStates.LOADED,
                        })
                    } else {
                        updatePostWithParent(state.links, {
                            articleData: {
                                ...action.post!,
                                comments: undefined,
                            },
                            postId: action.postId,
                            loadState: LoadingStates.LOADED,
                        })
                    }

                    break
                case ActionState.ERROR:
                    updatePostWithParent(state.links, {
                        postId: action.postId,
                        loadState: LoadingStates.ERROR,
                    })
                    break
            }
            break
        case PostActions.addPost:
            switch (action.actionState) {
                case ActionState.EXECUTING:
                    action.post.postId = newPostId
                    newPostId++

                    updatePostWithParent(state.links, {
                        articleData: action.post,
                        postId: action.post.postId,
                        loadState: LoadingStates.ADDING,
                    })
                    break
                case ActionState.SUCCESS:
                    updatePostWithParent(state.links, {
                        articleData: action.post,
                        postId: action.post.postId,
                        loadState: LoadingStates.LOADED,
                    })
                    break
                case ActionState.ERROR:
                    updatePostWithParent(state.links, {
                        postId: action.post.postId,
                        loadState: LoadingStates.ERROR,
                    })
                    break
            }
            break
        case PostActions.editPost:
            switch (action.actionState) {
                case ActionState.EXECUTING:
                    updatePostWithParent(state.links, {
                        articleData: action.post,
                        postId: action.post.postId,
                        loadState: LoadingStates.EDITING,
                    })
                    break
                case ActionState.SUCCESS:
                    updatePostWithParent(state.links, {
                        articleData: action.post,
                        postId: action.post.postId,
                        loadState: LoadingStates.LOADED,
                    })
                    break
                case ActionState.ERROR:
                    updatePostWithParent(state.links, {
                        postId: action.post.postId,
                        loadState: LoadingStates.ERROR,
                    })
                    break
            }
            break
        case PostActions.deletePost:
            let loadedPost = state.links.get(action.postId)
            switch (action.actionState) {
                case ActionState.EXECUTING:
                    if (loadedPost !== undefined) {
                        state.links.set(loadedPost.postId, {...loadedPost, loadState: LoadingStates.REMOVING})
                    }
                    break
                case ActionState.SUCCESS:
                    recourseDelete(state.links, action.postId)

                    if (loadedPost?.articleData === undefined) {
                        break
                    }
                    let loadedParentPostWithState = state.links.get(loadedPost.articleData.parentPostId)
                    let parentPostComments = loadedParentPostWithState?.articleData?.comments
                    let parentPostCommentsData = parentPostComments?.data
                    if (parentPostCommentsData !== undefined) {
                        loadedParentPostWithState!.articleData!.comments = {
                            ...parentPostComments!,
                            data: parentPostCommentsData.filter((p) => p !== action.postId),
                        }
                    }

                    break
                case ActionState.ERROR:
                    if (loadedPost !== undefined) {
                        state.links.set(loadedPost.postId, {...loadedPost, loadState: LoadingStates.ERROR})
                    }
                    break
            }
            break
    }
    return {
        ...state,
        links: state.links,
    }

}


export const rootReducer = combineReducers({
    posts: postReducers,
})
