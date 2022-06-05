import React, { useState } from 'react'
import '../App.css'
import LocationService from '../services/location'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LocationEdit = ({ setEditLocation, setLocations, locations, setMessage, setShowMessage, setIsPositive, changedLocation }) => {
        const [newLocationId, setNewLocationId] = useState(changedLocation.locationId)
        const [newLocationName, setNewLocationName] = useState(changedLocation.locationName)

        const submitLocation = (event) => {
            event.preventDefault()
            var changedLocation = {
                locationId: newLocationId,
                locationName: newLocationName
            }

            const jwt = localStorage.getItem('token')
            LocationService.setToken(jwt)
            LocationService
            .update(changedLocation)
            .then(response => {
                if (response.status === 200) {
                    const id = changedLocation.locationId
                    setLocations(locations.filter(filtered => filtered.locationId !== id))
                    setLocations(locations.concat(changedLocation))
                    setMessage(`Päivitetty sijaintia ${changedLocation.locationName}`)
                    setIsPositive(true)
                    setShowMessage(true)
                    setTimeout(() => {
                        setShowMessage(false)
                    }, 4000);
                }
            })
            .catch(error => {
                setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
                setIsPositive(false)
                setShowMessage(true)
                setTimeout(() => {
                    setShowMessage(false)
                }, 7000);
            })
            setTimeout(() => {
                setEditLocation(false)
            }, 500);
        }

        return (
            <form onSubmit={submitLocation}>
                <div className='lomake'>
                <h4>Muokkaa sijaintia</h4>
                <div>
                <input type="text" value={newLocationName} placeholder={changedLocation.locationName} maxLength="50"
                onChange={({ target }) => setNewLocationName(target.value)} required/>
                </div>
                <button id="cancellocedit" className="nappi1" onClick={() => setEditLocation(false)} style={{ background: 'red '}} title="Peruuta"><FontAwesomeIcon icon="far fa-window-close" /></button>
                <button className="nappi" type="submit" style={{ background: 'green', marginLeft: '10px'}} title="Tallenna"><FontAwesomeIcon icon="far fa-check-square" /></button>
                </div>
            </form>
        )
}
export default LocationEdit