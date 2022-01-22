import React, { useState, useEffect } from 'react'
import '../App.css'
import LocationService from '../services/location'
import Location from './Location'
import Message from '../Message'
import LocationAdd from './LocationAdd'
import LocationEdit from './LocationEdit'

const LocationList = () => {

    const [locations, setLocations] = useState([]) // tietotyyppi on taulukko
    const [addLocation, setAddLocation] = useState(false)

    const [editLocation, setEditLocation] = useState(false)
    const [changedLocation, setChangedLocation] = useState({}) 

    const [showMessage, setShowMessage] = useState(false)
    const [isPositive, setIsPositive] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        LocationService
            .getAll()
            .then(data => {
                console.log(data)
                setLocations(data)
            })
    }, [addLocation, editLocation])

    const handleDeleteClick = id => {
        const location = locations.find(location => location.locationId === id)
        const confirm = window.confirm(`Haluatko todella poistaa sijainnin: ${location.locationName} pysyvästi?`)

        if (confirm) {

            LocationService.remove(id)
                .then(response => {
                    if (response.status === 200) {
                        // Poistetaan login statesta
                        setLocations(locations.filter(filtered => filtered.locationId !== id))

                        setMessage(`Sijainnin ${location.locationName} poisto onnistui!`)
                        setIsPositive(true)
                        setShowMessage(true)
                        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

                        setTimeout(() => {
                            setShowMessage(false)
                        }, 4000 )
                    } //if
                }) //.then
                .catch(error => {
                    console.log(error)
                    setMessage(`Tapahtui virhe: ${error}`)
                    setIsPositive(false)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 7000 )
                }) //.catch
        } //if
        else {
            setMessage('Poisto peruutettu')
            setIsPositive(true)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 4000 )
        } //else
    } // handleDeleteClick

    const handleEditClick = location => {
        setChangedLocation(location)
        setEditLocation(true)
    }

    if (!addLocation && !editLocation && locations.length === 0) {
        return (
        <>
            <h1 className="otsikko"> Kivun sijainti
            <button className="nappi" onClick={() => setAddLocation(true)}>Lisää uusi</button></h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <p>Lataa...</p>
        </>
        ) //return
    } //if

    if (!addLocation && locations && !editLocation) {
        return (
            <>
                <h1 className="otsikko"> Kivun sijainti
                <button className="nappi" onClick={() => setAddLocation(true)}>Lisää</button></h1>
                { showMessage && <Message message={message} isPositive={isPositive} /> }
                {locations.map(location => <Location key={location.locationId} location={location} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} /> )}
            </>
        ) //return
    } //if

    if (addLocation) {
        return (
        <>
            <h1 className="otsikko"> Kivun sijainti </h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <LocationAdd setAddLocation={setAddLocation} locations={locations} setLocations={setLocations} setMessage={setMessage} setShowMessage={setShowMessage}
            setIsPositive={setIsPositive} />
        </>
        ) // return
    } //if

    if (editLocation) {
        return (
        <>
            <h1 className="otsikko"> Kivun sijainti </h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <LocationEdit setEditLocation={setEditLocation} changedLocation={changedLocation} locations={locations} setLocations={setLocations} setMessage={setMessage} setShowMessage={setShowMessage}
            setIsPositive={setIsPositive} />
        </>
        )//return
    }

} //LocationList

export default LocationList