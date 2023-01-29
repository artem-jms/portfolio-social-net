import React, {FC, PropsWithChildren} from 'react';
import classNames from "classnames";
export enum TContainer { 'default', 'wrapper' }

interface IContainer {
    type?: TContainer,
    className?: string
}

export const Container: FC<PropsWithChildren<IContainer>> = (
    {
        children,
        className,
        type
    }) => {

    const containerClassNames = classNames(className, {['wrapper']: type === TContainer.wrapper})

    return (
        <div className={containerClassNames}>
            {children}
        </div>
    );
};

