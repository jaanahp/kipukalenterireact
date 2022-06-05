import React, { useState, useEffect } from 'react'
import '../App.css'
import PainlogService from '../services/painlog'
import Painlog from './Painlog'
import Message from '../Message'
import PainlogAdd from './PainlogAdd'
import PainlogEdit from './PainlogEdit'
import LocationService from '../services/location'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PainlogList = () => {

    const [painlogs, setPainlogs] = useState([]) 
    const [addPainlog, setAddPainlog] = useState(false)
    const [logs, setLogs] = useState([])
    const [currentUser, setCurrentUser] = useState()
    const [editPainlog, setEditPainlog] = useState(false)
    const [changedLog, setChangedLog] = useState({}) 
    const [showMessage, setShowMessage] = useState(false)
    const [isPositive, setIsPositive] = useState(false)
    const [message, setMessage] = useState('')
    const [locations, setLocations] = useState([])
    const [selectLocation, setSelectLocation] = useState("Kaikki");
    const [selectTime, setSelectTime] = useState("Kaikki");

    const oneMonth = new Date();
    oneMonth.setDate(oneMonth.getDate() - 30)
    const sixMonths = new Date();
    sixMonths.setDate(sixMonths.getDate() - 180)

    useEffect(() => {
        const userFromLS = localStorage.getItem('user')
        if(userFromLS) {
          setCurrentUser(userFromLS)
        }
      }, [])

      useEffect(() => {
        let cancel = false;
        const token = localStorage.getItem('token')
        PainlogService
            .setToken(token)
        PainlogService
            .getAll()
            .then(data => {
                if (cancel) return;
                setLogs(data)
                const filtereddata = logs.filter(filtereddata => filtereddata.userId === currentUser)
                setLogs(filtereddata)
                if (selectTime === "Kaikki" && selectLocation === "Kaikki") {
                    setLogs(data)
                    const filtereddata = logs.filter(filtereddata => filtereddata.userId === currentUser)
                    setPainlogs(filtereddata)
                } else if (selectLocation === "Kaikki" && selectTime === "kk") {
                    setLogs(filtereddata)
                    const filtered = logs.filter(filtered => filtered.startTime > oneMonth.toISOString())
                    setPainlogs(filtered)
                } else if (selectLocation === "Kaikki" && selectTime === "6kk") {
                    setLogs(filtereddata)
                    const filtered = logs.filter(filtered => filtered.startTime > sixMonths.toISOString())
                    setPainlogs(filtered)
                } else if (selectLocation !== "Kaikki" && selectTime === "Kaikki") {
                    setLogs(filtereddata)
                    const filtered = logs.filter(filtered => filtered.locationId == selectLocation)
                    setPainlogs(filtered)
                } else if (selectLocation !== "Kaikki" && selectTime === "kk") {
                    setLogs(filtereddata)
                    const filtered = logs.filter(filtered => filtered.locationId == selectLocation && filtered.startTime > oneMonth.toISOString())
                    setPainlogs(filtered)
                } else if (selectLocation !== "Kaikki" && selectTime === "6kk") {
                    setLogs(filtereddata)
                    const filtered = logs.filter(filtered => filtered.locationId == selectLocation && filtered.startTime > sixMonths.toISOString())
                    setPainlogs(filtered)
                }
            })

            return () => {
                cancel = true;
            }

    }, [addPainlog, editPainlog, selectLocation, selectTime, painlogs, currentUser, logs, oneMonth, sixMonths])

    useEffect(() => {
        const jwttoken = localStorage.getItem('token')
        LocationService
            .setToken(jwttoken)
        LocationService
            .getAll()
            .then(data => {
                setLocations(data)
            })
    }, [])

    const handleDeleteClick = id => {
        const log = painlogs.find(log => log.logId === id)
        const confirm = window.confirm(`Haluatko todella poistaa merkinnän pysyvästi?`)
        if (confirm) {
            const jwt = localStorage.getItem('token')
            PainlogService.setToken(jwt)
            PainlogService.remove(id)
                .then(response => {
                    if (response.status === 200) {
                        setPainlogs(painlogs.filter(filtered => filtered.logId !== id))
                        setMessage(`merkinnän poisto onnistui`)
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

    const handleEditClick = log => {
        setChangedLog(log)
        setEditPainlog(true)
    }

    if (!addPainlog && !editPainlog && painlogs.length === 0) {
        return (
        <>
            <h1 className="otsikko"> Kipumerkinnät
            <button className="nappi" onClick={() => setAddPainlog(true)} style={{ background: 'green'}} title="Lisää"><FontAwesomeIcon icon="far fa-plus-square" /></button>
            </h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <p>Ei tuloksia, päivitä sivu</p>
        </>
        )
    }

    if (!addPainlog && painlogs && !editPainlog) {
        return (
            <>
                <h1 className="otsikko"> Kipumerkinnät
                <button className="nappi" onClick={() => setAddPainlog(true)} style={{ background: 'green'}} title="Lisää"><FontAwesomeIcon icon="far fa-plus-square" /></button>
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