import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserAdd from './UserAdd'

describe('<UserAdd/>', () => {
    let component
    const mockFunktio = jest.fn()

    beforeEach(() => {
        component = render(
            <UserAdd setAddUser={mockFunktio} setUsers={mockFunktio} users={mockFunktio} setMessage={mockFunktio} 
            setShowMessage={mockFunktio} setIsPositive={mockFunktio}/>
        )
    })

    test('Eventhandler is called only once', async() => {
        const button = component.container.querySelector('#canceluseradd')
        fireEvent.click(button)
        expect(mockFunktio.mock.calls).toHaveLength(1)
    })

    test('Form updates states and submits the form', () => {
        const userInput = component.container.querySelector('#userinput')
        const form = component.container.querySelector('form')

        fireEvent.change(userInput, {
            target: { value: 'JestTest' }
        });

        fireEvent.submit(form)

        setTimeout(() => {
            expect(mockFunktio.mock.calls).toHaveLength(1)
            expect(mockFunktio.mock.calls[0][0]).toBe('JestTest')
        }, 0);        
    })
})