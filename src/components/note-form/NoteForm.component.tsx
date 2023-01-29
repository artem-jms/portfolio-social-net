import React, {useState} from 'react';
import md from './nf.module.scss'
import {Input} from "../input/input.component";
import {TagInput} from "../tag-input/TagInput.component";
import {TextArea} from "../text-area-input/TextArea.component";

export interface ITag {
    title: string
}

export const NoteForm = ({}) => {

    const [title, setTitle] = useState<string>('')
    const [tag, setTag] = useState<ITag[]>([])
    const [body, setBody] = useState<string>('')

    return <form className={md.form}>
        <div className={md.column}>
            <div className={md.item}>
                <Input
                    label={'Title'}
                    onChange={setTitle}
                    value={title} />
            </div>
            <div className={md.item}>
                <TagInput
                    label={'Tags'}
                />
            </div>
        </div>
        <div className={md.column}>
            <TextArea
                value={body} onChange={setBody}
            />
        </div>
    </form>
};

