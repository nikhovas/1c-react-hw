import {connect} from "react-redux";

import styles from './posts.module.scss'
import NewPost from "./newPost/newPost";
import Post from "./post/post"
import {CommentsData, LoadingStates} from "../../structs/storedArticle";
import {startLoadComments} from "../../common/store/actions/posts";
import {PostsState} from "../../common/store/reducers/posts";

export interface WrappedPostCommentsProps {
    parentPostId: number
    currentDepth: number
    maxDepth: number
}

export interface WrappedPostCommentsPropsWithMappedState extends WrappedPostCommentsProps {
    comments?: CommentsData
}

export interface PostCommentsProps extends WrappedPostCommentsPropsWithMappedState {
    commentsGetter: () => void
}

function PostComments(
    {parentPostId, comments, commentsGetter, currentDepth, maxDepth}: PostCommentsProps
) {
    if (comments === undefined) {
        commentsGetter!()
    }

    if (comments === undefined) {
        return (
            <div className={styles.blockUpperSeparator}>
                Объекты загружаются
            </div>
        )
    }
    switch (comments?.loadState) {
        case LoadingStates.LOADING:
            return (
                <div className={styles.blockUpperSeparator}>
                    Объекты загружаются
                </div>
            )
        case LoadingStates.ERROR:
            return (
                <div className={styles.blockUpperSeparator}>
                    Произошла ошибка
                </div>
            )
        case LoadingStates.LOADED:
            return (
                <div className={styles.comments}>
                    {
                        comments.data!.map(comment => <Post
                            key={comment}
                            postId={comment}
                            extendedMode={false}
                            currentDepth={currentDepth}
                            maxDepth={maxDepth}
                        />)
                    }
                    <NewPost parentPostId={parentPostId}/>
                </div>
            )
        default:
            return (
                <div className={styles.blockUpperSeparator}>
                    Необработанное состояние
                </div>
            )
    }
}

const mapStateToProps = (state: { posts: PostsState }, props: WrappedPostCommentsProps) => ({
    comments: state.posts.links.get(props.parentPostId)?.articleData?.comments,
})

const mapDispatchToProps = (dispatch: any, props: WrappedPostCommentsPropsWithMappedState) => ({
    commentsGetter: () => dispatch(startLoadComments(props.parentPostId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostComments)
