import React, {FC} from 'react';
import md from './cb.module.scss'
import {NEW_NOTE_ROUTE} from "../../utils/routes";

interface CircleButtonProps {
    img: string,
    alt: string,
    hint?: string,
}

export const CircleButton: FC<CircleButtonProps> = ({ img, alt, hint}) => {
    return (
        <div className={md.options}>
            <a href={NEW_NOTE_ROUTE} className={md.circle}>
                <img src={img} alt={alt} />
                {hint && <span>{hint}</span>}
            </a>
        </div>
    );
};

