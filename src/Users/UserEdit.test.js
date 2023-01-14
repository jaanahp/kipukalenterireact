import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserEdit from './UserEdit'

describe('<UserEdit/>', () => {
    let component
    const mockFunktio = jest.fn()

    beforeEach(() => {
        component = render(
            <UserEdit setEditUser={mockFunktio} setUsers={mockFunktio} users={mockFunktio} setMessage={mockFunktio} 
            setShowMessage={mockFunktio} setIsPositive={mockFunktio} changedUser={mockFunktio}/>
        )
    })

    test('Eventhandler is called only once', async() => {
        const button = component.container.querySelector('#canceluseredit')
        fireEvent.click(button)
        expect(mockFunktio.mock.calls).toHaveLength(1)
    })

    test('Form updates states and submits the form', () => {
        const emailInput = component.container.querySelector('#eemailinput')
        const passwordInput = component.container.querySelector('#epasswordinput')
        const passwordAgainInput = component.container.querySelector('#epasswordagaininput')
        const form = component.container.querySelector('form')

        fireEvent.change(emailInput, {
            target: { value: 'Jest@Test' }
        });

        fireEvent.change(passwordInput, {
            target: { value: 'Jest' }
        });

        fireEvent.change(passwordAgainInput, {
            target: { value: 'Jest' }
        });

        fireEvent.submit(form)

        setTimeout(() => {
            expect(mockFunktio.mock.calls).toHaveLength(1)
            expect(mockFunktio.mock.calls[0][0]).toBe('Jest@Test')
        }, 0);        
    })
})