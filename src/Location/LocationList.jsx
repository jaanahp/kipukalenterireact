import React, { useState, useEffect } from 'react'
import '../App.css'
import LocationService from '../services/location'
import Location from './Location'
import Message from '../Message'
import LocationAdd from './LocationAdd'
import LocationEdit from './LocationEdit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LocationList = () => {

    const [locations, setLocations] = useState([]) 
    const [addLocation, setAddLocation] = useState(false)
    const [editLocation, setEditLocation] = useState(false)
    const [changedLocation, setChangedLocation] = useState({}) 
    const [showMessage, setShowMessage] = useState(false)
    const [isPositive, setIsPositive] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        let cancel = false;
        const token = localStorage.getItem('token')
        LocationService
            .setToken(token)
        LocationService
            .getAll()
            .then(data => {
                if (cancel) return;
                setLocations(data)
            })
            return () => {
                cancel = true;
            }
    }, [addLocation, editLocation ])

    const handleDeleteClick = id => {
        const location = locations.find(location => location.locationId === id)
        const confirm = window.confirm(`Haluatko todella poistaa sijainnin: ${location.locationName} pysyvästi?`)

        if (confirm) {
            const jwt = localStorage.getItem('token')
            LocationService.setToken(jwt)

            LocationService.remove(id)
                .then(response => {
                    if (response.status === 200) {
                        setLocations(locations.filter(filtered => filtered.locationId !== id))

                        setMessage(`Sijainnin ${location.locationName} poisto onnistui`)
                        setIsPositive(true)
                        setShowMessage(true)
                        window.scrollBy(0, -10000)

                        setTimeout(() => {
                            setShowMessage(false)
                        }, 4000 )
                    }
                })
                .catch(error => {
                    console.log(error)
                    setMessage(`Tapahtui virhe: ${error}`)
                    setIsPositive(false)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 7000 )
                })
        }
        else {
            setMessage('Poisto peruutettu')
            setIsPositive(true)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 4000 )
        }
    }

    const handleEditClick = location => {
        setChangedLocation(location)
        setEditLocation(true)
    }

    if (!addLocation && !editLocation && locations.length === 0) {
        return (
        <>
            <h1 className="otsikko"> Kivun sijainti
            <button className="nappi" onClick={() => setAddLocation(true)} style={{ background: 'green'}} title="Lisää"><FontAwesomeIcon icon="far fa-plus-square" /></button></h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <p>Lataa...</p>
        </>
        ) //return
    } //if

    if (!addLocation && locations && !editLocation) {
        return (
            <>
                <h1 className="otsikko"> Kivun sijainti
                <button id="addlocmain" className="nappi" onClick={() => setAddLocation(true)} style={{ background: 'green'}} title="Lisää"><FontAwesomeIcon icon="far fa-plus-square" /></button></h1>
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