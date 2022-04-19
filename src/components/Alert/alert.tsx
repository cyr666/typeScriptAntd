import React, {useState} from 'react';
import classnames from 'classnames';
import Transition from '../Transition/transition';

export type AlertType = 'success' | 'warning' | 'info' | 'error'

export interface BaseAlertProps{
    alertType?: AlertType,
    showIcon?: boolean,
    className?: string,
    children?: React.ReactNode,
    title?: React.ReactNode,
    onClose?: () => boolean
}

const Alert: React.FC<BaseAlertProps> = (props) => {

    const [showAlert, setShowAlert] = useState(true)
    const { alertType, showIcon, className, children, title } = props;

    const classes = classnames('alert',className,{
        [`alert-${[alertType]}`]:alertType
    })

    // if(showAlert){
    //     return (
            
    //      )
    // }else{
    //     return <></>
    // }

    return <Transition in={showAlert} timeout={300} animation='zoom-in-left'><div className = {classes}>
        {
            showIcon ? <span className='closeIcon' onClick={()=>setShowAlert(false)}>关闭</span> : ''
        }
        {
            title ? <div className='alert-title'> {title} </div> : ""
        }
        {children} 
    </div></Transition>
}

Alert.defaultProps = {
    alertType: 'info',
    showIcon: true
}

export default Alert
