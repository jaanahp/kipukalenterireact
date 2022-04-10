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

    const oneMonth = new Date();
    oneMonth.setDate(oneMonth.getDate() - 30)
    const sixMonths = new Date();
    sixMonths.setDate(sixMonths.getDate() - 180)

    const [selectTime, setSelectTime] = useState("Kaikki");

    // Yhdistetty aika- ja sijaintisuodatus
    useEffect(() => {
        PainlogService
            .getAll()
            .then(data => {
                if (selectTime === "Kaikki" && selectLocation === "Kaikki") {
                    console.log(data)
                    setPainlogs(data)
                } else if (selectLocation === "Kaikki" && selectTime === "kk") {
                    console.log(selectTime)
                    console.log(selectLocation) 
                    console.log(oneMonth)
                    const filtered = painlogs.filter(filtered => filtered.startTime > oneMonth.toISOString())
                    console.log(filtered) //tämä tulee tyhjänä
                    setPainlogs(filtered)
                } else if (selectLocation === "Kaikki" && selectTime === "6kk") {
                    console.log(selectTime)
                    console.log(selectLocation)  
                    console.log(sixMonths)
                    const filtered = painlogs.filter(filtered => filtered.startTime < sixMonths.toISOString())
                    console.log(filtered)
                    setPainlogs(filtered)
                } else if (selectLocation !== "Kaikki" && selectTime === "Kaikki") {
                    console.log(selectTime)
                    console.log(selectLocation)
                    const filtered = painlogs.filter(filtered => filtered.locationId == selectLocation)
                    console.log(filtered) //tämä tulee tyhjänä tokalla suodatuksella eli tekee suodatuksen tokalla kierroksella jo suodatetusta joukosta
                    setPainlogs(filtered)
                } else if (selectLocation !== "Kaikki" && selectTime === "kk") {
                    console.log(selectTime)
                    console.log(selectLocation)
                    const filtered = painlogs.filter(filtered => filtered.locationId == selectLocation && filtered.startTime > oneMonth.toISOString())
                    console.log(filtered) //tämä tulee tyhjänä tokalla suodatuksella eli tekee suodatuksen tokalla kierroksella jo suodatetusta joukosta
                    setPainlogs(filtered)
                } else if (selectLocation !== "Kaikki" && selectTime === "6kk") {
                    console.log(selectTime)
                    console.log(selectLocation)
                    const filtered = painlogs.filter(filtered => filtered.locationId == selectLocation && filtered.startTime > sixMonths.toISOString())
                    console.log(filtered) //tämä tulee tyhjänä tokalla suodatuksella eli tekee suodatuksen tokalla kierroksella jo suodatetusta joukosta
                    setPainlogs(filtered)
                }
            })
    }, [addPainlog, editPainlog, selectLocation, selectTime])

    useEffect(() => {
        LocationService
            .getAll()
            .then(data => {
                // console.log(data)
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

                        setMessage(`merkinnän poisto onnistui`)
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
            <p>Ei tuloksia, päivitä sivu</p>
        </>
        ) //return
    } //if

    if (!addPainlog && painlogs && !editPainlog) {
        return (
            <>
                <h1 className="otsikko"> Kipumerkinnät
                <button className="nappi" onClick={() => setAddPainlog(true)}>Lisää</button>
                </h1>
                <div>
                <select className="suodatin" value={selectLocation} onChange={e=>setSelectLocation(e.target.value)}>
                <option value="Kaikki">Kaikki</option>
                {locations.map(location => (<option key={location.locationId} value={location.locationId}> {location.locationId} {location.locationName} </option>))}
                </select>
                </div>
                <div>
                <select className="suodatin" value={selectTime} onChange={e=>setSelectTime(e.target.value)}>
                <option value="Kaikki">Kaikki</option>
                <option value="kk">Kuukausi</option>
                <option value="6kk">Kuusi kuukautta</option>
                </select>
                </div>

                { showMessage && <Message message={message} isPositive={isPositive} /> }
                {painlogs.map(log => <Painlog key={log.logId} log={log} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} /> )}
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