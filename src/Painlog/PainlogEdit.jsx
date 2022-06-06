import React, { useState, useEffect } from 'react'
import '../App.css'
import LogService from '../services/painlog'
import LocationService from '../services/location'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PainlogEdit = ({ setEditPainlog, setPainlogs, painlogs, setMessage, setShowMessage, setIsPositive, changedLog }) => {
        const [newLogId, setNewLogId] = useState(changedLog.logId)
        const [newPainIntensity, setNewPainIntensity] = useState(changedLog.painIntensity)
        const [newStartTime, setNewStartTime] = useState(changedLog.startTime)
        const [newEndTime, setNewEndTime] = useState(changedLog.endTime)
        const [newMedication, setNewMedication] = useState(changedLog.medication)
        const [newLocationInfo, setNewLocationInfo] = useState(changedLog.locationInfo)
        const [newPainTrigger, setNewPainTrigger] = useState(changedLog.painTrigger)
        const [newPainType, setNewPainType] = useState(changedLog.painType)
        const [newLocationId, setNewLocationId] = useState(changedLog.locationId)
        const [newNotes, setNewNotes] = useState(changedLog.notes)
        const [newUserId, setNewUserId] = useState(changedLog.userId)
        const [locations, setLocations] = useState([])

        useEffect(() => {
            const token = localStorage.getItem('token')
            LocationService.setToken(token)
            LocationService
                .getAll()
                .then(data => {
                    console.log(data)
                    setLocations(data)
                })
        }, [])

        const submitLog = (event) => {
            event.preventDefault()
            var changedLog = {
                logId: newLogId,
                painIntensity: newPainIntensity,
                startTime: newStartTime,
                endTime: newEndTime,
                medication: newMedication,
                locationInfo: newLocationInfo,
                painTrigger: newPainTrigger,
                painType: newPainType,
                locationId: newLocationId,
                notes: newNotes,
                userId: newUserId
            }
            const jwt = localStorage.getItem('token')
            LogService.setToken(jwt)
            LogService
            .update(changedLog) 
            .then(response => {
                if (response.status === 200) {
                    const id = changedLog.logId
                    setPainlogs(painlogs.filter(filtered => filtered.logId !== id))
                    setPainlogs(painlogs.concat(changedLog))
                    setMessage(`Päivitetty merkintää`)
                    setIsPositive(true)
                    setShowMessage(true)
                    setTimeout(() => {
                        setShowMessage(false)
                    }, 4000);
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
                setEditPainlog(false)
            }, 500);
        }

        return (
            <form onSubmit={submitLog}>
                <div className='lomake'>
                <h4>Muokkaa kipumerkintää</h4>
                <div>
                    <label>Kivun alkamisaika</label><br></br>
                    <input id="startdate" type="datetime-local" value={newStartTime} placeholder={changedLog.startTime}
                    onChange={({ target }) => setNewStartTime(target.value)} required/>
                </div>
                <div>
                    <label>Kivun loppumisaika</label><br></br>
                    <input id="enddate" type="datetime-local" value={newEndTime} placeholder={changedLog.endTime}
                    onChange={({ target }) => setNewEndTime(target.value)} required/>
                </div>
                <div>
                    <label>Kivun intensiteetti 1 - 10</label><br></br>
                    <input id="painintensity" type="number" value={newPainIntensity} placeholder={changedLog.painIntensity} min="1" max="10"
                    onChange={({ target }) => setNewPainIntensity(target.value)} required/>
                </div>
                <div>
                    <label>Lääkitys</label><br></br>
                    <input type="text" value={newMedication} placeholder={changedLog.medication} maxLength="250"
                    onChange={({ target }) => setNewMedication(target.value)}/>
                </div>
                <div>
                <label>Kivun sijainti</label><br></br>
                <select className='locationselect' value={newLocationId} onChange={e=>setNewLocationId(e.target.value)} required>
                    {locations.map(location => (<option key={location.locationId} value={location.locationId}> {location.locationId} {location.locationName} </option>))}
                </select>
                </div>
                <div>
                <label>Sijainnin lisätieto</label><br></br>
                    <input type="text" value={newLocationInfo} placeholder={changedLog.locationInfo}
                    onChange={({ target }) => setNewLocationInfo(target.value)}/>
                </div>
                <div>
                <label>Kivun aiheuttajat</label><br></br>
                    <input type="text" value={newPainTrigger} placeholder={changedLog.painTrigger} maxLength="250"
                    onChange={({ target }) => setNewPainTrigger(target.value)}/>
                </div>
                <div>
                <label>Kivun tyyppi</label><br></br>
                    <input type="text" value={newPainType} placeholder={changedLog.painType} maxLength="250"
                    onChange={({ target }) => setNewPainType(target.value)}/>
                </div>
                <div>
                <label>Lisätiedot</label><br></br>
                    <input type="text" value={newNotes} placeholder={changedLog.noteText} maxLength="250"
                    onChange={({ target }) => setNewNotes(target.value)}/>
                </div>
                <div>
                    <p>Käyttäjä-ID: {changedLog.userId}</p>
                </div>
                <button id="canceleditlog" className="nappi1" onClick={() => setEditPainlog(false)} style={{ background: 'red '}} title="Peruuta"><FontAwesomeIcon icon="far fa-window-close" /></button>
                <button className="nappi" type="submit" style={{ background: 'green', marginLeft: '10px'}} title="Tallenna"><FontAwesomeIcon icon="far fa-check-square" /></button>
                </div>
            </form>
        )
}
export default PainlogEdit