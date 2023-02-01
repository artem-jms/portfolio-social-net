import React, {FC, forwardRef, ForwardRefRenderFunction} from 'react';
import classNames from "classnames";
import md from './input.module.scss'
import {Label} from "../label/Label.component";

interface IInput {
    className?:string,
    value: string,
    onChange: React.Dispatch<React.SetStateAction<string>>,
    onFocus?: React.FocusEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>,
    label?: string,
    limit?: number,
    removeClose?:boolean,
    placeholder?:string,
    error?:boolean
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, IInput & Partial<HTMLInputElement>> = (
    {
        className,
        value,
        onChange,
        onBlur,
        onFocus,
        label,
        removeClose= false,
        limit,
        placeholder,
        error= false,
        disabled,
    },
    ref
) => {

    return (
         <section className={md.inputs}>
             <Label label={label} />
             <input
                 disabled={disabled}
                 placeholder={placeholder}
                 onChange={e => onChange(e.target.value)}
                 onFocus={onFocus}
                 onBlur={onBlur}
                 value={value}
                 className={classNames(className, md.input, {[md.error]: error})}
                 maxLength={limit}
                 ref={ref}
             />
            <span
                onClick={() => {
                    if (value.length > 0) onChange('')
                }}
                className={classNames(
                    md.close,
                    {[md.closed]: (value.length === 0 || removeClose)},)}>
                &#x2715;
            </span>
        </section>
    );
};

export const Input = forwardRef(InputComponent)
