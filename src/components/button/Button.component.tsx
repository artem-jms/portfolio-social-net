import React, {FC} from 'react';
import classNames from "classnames";
import md from './button.module.scss'

export enum ButtonTypes { 'default' = "DEFAULT", 'cancel'= "CANCEL", 'confirm' = "CONFIRM", circle = "CIRCLE" }
interface ButtonProps {
    buttonType: ButtonTypes,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    child?: string
}


export const Button: FC<ButtonProps & Partial<HTMLButtonElement>> = (
    {
        buttonType,
        onClick,
        child,
        children,
        ...props
    }
) => {


    return (
        <button
            onClick={onClick}
            className={classNames(
                props.className,
                md.button,
                {[md.confirm]: buttonType === ButtonTypes.confirm},
                {[md.cancel]: buttonType === ButtonTypes.cancel},
                {[md.circle]: buttonType === ButtonTypes.circle},
            )}>
            {child}
        </button>
    );
};

