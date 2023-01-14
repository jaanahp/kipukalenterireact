import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PainlogEdit from './PainlogEdit'

describe('<PainlogEdit/>', () => {
    let component
    const mockFunktio = jest.fn()

    beforeEach(() => {
        component = render(
            <PainlogEdit setEditPainlog={mockFunktio} setPainlogs={mockFunktio} painlogs={mockFunktio} setMessage={mockFunktio} 
            setShowMessage={mockFunktio} setIsPositive={mockFunktio} changedLog={mockFunktio} />
        )
    })

    test('Cancel-button eventhandler is called only once', async() => {
        const button = component.container.querySelector('#canceleditlog')
        fireEvent.click(button)
        expect(mockFunktio.mock.calls).toHaveLength(1)
    })

    test('Painlog edit form updates states and submits the form', () => {
        const intensity = component.container.querySelector('#painintensity')
        const startDate = component.container.querySelector('#startdate')
        const endDate = component.container.querySelector('#enddate')
        const form = component.container.querySelector('form')

        fireEvent.change(intensity, {
            target: { value: '5' }
        });
        fireEvent.change(startDate, {
            target: {value: '2022-04-01T09:42:00'}
        })
        fireEvent.change(endDate, {
            target: {value: '2022-04-01T09:42:00'}
        })
        fireEvent.submit(form)

        setTimeout(() => {
            expect(mockFunktio.mock.calls).toHaveLength(1)
            expect(mockFunktio.mock.calls[0][0]).toBe('5')
            expect(mockFunktio.mock.calls[0][1]).toHaveTextContent('1.4.2022 klo 09.42')
            expect(mockFunktio.mock.calls[0][2]).toHaveTextContent('1.4.2022 klo 09.42')
        }, 0);  
    })
})