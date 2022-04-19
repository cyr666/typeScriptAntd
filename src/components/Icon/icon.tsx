import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps  } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas  } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames';

library.add(fas)

type themType = 'primary' | 'secondary' | 'success'| 'info'| 'warning'| 'danger'| 'light' | 'dark' 
export interface IconProps extends FontAwesomeIconProps {
    them? : themType,
    className?: string
}
const Icon: React.FC<IconProps> = (props) => {
    const { them, className, ...restProps } = props
    const classes = classnames('viking-icon',className,{
        [`icon-${them}`]: them
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps}/>
    )
}

export default Icon