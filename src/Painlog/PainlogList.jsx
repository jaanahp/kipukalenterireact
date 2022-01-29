import React, { useState, useEffect } from 'react'
import '../App.css'
import PainlogService from '../services/painlog'
import Painlog from './Painlog'
import Message from '../Message'
import PainlogAdd from './PainlogAdd'
import PainlogEdit from './PainlogEdit'
import LocationService from '../services/location'

const PainlogList = () => {

    const [painlogs, setPainlogs] = useState([]) // tietotyyppi on taulukko
    const [addPainlog, setAddPainlog] = useState(false)


    const [editPainlog, setEditPainlog] = useState(false)
    const [changedLog, setChangedLog] = useState({}) 

    const [showMessage, setShowMessage] = useState(false)
    const [isPositive, setIsPositive] = useState(false)
    const [message, setMessage] = useState('')

    const [locations, setLocations] = useState([])
    const [selectLocation, setSelectLocation] = useState("Kaikki");

    useEffect(() => {
        PainlogService
            .getAll()
            .then(data => {
                if (selectLocation === "Kaikki") {
                    console.log(data)
                    setPainlogs(data)
                } else {
                    console.log(selectLocation) //tämä onnistuu oikein
                    console.log(data)
                    setPainlogs(data) //tämä ei ilmeisesti onnistu, koska loggautuu vain edellinen filtteröity tulos
                    console.log(painlogs) 
                    const filtered = painlogs.filter(filtered => filtered.locationId == selectLocation)
                    console.log(filtered) //tämä tulee tyhjänä tokalla suodatuksella eli tekee suodatuksen tokalla kierroksella jo suodatetusta joukosta
                    setPainlogs(filtered)
                }
            })
    }, [addPainlog, editPainlog, selectLocation])

    useEffect(() => {
        LocationService
            .getAll()
            .then(data => {
                console.log(data)
                setLocations(data)
            })
    }, [])

    

    const handleDeleteClick = id => {
        const log = painlogs.find(log => log.logId === id)
        const confirm = window.confirm(`Haluatko todella poistaa merkinnän pysyvästi?`)

        if (confirm) {

            PainlogService.remove(id)
                .then(response => {
                    if (response.status === 200) {
                        // Poistetaan login statesta
                        setPainlogs(painlogs.filter(filtered => filtered.logId !== id))

                        setMessage(`merkinnän poisto onnistui!`)
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

    const handleEditClick = log => {
        setChangedLog(log)
        setEditPainlog(true)
    }

    if (!addPainlog && !editPainlog && painlogs.length === 0) {
        return (
        <>
            <h1 className="otsikko"> Kipumerkinnät
            <button className="nappi" onClick={() => setAddPainlog(true)}>Lisää</button>
            </h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <p>Lataa...</p>
        </>
        ) //return
    } //if

    if (!addPainlog && painlogs && !editPainlog) {
        return (
            <>
                <h1 className="otsikko"> Kipumerkinnät
                <button className="nappi" onClick={() => setAddPainlog(true)}>Lisää</button>
                </h1>

                <div className="suodatin">
                <select value={selectLocation} onChange={e=>setSelectLocation(e.target.value)}>
                <option value="Kaikki">Kaikki</option>
                {locations.map(location => (<option key={location.locationId} value={location.locationId}> {location.locationId} {location.locationName} </option>))}
                </select>
                </div>

                { showMessage && <Message message={message} isPositive={isPositive} /> }
                {painlogs.map(log => <Painlog key={log.logId} log={log} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} /> )}

                {/* {locations.map(location => <Painlog location={location} />)} */}
            </>
        ) //return
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

    if (editPainlog) {
        return (
        <>
            <h1 className="otsikko"> Kipumerkinnät </h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <PainlogEdit setEditPainlog={setEditPainlog} changedLog={changedLog} painlogs={painlogs} setPainlogs={setPainlogs} setMessage={setMessage} setShowMessage={setShowMessage}
            setIsPositive={setIsPositive} />
        </>
        )//return
    }

} 

export default PainlogList