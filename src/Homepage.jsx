import React, { useState, useEffect } from 'react'
import './App.css'
import Message from './Message'
import LocationAdd from './Location/LocationAdd'
import PainlogAdd from './Painlog/PainlogAdd'

const Homepage = () => {

    const [addLocation, setAddLocation] = useState(false)
    const [addPainlog, setAddPainlog] = useState(false)
    const [locations, setLocations] = useState([]) // tietotyyppi on taulukk
    const [painlogs, setPainlogs] = useState([]) // tietotyyppi on taulukko

    const [showMessage, setShowMessage] = useState(false)
    const [isPositive, setIsPositive] = useState(false)
    const [message, setMessage] = useState('')

    if (!addLocation && !addPainlog)
    return (
        <div>
        <h1><button className="nappi" onClick={() => setAddPainlog(true)} style={{}}>Lisää kipumerkintä</button></h1>
        <h1><button className="nappi" onClick={() => setAddLocation(true)}>Lisää sijainti</button></h1>
        </div>

    )

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

    if (addPainlog) {
        return (
        <>
            <h1 className="otsikko"> Kipumerkinnät </h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <PainlogAdd setAddPainlog={setAddPainlog} painlogs={painlogs} setPainlogs={setPainlogs} setMessage={setMessage} setShowMessage={setShowMessage}
            setIsPositive={setIsPositive} />
        </>
        ) // return
    } //if

}

export default Homepage