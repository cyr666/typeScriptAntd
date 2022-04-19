import React, { SyntheticEvent, useState,useContext } from 'react';
import classnames from 'classnames';
import { menuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

export interface SubMenuProps {
    index?: string,
    className?:string;
    title:String;
}

const SubMenu: React.FC<SubMenuProps> = ({index,className,title,children}) => {
    const context = useContext(menuContext);
    const openSubMenus = context.defaultOpenKeys as Array<string>
    const isOpen = index && context.mode==='vertical' ? openSubMenus.includes(index) : false
    const [ menuOpen, setOpen ] = useState(isOpen);
    const classes = classnames('menu-item submenu-item menuItem',{
        'is-active': context.index===index,
        'is-opened': menuOpen,
        'is-vertical': context.mode==='vertical'
    })

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }
    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(()=>{
            setOpen(toggle)
        },300)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    }: {}

    const hoverEvent = context.mode === 'horiznotal' ? {
        onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
    }: {}
    const renderChildren = () => {
        const subMenuClasses = classnames('viking-submenu',{
            'menu-open':menuOpen
        })
        const element = React.Children.map(children,(child,i)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if(displayName === 'MenuItem'){
                return React.cloneElement(childElement,{
                    index: `${index}-${i}`
                })
            }else{
                console.log('warning')
            }
        })
        return (
            <Transition
                timeout={300}
                animation = 'zoom-in-left'
                in = {menuOpen}
            >
                <ul className={subMenuClasses}>
                    {element}
                </ul>
            </Transition>
        )
    }

    return (
        <li key={index} className={classes} {...hoverEvent}>
            <div className='submenu-title' onClick={handleClick} {...clickEvents}>
                {title}
                <Icon icon='angle-down' className='arrow-icon'/>
            </div>
            {renderChildren()}
        </li>
    )
}


SubMenu.displayName = 'submenu'

export default SubMenu