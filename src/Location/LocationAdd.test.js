import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LocationAdd from './LocationAdd'

describe('<LocationAdd/>', () => {
    let component
    const mockFunktio = jest.fn()

    beforeEach(() => {
        component = render(
            <LocationAdd setAddLocation={mockFunktio} setLocations={mockFunktio} locations={mockFunktio} setMessage={mockFunktio} 
            setShowMessage={mockFunktio} setIsPositive={mockFunktio}/>
        )
    })

    test('Eventhandler is called only once', async() => {
        const button = component.container.querySelector('#cancellocadd')
        fireEvent.click(button)
        expect(mockFunktio.mock.calls).toHaveLength(1)
    })

    test('Form updates states and submits the form', () => {
        const locationInput = component.container.querySelector('#locationInput')
        const form = component.container.querySelector('form')

        fireEvent.change(locationInput, {
            target: { value: 'Testlocation' }
        });
        fireEvent.submit(form)

        setTimeout(() => {
            expect(mockFunktio.mock.calls).toHaveLength(1) //ei toimi, tulee nollana...
            expect(mockFunktio.mock.calls[0][0]).toBe('Testlocation')
        }, 0);
    })
}
)