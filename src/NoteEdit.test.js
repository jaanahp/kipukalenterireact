import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteEdit from './NoteEdit'

describe('<NoteEdit/>', () => {
    let component
    const mockFunktio = jest.fn()

    beforeEach(() => {
        component = render(
            <NoteEdit setEditNote={mockFunktio} setNotes={mockFunktio} notes={mockFunktio} setMessage={mockFunktio} 
            setShowMessage={mockFunktio} setIsPositive={mockFunktio} changedNote={mockFunktio}/>
        )
    })

    test('Eventhandler is called only once', async() => {
        const button = component.container.querySelector('#cancelnoteedit')
        fireEvent.click(button)
        expect(mockFunktio.mock.calls).toHaveLength(1)
    })

    test('Form updates states and submit works', () => {
        const noteInput = component.container.querySelector('#textedit')
        const noteDate = component.container.querySelector('#dateedit')
        const form = component.container.querySelector('form')

        fireEvent.change(noteInput, {
            target: { value: 'Testnote' }
        });

        fireEvent.change(noteDate, {
            target: {value: '2022-04-01T09:42:00'}
        })

        fireEvent.submit(form)

        setTimeout(() => {
            expect(mockFunktio.mock.calls).toHaveLength(1)
            expect(mockFunktio.mock.calls[0][0]).toBe('Testnote')
            expect(mockFunktio.mock.calls[0][1]).toHaveTextContent('Päivämäärä: 1.4.2022 klo 09.42')
        }, 0);        
    })
})