import React from 'react';
import styles from './app.module.scss';
import postsFile from './asserts/data.json'
import Post, {PostData} from './components/post/post'

function App() {
    let posts: PostData[] = postsFile as PostData[];

    const likeCallback = function (key: number) {
        console.log(key)
        for (let i = 0; i < posts.length; i++) {
            let elem = posts[i];
            if (elem.id === key) {
                elem.isLiked = !elem.isLiked
                if (elem.isLiked) {
                    elem.currentLikes += 1
                } else {
                    elem.currentLikes -= 1
                }
            }
            posts[i] = elem
            break
        }
        console.log(posts)
    }

    return (
        <div className={styles.app}>
            <div className={styles.side}>
                <div className={styles.menu}>
                    <p>
                        There will be a menu
                    </p>
                </div>
            </div>
            <div className={styles.appInternal}>
                {posts.map(post => (
                    <Post postData={post} likeCallback={likeCallback} key={post.id}></Post>
                ))}
            </div>
        </div>
    );
}

export default App;
