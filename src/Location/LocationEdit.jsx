import React, { useState } from 'react'
import '../App.css'
import LocationService from '../services/location'

const LocationEdit = ({ setEditLocation, setLocations, locations, setMessage, setShowMessage, setIsPositive, changedLocation }) => {

        // State-määritykset, id:tä ei anneta vaan tietokanta luo sen
        const [newLocationId, setNewLocationId] = useState(changedLocation.locationId)
        const [newLocationName, setNewLocationName] = useState(changedLocation.locationName)

        const submitLocation = (event) => {
            event.preventDefault()
            var changedLocation = {
                locationId: newLocationId,
                locationName: newLocationName
            } 

            LocationService
            .update(changedLocation) //put pyyntö backendille, viittaa update-metodiin customer.js:ssä
            .then(response => {
    
                if (response.status === 200) {
    
                    const id = changedLocation.locationId
    
                    //poistetaan ensin vanha customer statesta. Nämä ei olisi välttämättömiä tehdä, koska kuitenkin päivitetään tilanne tietokannasta.
                    setLocations(locations.filter(filtered => filtered.locationId !== id))
                    //ja lisätään uudestaan muuttuneilla tiedoilla
                    setLocations(locations.concat(changedLocation))
    
                    setMessage(`Päivitetty sijaintia ${changedLocation.locationName}`)
                    setIsPositive(true)
                    setShowMessage(true)
    
                    setTimeout(() => {
                        setShowMessage(false)
                    }, 4000);
                } // if päättyy
            }) //.then päättyy
            .catch(error => {
                setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
                setIsPositive(false)
                setShowMessage(true)
    
                setTimeout(() => {
                    setShowMessage(false)
                }, 7000);
            }) //.catch päättyy
    
            // ennen kuin laitetaan muokkaustila falseksi, odotetaan puoli sekuntia jotta tietokantatallennus ehtii mennä läpi ja kun ladataan sieltä tilanne, se on oikein
            // react on niin nopea, että ilman tätä saattaisi tulla vielä vanha tilanne
            setTimeout(() => {
                setEditLocation(false)
            }, 500);
    
        } //SubmitEmployee

        return (
            <form onSubmit={submitLocation}>
                <div>
                    <p>ID: {newLocationId}</p>
                </div>
                <div>
                <input type="text" value={newLocationName} placeholder={changedLocation.locationName} maxLength="50"
                onChange={({ target }) => setNewLocationName(target.value)} required/>
                </div>
                <button className="nappi" type="submit" style={{ background: 'green'}}>Tallenna</button>

                <button className="nappi" onClick={() => setEditLocation(false)} style={{ background: 'red '}}>Peruuta</button>

            </form>


        ) //return päättyy

} //EmployeeEdit päättyy

export default LocationEdit