import React from 'react';
import classnames from 'classnames'

export type ButtonSize = "sm" | "lg";
export type ButtonType = "primary" | "danger" | "default" | "link";

interface BaseButtonProps {
    className?:string
    disabled?: boolean
    size?:ButtonSize
    children?: React.ReactNode
    buttonType?:ButtonType
    href?:string
}

type ButtonHTMLAttributes = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorHTMLAttributes = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// ts Partial<T> 将里面的每个属性都变为可选值  ?: 
export type ButtonProps = Partial<ButtonHTMLAttributes & AnchorHTMLAttributes>
const Button: React.FC<ButtonProps>=(props)=>{

    const { 
        size, 
        children, 
        buttonType,
        disabled,
        href,
        className,
        ...restProps
    } = props

    const classes = classnames('btn',className,
        {
            [`btn-${buttonType}`]:buttonType,
            [`btn-${size}`]:size,
            'disabled': (buttonType === "link") && disabled
        },
    )
    if(buttonType === "link" && href){
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    }else{
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    buttonType: "default"
}

export default Button