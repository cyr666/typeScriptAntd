import React, { ChangeEvent, InputHTMLAttributes, ReactElement, useState } from 'react';
import { IconProp  } from '@fortawesome/fontawesome-svg-core';
import classnames from 'classnames';
import Icon from '../Icon/icon';


type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
    disabled?: boolean;
    size?: InputSize;
    className?: string;
    icon?: IconProp;
    prepand?: string | ReactElement;
    append?: string | ReactElement;
    onChange?: (e:ChangeEvent<HTMLInputElement>)=>void;
    value?:any;
    placeholder?: string;
}

const Input: React.FC<InputProps> = (props) => {
    const { disabled, size, className, icon, prepand, append, children, value, onChange, placeholder } = props
    const classes = classnames('input',className,{
        [`input-${size}`]: size,
        'disabled': disabled,
        'icon-con': icon !== undefined,
        'append-con': append
    })
    const handleChange = (e:any) => {
        if(onChange){
            onChange(e)
        }
    }
    return (
        <div className = {classes}>
            <input 
                disabled={disabled}
                onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e)}
                value={value}
                placeholder={placeholder}
            />
            {
                icon ? <span className='input-icon'><Icon icon={icon}/></span> : ''
            }  
        </div>
        
    )
}

export default Input