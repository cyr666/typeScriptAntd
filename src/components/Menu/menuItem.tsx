import React, { SyntheticEvent, useContext } from 'react';
import classnames from 'classnames';
import { menuContext } from './menu'

export interface MenuItemProps {
    index?: string,
    disabled?:boolean;
    className?:string;
    style?:React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {disabled,className,style, children,index} = props;
    const context = useContext(menuContext)
    const classes = classnames('menuItem',className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    })

    const handleClick = (event:SyntheticEvent) => {
        event.stopPropagation( )
        if(!disabled && (typeof index === 'string')) {
            context.onSelect(index)
        }
    }
    return (
        <li className={classes} style={style} onClick={(event)=>handleClick(event)}>
            {children}
        </li>
    )
}
MenuItem.displayName = 'MenuItem'
export default MenuItem