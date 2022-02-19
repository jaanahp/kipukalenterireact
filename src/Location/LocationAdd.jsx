import React, { useState } from 'react'
import '../App.css'
import LocationService from '../services/location'

const LocationAdd = ({ setAddLocation, setLocations, locations, setMessage, setShowMessage, setIsPositive }) => {

        // State-määritykset, id:tä ei anneta vaan tietokanta luo sen
        const [newLocationName, setNewLocationName] = useState('')

        const submitLocation = (event) => {
            event.preventDefault()
            var newLocation = {
                locationName: newLocationName
            } 
            console.log(newLocation)
            
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
                        }, 4000);
                    } //if päättyy

                }) //.then päättyy
                .catch(error => {
                    setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
                    setIsPositive(false)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 7000);
                }) //.catch päättyy

                setTimeout(() => {
                    setAddLocation(false)
                }, 500);
        } // submit

        return (
            <form onSubmit={submitLocation}>
                <div className="lomake">
                <div>
                <input type="text" value={newLocationName} placeholder="Kivun sijainti" maxLength="50"
                onChange={({ target }) => setNewLocationName(target.value)} required/>
                </div>

                {/* tällä submitoidaan koko form */}
                <button className="nappi" type="submit" style={{ background: 'green'}}>Tallenna</button>

                {/* cancel-buttonissa on setLisäysTila(false), jolloin palataan asiakasnäyttöön */}
                <button className="nappi" onClick={() => setAddLocation(false)} style={{ background: 'red '}}>Peruuta</button>
                </div>
            </form>


        ) //return päättyy

} //LoginAdd päättyy

export default LocationAdd