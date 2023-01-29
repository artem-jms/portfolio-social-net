import React, {FC, ReactNode} from 'react';
import classNames from "classnames";

interface ITextArea {
    className?:string,
    value:string,
    onChange: React.Dispatch<React.SetStateAction<string>>,
}

export const TextArea : FC<ITextArea> = ({
    className,
    value,
    onChange
}) => {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={classNames(className)}>
        </textarea>
    );
};

