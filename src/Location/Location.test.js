import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Location from './Location'

describe('<Location/>', () => {
    let component

    const location = {
        locationId: "1111",
        locationName: "Testlocation"
    }
    
    const mockHandler = jest.fn()

    beforeEach(() => {
        component = render(
            <Location location={location} handleDeleteClick={mockHandler} handleEditClick={mockHandler} />
        )
    })

    test('renders the name and id of location', () => {

        const div = component.container.querySelector('.notepage')
        expect(div).toHaveTextContent(
            'Testlocation'
        )
        expect(component.container).toHaveTextContent(
            '1111'
        )
    })
    
    test('Button click only calls the event handler once', async () => {
        const button = component.container.querySelector('#locdelbutton')
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(1)
    })

    test('Button click only calls the event handler once', async () => {
        const button = component.container.querySelector('#loceditbutton')
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(1)
    })
})