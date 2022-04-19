import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';


type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right'| 'zoom-in-bottom'
type TransitionProps = CSSTransitionProps & {	   
    animation?: AnimationName,	   
    children: React.ReactNode,
    wrapper?: boolean
}

const Transition: React.FC<TransitionProps> = (props) => {
    const { animation, className, children, wrapper, ...restProps } = props;

    return (
        <CSSTransition
            classNames={className?className:animation}
            {...restProps}
        >
            { wrapper? <div>{children}</div> : children }
            
        </CSSTransition>
    )
}

Transition.defaultProps = {
    appear:true,
    unmountOnExit: true
}
export default Transition