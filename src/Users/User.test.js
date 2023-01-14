import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import User from './User'

describe('<User/>', () => {
    let component

    const user = {
        username: 'JestTest'
    }

    const mockHandler = jest.fn()

    beforeEach(() => {
        component = render(
            <User user={user} handleDeleteClick={mockHandler} handleEditClick={mockHandler} />
        )
    })

    test('Button click only calls the event handler once', async () => {
        const button = component.container.querySelector('#userdelete')
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(1)
    })

    test('Button click only calls the event handler once', async () => {
        const button = component.container.querySelector('#useredit')
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(1)
    })

    test('renders the page content', () => {

        const div = component.container.querySelector('.notepage')
        expect(div).toHaveTextContent(
            'JestTest'
        )
    })
})