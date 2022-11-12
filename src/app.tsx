import React from 'react';
import {connect, Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import {Navigate, Route, Routes} from 'react-router-dom'

import PostComments from './components/posts/posts';
import styles from './app.module.scss';
import Sorting from "./components/common/sorting/sorting";
import {PostsState, rootReducer} from "./common/store/reducers/posts";
import {RouterPost} from "./components/posts/post/post";
import {startSortComments} from "./common/store/actions/posts";
import {Sorting as TSorting} from "./structs/storedArticle";


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [],
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

interface ArticlesProps {
    setSorting: (sorting: TSorting) => void
    sorting: TSorting
}

function Articles({setSorting, sorting}: ArticlesProps) {
    return (<div>
        <div className={styles.header}>
            <Sorting setSortingValue={setSorting} inputValue={sorting}/>
        </div>
        <PostComments
            parentPostId={0}
            currentDepth={0}
            maxDepth={1}
        />
    </div>)
}

const mapStateToProps = (state: { posts: PostsState }, props: {}) => ({
    sorting: state.posts.links.get(0)!.articleData!.comments?.sorting ?? TSorting.BY_DATE,
})

const mapDispatchToProps = (dispatch: any, props: {}) => ({
    setSorting: (sorting: TSorting) => dispatch(startSortComments(0, sorting)),
})

const WrappedArticles = connect(mapStateToProps, mapDispatchToProps)(Articles)

function App() {
    return (
        <Provider store={store}>
            <div className={styles.app}>
                <div className={styles.side}>
                    <div className={styles.menu}>
                        <p>
                            There will be a menu
                        </p>
                    </div>
                </div>
                <div className={styles.appInternal}>
                    <Routes>
                        <Route path='/'>
                            <Route index path='/' element={<div>Main Page</div>}/>
                            <Route path='/article/:id' element={<RouterPost/>}/>
                            <Route path='/articles' element={<WrappedArticles/>}/>
                            <Route path='/404' element={<div>Not found</div>}/>
                            <Route path='*' element={<Navigate to='/'/>}/>
                        </Route>
                    </Routes>
                </div>
            </div>
        </Provider>
    );
}

export default App
