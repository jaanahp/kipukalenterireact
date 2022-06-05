import React, { useState } from 'react'
import './App.css'
import Message from './Message'
import LocationAdd from './Location/LocationAdd'
import PainlogAdd from './Painlog/PainlogAdd'

const Homepage = () => {
    const [addLocation, setAddLocation] = useState(false)
    const [addPainlog, setAddPainlog] = useState(false)
    const [locations, setLocations] = useState([])
    const [painlogs, setPainlogs] = useState([])
    const [showMessage, setShowMessage] = useState(false)
    const [isPositive, setIsPositive] = useState(false)
    const [message, setMessage] = useState('')

    if (!addLocation && !addPainlog)
    return (
        <div>
        <h1><button id="hpaddpainlog" className="nappi" onClick={() => setAddPainlog(true)}>Lisää kipumerkintä</button></h1>
        <h1><button id="hpaddloc" className="nappi" onClick={() => setAddLocation(true)}>Lisää sijainti</button></h1>
        </div>

    )
    if (addLocation) {
        return (
        <>
            <h1 className="otsikko"> Kivun sijainti </h1>
            <LocationAdd setAddLocation={setAddLocation} locations={locations} setLocations={setLocations} setMessage={setMessage} setShowMessage={setShowMessage}
            setIsPositive={setIsPositive} />
        </>
        )
    }
    if (addPainlog) {
        return (
        <>
            <h1 className="otsikko"> Kipumerkinnät </h1>
            <PainlogAdd setAddPainlog={setAddPainlog} painlogs={painlogs} setPainlogs={setPainlogs} setMessage={setMessage} setShowMessage={setShowMessage}
            setIsPositive={setIsPositive} />
        </>
        )
    }
}

export default Homepage