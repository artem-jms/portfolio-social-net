import React, {createRef, FC, useState} from 'react';
import {Input} from "../input/input.component";
import {useDispatch} from "../../hooks/useDispatch";
import md from './ti.module.scss'
import {ITag} from "../note-form/NoteForm.component";
import classNames from "classnames";
import {Label} from "../label/Label.component";
import {v4 as id_} from 'uuid'
interface ITagInput {
    className?: string,
    label?: string,
    tags: ITag[],
    setTags:  React.Dispatch<React.SetStateAction<ITag[]>>,
    maxTags?: number,
}

export const TagInput: FC<ITagInput> = (
    {
        tags,
        setTags,
        label,
        className,
        maxTags = 3
    }) => {

    const [input, setInput] = useState<string>('')
    const { dispatchValue } = useDispatch(input, 150)
    const [available] = useState<ITag[]>([
        { title: 'Cherry', id: id_() },
        { title: 'Popular', id: id_() },
        { title: 'Goat', id: id_() },
        { title: 'Persisting', id: id_() },
        { title: 'Hydration', id: id_() },
        { title: 'Comparison', id: id_() },
        { title: 'Testing', id: id_() },
        { title: 'Map', id: id_() },
        { title: 'Slices', id: id_() },
    ])

    const filterOn = (value: ITag) => {
        const filtered = available.map((item) => {
            if (!tags.includes(item)) return item
        })
        const filteredCondition = filtered.includes(value)
        if (dispatchValue.toLowerCase() === '' && filteredCondition) return value
        const searchCondition = value.title.replaceAll(' ', '').toLowerCase().includes(dispatchValue.replaceAll(' ', '').toLowerCase())
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
        if (input.replaceAll(' ', '') === '') return
        const _tags = [...tags]
        _tags.push({title: input, id: id_()})
        setTags(_tags)
        setInput('')
        setActive(false)
    }

    const removeTag = (tag: ITag) => {
        setTags(tags.filter(_tag => {
            return _tag.id !== tag.id
        }))
    }

    const [active, setActive] = useState(false)

    const inputRef = createRef<HTMLInputElement>()
    const fieldRef = createRef<HTMLButtonElement>()

    return (
        <section className={md.inputs}>
            <Label label={label} />
            <button
                ref={fieldRef}
                onClick={e => {
                e.preventDefault()
                if (inputRef.current && e.target === fieldRef.current) inputRef.current.focus()
            }}
                    onFocus={() => setActive(true)}
                    onBlur={() => setActive(false)}
                    className={classNames(md.input, {[md.input__disabled]: tags.length >= maxTags})}>
                {tags.map((tag, index) => {
                    return <div className={md.tag} key={index}>
                        {tag.title}
                        <span
                            onClick={() => removeTag(tag)}
                            className={classNames(md.close, md.close__tag)}>&#x2715;</span>
                    </div>
                })}
                <Input
                    disabled={tags.length >= maxTags}
                    placeholder={tags.length < maxTags ? 'Add tags' : ''}
                    value={input}
                    onChange={setInput}
                    onFocus={() => setActive(true)}
                    className={classNames(className, md.input_)}
                    limit={20}
                    removeClose={true}
                    ref={inputRef}
                />
                <span onClick={e => e.preventDefault()} className={classNames(md.modal, {[md.modalActive]: active})}>
                    {
                        tags.length >= maxTags
                        ? <div className={classNames(md.item, md.item__disabled)}>You can't add more than {maxTags} tags</div>
                        : available.filter(filterOn).length > 0
                                ? <>
                                    {dispatchValue.replaceAll(' ', '').length > 0 && <div
                                        onClick={addOwn}
                                        className={md.item}>Create tag: "{dispatchValue}"</div>}
                                    {available.filter(filterOn).map((item) => {
                                        return <div
                                            className={md.item}
                                            onClick={e => {
                                                e.preventDefault()
                                                addTag(item)
                                            }}
                                            key={item.id}>
                                            {item.title}
                                        </div>
                                    })}
                                </>
                                : dispatchValue.replaceAll(' ', '').length > 0 && <div
                                    onClick={e => {
                                        e.preventDefault()
                                        addOwn()
                                    }}
                                    className={md.item}>
                                Create tag: "{input}"
                        </div>
                    }
                </span>
                <span
                    onClick={clearAll}
                    className={classNames(md.close, {[md.closed]: !(tags.length > 0)})}>&#x2715;</span>
            </button>
        </section>
    );
};

