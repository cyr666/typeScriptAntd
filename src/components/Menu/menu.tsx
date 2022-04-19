import React, { createContext, useState } from 'react';
import classnames from 'classnames';
import { MenuItemProps  } from './menuItem'

type MenuMode = 'horiznotal' | 'vertical'
type selectCallBack = (selectedIndex: string)=>void
export interface menuProps {
    defaultIndex?: string,
    className?: string,
    style?: React.CSSProperties,
    children?: React.ReactNode,
    mode?: MenuMode,
    onSelect?: selectCallBack,
    defaultOpenKeys?: string[]
}

interface IMenuContext {
    index: string,
    onSelect: selectCallBack, //之所以必传 是因为需要让当前点击的li为高亮显示 这个条件是必须的
    mode?: MenuMode,
    defaultOpenKeys?: string[]
}
export const menuContext = createContext<IMenuContext>({index:'0',onSelect:()=>{}})

const Menu: React.FC<menuProps> = (props) => {
    const {defaultIndex,className,style,children, mode, onSelect, defaultOpenKeys} = props;
    const [currentIndex, setActive] = useState(defaultIndex)
    const classes = classnames('menu',className, {
        [`menu-${mode}`]: mode
    })

    const handleClick = (slectedIndex: string) => {
        setActive(slectedIndex)
        if(onSelect){
            onSelect(slectedIndex)
        }
    }
    const passedContext: IMenuContext =  {
        index: currentIndex ? currentIndex : '0',
        onSelect: handleClick,
        mode,
        defaultOpenKeys
    }
    const renderChildren = () => {
        return React.Children.map(children,(child,index)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if(displayName === 'MenuItem' || displayName === 'submenu' ){
                return React.cloneElement(childElement,{index:index.toString()})
            }else{
                console.log('warning')
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <menuContext.Provider value={passedContext}>
                {renderChildren()}
            </menuContext.Provider>
        </ul>
    )
}
Menu.defaultProps={
    defaultIndex: '0',
    mode: 'horiznotal',
    defaultOpenKeys: [],
}
export default Menu
