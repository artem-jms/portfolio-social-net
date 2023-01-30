import React, {FC, PropsWithChildren} from 'react';
import classNames from "classnames";
import md from './ta.module.scss'
import {Label} from "../label/Label.component";

interface ITextArea {
    className?:string,
    value:string,
    onChange: React.Dispatch<React.SetStateAction<string>>,
    rows?: number,
    placeholder?: string,
    label?: string,
    error?: boolean,
}

export const TextArea : FC<ITextArea & Partial<HTMLTextAreaElement>> = (
    {
        className,
        value,
        onChange,
        rows,
        placeholder,
        label,
        error = false
    }) => {

    return (
        <section className={md.section}>
            <Label label={label} />
            <textarea
                placeholder={placeholder}
                rows={rows}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={classNames(className, md.textarea, {[md.errors]: error})}>
            </textarea>
        </section>
    );
};

