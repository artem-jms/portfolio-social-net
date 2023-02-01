import React, {createRef, FC, useEffect, useState} from 'react';
import {IPost} from "../../pages/home/home";
import md from './post.module.scss'
import classNames from "classnames";
import {usePostsStore} from "../../main";
interface PostProps extends IPost {}

export const Post: FC<PostProps> = ({ body, tags, title, id }) => {

    const mouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (post.current && collider.current) {
            const boxShadowOffset = 50
            const localX = e.clientX - post.current.offsetLeft - boxShadowOffset;
            const localY = e.clientY - post.current.offsetTop - boxShadowOffset;
            collider.current.style.left = localX + 'px'
            collider.current.style.top = localY + 'px'
        }
    }

    const maxLength = 300
    const collider = createRef<HTMLSpanElement>()
    const post = createRef<HTMLDivElement>()
    const [showAll, setShowAll] = useState<boolean>(false)
    const fit = (value: string) => value.slice(0, maxLength)
    const condition = body.length > 50 && !showAll
    const [modal, setModal] = useState(false)
    const {posts, setPosts} = usePostsStore(state => state)

    const deletePost = (id: string) => {
        setPosts(posts.filter(_ => {
            return _.id !== id
        }))
    }

    return (
        <>
            <div
                ref={post}
                onMouseMove={mouseMove}
                className={md.post}>
                <span ref={collider} className={md.collider}/>
                <div className={md.content}>
                    <a className={md.author}>@author</a>
                    <div className={md.header}>
                        <div className={md.title}>{title}</div>
                        <div className={md.tags}>{tags.map((tag, index) => {
                            return <div key={index} className={md.tag}>{tag.title}</div>
                        })}
                        </div>
                    </div>
                    <div className={md.body}>
                        {!showAll ? fit(body) : body}
                        {condition && <span onClick={() => setShowAll(!showAll)}
                                            className={md.showAll}> . . .</span>}
                    </div>
                </div>
                <div className={md.content_}>
                    <button
                        onBlur={() => setModal(false)}
                        onClick={() => setModal(!modal)} className={md.options}>
                        <span />
                        <span />
                        <span />
                        <div className={classNames(md.optionsWrapper, {[md.optionsWrapperActive]: modal})}>
                            <div
                                onClick={(e) => {
                                    e.preventDefault()
                                    deletePost(id)
                                }}
                                className={classNames(
                                    md.optionsDelete,
                                    {[md.optionsDeleteActive]: modal}
                                )}>&#x2715;</div>
                        </div>
                    </button>
                </div>
            </div>

        </>
    );
};

