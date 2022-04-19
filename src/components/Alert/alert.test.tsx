import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Alert,{AlertType,BaseAlertProps} from './alert';


const testProps:BaseAlertProps= {
    alertType: 'success',
    showIcon: true
}
describe('this is Alert Component test',()=>{
    it('should return a correct Alert',()=>{
        const wrapper = render(<Alert>alert</Alert>)
        const element = wrapper.getByText('alert')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('DIV')
    })
    it('should return the correct Alert when AlertType is not empty',()=>{
        const wrapper = render(<Alert {...testProps}>alert</Alert>);
        const element = wrapper.getByText('alert');
        expect(element).toHaveClass('alert alert-success')
    })
})
