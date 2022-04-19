import React from 'react';
import classnames from 'classnames';

export interface TabPineProps {
    index?: number,
    tab: string,
    className?: string,
    style?: React.CSSProperties,
    children?: React.ReactNode
} 

const TabPine: React.FC<TabPineProps> = (props) => {
    const { index, tab, className, style, children } = props;
    const classes = classnames('tabheader',{

    })
    return (
        <>
            <span className={classes}>{tab}</span>
            <div>{children}</div>
        </>
    )
}
TabPine.displayName = 'TabPine'
export default TabPine