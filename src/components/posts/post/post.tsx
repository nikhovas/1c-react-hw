import {useState} from "react";
import classnames from "classnames/bind";
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";

import Like from "./like/like";
import styles from './post.module.scss'
import SmallText from "../elements/smallText/smallText";
import PostComments from "../posts";
import Paragraph from "../elements/paragraph/paragraph";
import Title from "../elements/title/title";
import Sorting from "../../common/sorting/sorting";
import {LoadingStates, PostWithComments, PostWithState, Sorting as TSorting} from "../../../structs/storedArticle";
import {startDeletePost, startEditPost, startGetPost, startSortComments} from "../../../common/store/actions/posts";
import {PostsState} from "../../../common/store/reducers/posts";

const cn = classnames.bind(styles)

export interface WrappedPostProps {
    postId: number
    extendedMode: boolean
    currentDepth: number
    maxDepth: number
}

export interface WrappedPostWithMappedStateProps extends WrappedPostProps {
    postData?: PostWithState
}

export interface PostProps extends WrappedPostWithMappedStateProps {
    deletePost: () => void
    editPost: (post: PostWithComments) => void
    loadPost: () => PostWithState
    setSorting: (sorting: TSorting) => void
}

function Post(
    {postData, deletePost, editPost, loadPost, setSorting, extendedMode, currentDepth, maxDepth}: PostProps
) {
    if (postData === undefined) {
        loadPost()
    }

    const [areCommentsShown, setAreCommentsShown] = useState<boolean>(false);
    let navigate = useNavigate();

    const likeCallback = (key: number) => editPost({
        ...postData!.articleData!,
        isLiked: postData!.articleData!.currentLikes < key,
        currentLikes: key,
    })

    const setText = (data: string) => editPost({
        ...postData!.articleData!,
        text: data,
    })

    const setTitle = (data: string) => editPost({
        ...postData!.articleData!,
        title: data,
    })

    if (postData?.articleData !== undefined) {
        let internalPost = postData!.articleData!

        let text = internalPost.text
        if (!extendedMode && text.length > 100) {
            text = text.substring(0, 97) + '...'
        }

        let indicatorButtonText = ''
        let indicatorButtonAction = () => {
        }
        switch (postData.loadState) {
            case LoadingStates.EDITING:
                indicatorButtonText = 'Изменение...'
                break
            case LoadingStates.REMOVING:
                indicatorButtonText = 'Удаление...'
                break
            case LoadingStates.ADDING:
                indicatorButtonText = 'Добавление...'
                break
            default:
                indicatorButtonText = 'Удалить'
                indicatorButtonAction = () => {
                    deletePost!()
                    if (extendedMode) {
                        navigate('/articles')
                    }
                }
        }

        return (
            <div key={internalPost.postId} className={cn('post', areCommentsShown ? ['postWithComments'] : [])}>
                {
                    internalPost.title !== "" && <Title initialText={internalPost.title} newTextCallback={setTitle}/>
                }
                <Paragraph initialText={text} newTextCallback={setText}/>
                <div className={styles.additionalInfo}>
                    <SmallText initialText={internalPost.creationDate}/>
                    <SmallText initialText={internalPost.author}/>
                </div>
                <div className={styles.buttons}>
                    <Like
                        count={internalPost.currentLikes}
                        id={internalPost.postId}
                        likeCallback={likeCallback}
                        isLiked={internalPost.isLiked}
                    />
                    <div className={styles.button} onClick={indicatorButtonAction}>
                        {indicatorButtonText}
                    </div>
                    {
                        currentDepth < maxDepth && !extendedMode &&
                        <Link to={`/article/${postData!.postId}`} className={styles.button}>
                            Открыть полностью
                        </Link>
                    }
                    {
                        currentDepth < maxDepth && extendedMode &&
                        <div className={styles.button} onClick={() => setAreCommentsShown(!areCommentsShown)}>
                            {areCommentsShown ? "Скрыть вложения" : "Показать вложения"}
                        </div>
                    }
                    {areCommentsShown && <Sorting setSortingValue={setSorting!}
                                                  inputValue={internalPost.comments?.sorting ?? TSorting.BY_DATE}/>}
                </div>
                {areCommentsShown &&
                    <PostComments
                        parentPostId={internalPost.postId}
                        currentDepth={currentDepth + 1}
                        maxDepth={maxDepth}
                    />
                }
            </div>
        )
    }

    switch (postData?.loadState) {
        case undefined:
        case LoadingStates.LOADING:
            return (
                <div className={styles.post}>
                    Загрузка
                </div>
            )
        case LoadingStates.ERROR:
            return (
                <div className={styles.post}>
                    Произошла ошибка
                </div>
            )
        case LoadingStates.LOADED:
            navigate('/404')
            break
    }

    return (
        <div className={styles.post}>
            Произошла неизвестная ошибка
        </div>
    )
}

const mapStateToProps = (state: { posts: PostsState }, props: WrappedPostProps) => ({
    postData: state.posts.links.get(props.postId)
})

const mapDispatchToProps = (dispatch: any, props: WrappedPostWithMappedStateProps) => ({
    loadPost: () => dispatch(startGetPost(props.postId)),
    editPost: (post: PostWithComments) => dispatch(startEditPost(post)),
    deletePost: () => dispatch(startDeletePost(props.postId)),
    setSorting: (sorting: TSorting) => dispatch(startSortComments(props.postId, sorting)),
})

const WrappedPost = connect(mapStateToProps, mapDispatchToProps)(Post)

export default WrappedPost

export const RouterPost = () => {
    const {id} = useParams();
    let nId = Number(id)

    return (<WrappedPost
        key={nId}
        postId={nId}
        extendedMode={true}
        currentDepth={0}
        maxDepth={1}
    />)
}
