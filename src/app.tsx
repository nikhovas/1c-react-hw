import React, {useState} from 'react';

import PostComments from './components/posts/posts';
import styles from './app.module.scss';
import {getArticles} from "./loaders/articles";
import Sorting, {dateSort} from "./components/common/sorting/sorting";

function App() {
    let currentPostId = 200
    let newPostIdGetter = () => {
        currentPostId += 1
        return currentPostId
    }

    const [sorting, setSorting] = useState<string>(dateSort.value)

    return (
        <div className={styles.app}>
            <div className={styles.side}>
                <div className={styles.menu}>
                    <p>
                        There will be a menu
                    </p>
                </div>
            </div>
            <div className={styles.header}>
                <Sorting setSortingValue={setSorting} inputValue={sorting}/>
            </div>
            <div className={styles.appInternal}>
                <PostComments
                    parentPostId={0}
                    commentsGetter={getArticles}
                    newPostIdGetter={newPostIdGetter}
                    sorting={sorting}
                    currentDepth={0}
                    maxDepth={1}
                />
            </div>
        </div>
    );
}

export default App;
