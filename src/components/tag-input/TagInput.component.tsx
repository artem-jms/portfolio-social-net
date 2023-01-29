import React, {createRef, FC, forwardRef, useEffect, useRef, useState} from 'react';
import {Input} from "../input/input.component";
import {useDispatch} from "../../hooks/useDispatch";
import md from './ti.module.scss'
import {ITag} from "../note-form/NoteForm.component";
import classNames from "classnames";



interface ITagInput {
    className?: string,
    label?: string,
    [propName: string]: any,
}

export const TagInput: FC<ITagInput> = (
    {
        label,
        className
    }) => {

    const [input, setInput] = useState<string>('')
    const [tags, setTags] = useState<ITag[]>([{title: '123'}])
    const { dispatchValue } = useDispatch(input, 150)
    const [available, setAvailable] = useState<ITag[]>([
        { title: 'Popular tag 1' },
        { title: 'Popular tag 2' },
        { title: 'Popular tag 3' },
        { title: 'Popular tag 4' },
        { title: 'Popular tag 5' },
        { title: 'Popular tag 6' },
        { title: 'Popular tag 7' },
        { title: 'Popular tag 8' },
        { title: 'Popular tag 9' },
    ])

    const filterOn = (value: ITag) => {
        const filtered = available.map((item) => {
            if (!tags.includes(item)) return item
        })
        const filteredCondition = filtered.includes(value)
        if (dispatchValue.toLowerCase() === '' && filteredCondition) return value
        const searchCondition = value.title.toLowerCase().includes(dispatchValue.toLowerCase())
        if (searchCondition && filteredCondition) return value
    }

    const clearAll = () => setTags([])

    const addTag = (tag: ITag) => {
        const _tags = [...tags]
        _tags.push(tag)
        setTags(_tags)
        setInput('')
    }

    const addOwn = () => {
        if (input === '') return
        const _tags = [...tags]
        _tags.push({title: input})
        setTags(_tags)
        setInput('')
        setActive(false)
    }

    const removeTag = (tag: ITag) => {
        setTags(tags.filter(_tag => {
            return _tag !== tag
        }))
    }

    const [active, setActive] = useState(false)

    const inputRef = createRef<HTMLInputElement>()
    const fieldRef = createRef<HTMLButtonElement>()

    return (
        <section className={md.inputs}>
            {label ? <label className={md.label}>{label}</label> : null}
            <button
                ref={fieldRef}
                onClick={e => {
                e.preventDefault()
                if (inputRef.current && e.target === fieldRef.current) inputRef.current.focus()
            }}
                    onFocus={() => setActive(true)}
                    onBlur={() => setActive(false)}
                    className={md.input}>
                {tags.map((tag) => {
                    return <div className={md.tag}>
                        {tag.title}
                        <span
                            onClick={() => removeTag(tag)}
                            className={classNames(md.close, md.close__tag)}>&#x2715;</span>
                    </div>
                })}
                <Input
                    value={input}
                    onChange={setInput}
                    onFocus={() => setActive(true)}
                    className={classNames(className, md.input_)}
                    limit={20}
                    removeClose={true}
                    ref={inputRef}
                />
                <span onClick={e => e.preventDefault()} className={classNames(md.modal, {[md.modalActive]: active})}>
                    {available.filter(filterOn).length > 0 ? available.filter(filterOn).map((item, index) => {
                        return <div
                            className={md.item}
                            onClick={e => {
                                e.preventDefault()
                                addTag(item)
                            }}
                            key={index}>
                            {item.title}
                        </div>
                    }) : dispatchValue.length > 0 && <div
                        onClick={e => {
                            e.preventDefault()
                            addOwn()
                        }}
                        className={md.item}>Создать свой</div>}
                </span>
                <button
                    onClick={clearAll}
                    disabled={!(tags.length > 0)} className={md.close}>&#x2715;</button>
            </button>
        </section>
    );
};

