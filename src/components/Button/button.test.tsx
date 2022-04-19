import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './button'

const defaultProps = {
    onClick: jest.fn(),
}

const testProps: ButtonProps = {
    buttonType: "primary",
    size: "lg",
    className: 'kkk'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn(),
}

describe('test Button component', () => {
    it('should render the correct Button',() => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement //类型断言  可以调用属于button上面的所有属性
        expect(element).toBeInTheDocument();//按钮是否存在在document上
        expect(element.tagName).toEqual('BUTTON')
        expect(element.disabled).toBeFalsy() //disabled属性应该为false
        expect(element).toHaveClass('btn btn-default')
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()//用来判断一个函数是否被调用过
    })

    it('should return Button when have props',()=>{
        const wrapper = render(<Button {...testProps}>primary</Button>)
        const element = wrapper.getByText('primary')
        expect(element).toBeInTheDocument();//按钮是否存在在document上
        expect(element).toHaveClass('btn btn-primary btn-lg kkk')
    })

    it('should return Button when buttonType is Link and href is proved', ()=>{
        const wrapper = render(<Button buttonType="link" href="http://dummayUrl" {...defaultProps}>primary</Button>)
        const element = wrapper.getByText('primary')
        expect(element).toBeInTheDocument();//按钮是否存在在document上
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()//用来判断一个函数是否被调用过
    })
    it('should return DisabledButton when disabled is true',()=>{
        const wrapper = render(<Button {...disabledProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement //类型断言  可以调用属于button上面的所有属性
        expect(element).toBeInTheDocument();//按钮是否存在在document上
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element)
        expect(defaultProps.onClick).not.toHaveBeenCalled()//用来判断一个函数是否被调用过
    })
})