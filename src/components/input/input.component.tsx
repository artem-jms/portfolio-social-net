import React, {FC, forwardRef, ForwardRefRenderFunction} from 'react';
import classNames from "classnames";
import md from './input.module.scss'

interface IInput {
    className?:string,
    value: string,
    onChange: React.Dispatch<React.SetStateAction<string>>,
    onFocus?: React.FocusEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>,
    label?: string,
    limit?: number,
    removeClose?:boolean,
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
    {
        className,
        value,
        onChange,
        onBlur,
        onFocus,
        label,
        removeClose= false,
        limit,
    },
    ref
) => {


    return (
         <section className={md.inputs}>
            {label && <label className={md.label}>{label}</label>}
             <input
                 onChange={e => onChange(e.target.value)}
                 onFocus={onFocus}
                 onBlur={onBlur}
                 value={value}
                 className={classNames(className, md.input)}
                 maxLength={limit}
                 ref={ref}
             />
            <button
                onClick={() => {
                    if (value.length > 0) onChange('')
                }}
                disabled={(value.length === 0 || removeClose)} className={classNames(md.close)}>&#x2715;</button>
        </section>
    );
};

export const Input = forwardRef(InputComponent)
