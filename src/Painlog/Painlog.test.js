import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Painlog from './Painlog'

describe('<Painlog/>', () => {
    let component
    const log = {
        logId: '1111',
        painIntensity: '1',
        startTime: '2022-04-01T09:42:00',
        endTime: '2022-04-01T10:42:00',
        medication: "testMedication",
        locationInfo: "testLocation",
        painTrigger: "testTrigger",
        painType: "testType",
        locationId: '107',
        notes: "Testnotes"
    }

    const mockHandler = jest.fn()

    beforeEach(() => {
        component = render(
            <Painlog log={log} handleDeleteClick={mockHandler} handleEditClick={mockHandler} />
        )
    })

    test('Button click only calls the event handler once', async () => {
        const button = component.container.querySelector('#logdelete')
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(1)
    })

    test('Button click only calls the event handler once', async () => {
        const button = component.container.querySelector('#logedit')
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(1)
    })

    test('renders content properly', () => {
        const div = component.container.querySelector('.notepage')
        expect(div).toHaveTextContent(
            '1.4.2022 klo 09.42'
        )
    })
})