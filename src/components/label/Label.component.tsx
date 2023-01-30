import React, {FC} from 'react';
import md from './label.module.scss'
interface LabelProps { label?:string; }

export const Label: FC<LabelProps> = ({ label }) => {
    if (!label) return null
    return (
        <label className={md.label}>{label}</label>
    );
};

