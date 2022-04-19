import React from 'react';
import { cleanup, fireEvent, render, RenderResult, waitFor } from'@testing-library/react';
import Menu, {menuProps} from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const testProps: menuProps = {
    defaultIndex: "0",
    onSelect: jest.fn(),
    className:'test'
}
const testVerProps: menuProps = {
    defaultIndex: "0",
    mode: 'vertical',
    onSelect: jest.fn(),
    defaultOpenKeys:['3']
}

const generateMenu = (props:menuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem>
                test
            </MenuItem>
            <SubMenu title='dropdown'>
                <MenuItem>drop1</MenuItem>
                <MenuItem>drop2</MenuItem>
                <MenuItem>drop3</MenuItem>
            </SubMenu>
        </Menu>
    )
}
const cssStyle = () => {
    const style:string =`
        .viking-submenu{
            display: none
        }
        .viking-submenu.menu-open{
            display: block
        }
    `
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = style
    return styleElement
}
let wrapper:RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('this is menu test',()=>{
    //每个case开始之前都会执行
    beforeEach(()=>{
        wrapper = render(generateMenu(testProps))
        wrapper.container.appendChild(cssStyle())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement =  wrapper.getByText('disabled')
    })
    //在默认的props下会不会返回一个正确的menu组件
    it('should return a correct menu and menuItem base on default props',()=>{
        expect(menuElement).toBeInTheDocument();//菜单是否存在在document上
        expect(menuElement).toHaveClass('menu-horiznotal test')
        // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(menuElement.querySelectorAll(':scope>li').length).toEqual(4)
        expect(activeElement).toHaveClass('menuItem is-active')
        expect(disabledElement).toHaveClass('menuItem is-disabled')
    })
    //当点击menuItem时高亮是不是显示正确
    it('click items should change active and call the right callback',()=>{
        const thirdElement = wrapper.getByText('test')
        fireEvent.click(thirdElement)
        expect(thirdElement).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    //当mode为vertical时是不是返回正确的Menu
    it('should render vertical mode when mode is set to vertical',()=>{
        cleanup()
        const wrapper = render(generateMenu(testVerProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    //当mode为默认状态下时测试submenu的功能
    it('should show dropdown item when hover on submenu',async ()=>{
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)
        await waitFor(()=>{
            expect(wrapper.queryByText('drop1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await waitFor(()=>{
            expect(wrapper.queryByText('drop1')).not.toBeVisible()
        })
    })
    it('should show dropdown item when mode is set to vertical',()=>{
        cleanup()
        const wrapper = render(generateMenu(testVerProps))
        wrapper.container.appendChild(cssStyle())
        expect(wrapper.queryByText('drop1')).toBeVisible()
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testVerProps.onSelect).toHaveBeenCalledWith('3-0')
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.click(dropdownElement)
        expect(wrapper.queryByText('drop1')).not.toBeVisible() 
    })
})