import React, {useEffect, useState} from 'react';
import md from './nf.module.scss'
import {Input} from "../input/input.component";
import {TagInput} from "../tag-input/TagInput.component";
import {TextArea} from "../text-area-input/TextArea.component";
import {Button, ButtonTypes} from "../button/Button.component";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";

export interface ITag {
    title: string
}

export const NoteForm = ({}) => {

    const [title, setTitle] = useState<string>('')
    const [tag, setTag] = useState<ITag[]>([])
    const [body, setBody] = useState<string>('')
    const navigate = useNavigate()
    const [errors, setErrors] = useState({title: false, body: false})

    const validate = () => {
        setErrors({title: !(title.toLowerCase().length > 0), body: !(body.toLowerCase().length > 0)})
        console.log({title: !(title.toLowerCase().length > 0), body: !(body.toLowerCase().length > 0)})
        if (title.toLowerCase().length > 0 && body.toLowerCase().length > 0) {
            console.log({
                title: title,
                body: body,
                tags: tag
            })
        }
    }

    const back = () => {
        navigate('/')
    }

    return <form className={md.form}>
        <div className={md.column}>
            <Input
                error={errors.title}
                placeholder={'Note title'}
                label={'Title'}
                onChange={(value) => {
                    if (value.length > 0) setErrors({...errors, title: false})
                    setTitle(value)
                }}
                value={title} />
            <TagInput
                tags={tag} setTags={setTag}
                label={'Tags'}
            />
        </div>
        <div className={md.text__area}>
            <TextArea
                error={errors.body}
                placeholder={'Describe body text'}
                rows={15}
                maxLength={1500}
                value={body}
                onChange={(value) => {
                    if (value.length > 0) setErrors({...errors, body: false})
                    setBody(value)
                }}
            />
        </div>
        <div className={md.buttons}>
            <Button
                onClick={(e) => {
                    e.preventDefault()
                    validate()
                }}
                buttonType={ButtonTypes.confirm}
                child={'Confirm'}
            />
            <Button
                onClick={(e) => {
                    e.preventDefault()
                    back()
                }}
                buttonType={ButtonTypes.default}
                child={'Cancel'}
            />
        </div>
    </form>
};

