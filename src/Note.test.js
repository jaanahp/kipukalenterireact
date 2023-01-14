import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Note from './Note'

describe('<Note/>', () => {
    let component

    const note = {
        noteId: "1111",
        noteDate: '2022-04-01T09:42:00',
        noteText: "Testing note component"
    }

    const mockHandler = jest.fn()

    beforeEach(() => {
        component = render(
            <Note note={note} handleDeleteClick={mockHandler} handleEditClick={mockHandler} />
        )
    })

    test('renders the date and text of note', () => {
        const div = component.container.querySelector('.notepage')
        expect(div).toHaveTextContent(
            'Testing note component'
        )
        expect(component.container).toHaveTextContent(
            'Päivämäärä: 1.4.2022 klo 09.42'
        )
    })
    
    test('Button click only calls the event handler once', async () => {
        const button = component.container.querySelector('#notedelete')
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(1)
    })

    test('Button click only calls the event handler once', async () => {
        const button = component.container.querySelector('#noteedit')
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(1)
    })
})