import React, { useState, useEffect } from 'react'
import '../App.css'
import LocationService from '../services/location'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LocationAdd = ({ setAddLocation, setLocations, locations, setMessage, setShowMessage, setIsPositive }) => {

        const [newLocationName, setNewLocationName] = useState('')

        const submitLocation = (event) => {
            event.preventDefault()
            var newLocation = {
                locationName: newLocationName
            } 
            const jwt = localStorage.getItem('token')
            LocationService.setToken(jwt)
            LocationService
                .create(newLocation)
                .then(response => {
                    if (response.status === 200) {
                        setLocations(locations.concat(newLocation))
                        setMessage(`Lisätty sijainti ${newLocation.locationName}`)
                        setIsPositive(true)
                        setShowMessage(true)
                        setTimeout(() => {
                            setShowMessage(false)
                        }, 6000);
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
                    setAddLocation(false)
                }, 500);
        }

        const handleChangeName = (event) => {
            setNewLocationName(event.target.value)
          }

        return (
            <form onSubmit={submitLocation}>
                <div id="locationform" className="lomake">
                <h4>Lisää sijainti</h4>
                <div>
                <input id="locationInput" type="text" value={newLocationName} placeholder="Kivun sijainti" maxLength="50"
                onChange={handleChangeName} required/>
                </div>
                <button id="cancellocadd" className="nappi1" onClick={() => setAddLocation(false)} style={{ background: 'red '}} title="Peruuta"><FontAwesomeIcon icon="far fa-window-close" /></button>
                <button id="submitlocation" className="nappi" type="submit" style={{ background: 'green', marginLeft: '10px'}} title="Tallenna"><FontAwesomeIcon icon="far fa-check-square" /></button>
                </div>
            </form>


        )

} 

export default LocationAdd