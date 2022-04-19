import React, {useState} from 'react';
import {TabPineProps} from './tabpane'

type selectCallBack = (index:number)=>void
export interface tabProps {
    defaultActiveKey?: number,
    onSelect?: selectCallBack,
    children?: React.ReactNode,
    className?: string,
    style?: React.CSSProperties,
    index?: number,
} 

const Tab: React.FC<tabProps> = (props) => {
    const { defaultActiveKey, onSelect, children, className, style } = props
    const [tabHeader, setTabHeader] = useState([])
    const renderChildren = () => {
        return React.Children.map(children,(child,index)=>{
            const childElement = child as React.FunctionComponentElement<tabProps>
            const { displayName } = childElement.type
            if(displayName === 'tabpine'){
                return React.cloneElement(childElement,{index})
            }else{
                console.log('warning')
            }
        })
    }
    const renderTabHeader = () => {

        return React.Children.map(children,(child,index)=>{
           
        })
    }
    return (
        <div>
            <div className='tabheader'>
                {renderTabHeader()}
            </div>
            {renderChildren()}
        </div>
    )
}

export default Tab