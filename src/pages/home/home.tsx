import React, {FC, useState} from 'react';
import md from './home.module.scss'
import classNames from "classnames";
import {ITag} from "../../components/note-form/NoteForm.component";
import {Post} from "../../components/post/Post.component";
import feather from '../../assets/feather.svg'
import {TodoState,  usePostsStore} from "../../main";
import {CircleButton} from "../../components/circle-button/CircleButton";

export interface IPost {
    title: string
    tags: ITag[]
    body: string
    id: string,
}

export const Home: FC = () => {

    const [selected, setSelected] = useState(true)
    const [subscribedPosts, setSubscribedPosts] = useState<IPost[]>([])
    const posts = usePostsStore((state: TodoState) => state.posts)

    return (
        <div className={md.wrapper}>
            <section className={md.header}>
                <div className={md.header}>
                    <button
                        onClick={() => setSelected(true)}
                        className={classNames(md.selectable, {[md.active]: selected})}>
                        <div>For you</div>
                        <span />
                    </button>
                    <button
                        onClick={() => setSelected(false)}
                        className={classNames(md.selectable, {[md.active]: !selected})}>
                        <div>Subscribed</div>
                        <span />
                    </button>
                </div>
                <CircleButton alt={'feather'} img={feather} hint={'Create new post'} />
            </section>
            <section className={md.posts}>
                {selected
                ? posts.map((value, index) => <Post
                    key={value.id}
                    title={value.title}
                    tags={value.tags}
                    body={value.body}
                    id={value.id}/>
                )
                : subscribedPosts.map((value, index) => <Post
                    key={value.id}
                    title={value.title}
                    tags={value.tags}
                    body={value.body}
                    id={value.id}/>
                )}
            </section>
        </div>
    );
};