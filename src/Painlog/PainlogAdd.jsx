import React, { useState, useEffect } from 'react'
import '../App.css'
import LogService from '../services/painlog'
import LocationService from '../services/location'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PainlogAdd = ({ setAddPainlog, setPainlogs, painlogs, setMessage, setShowMessage, setIsPositive }) => {

        const [newPainIntensity, setNewPainIntensity] = useState('')
        const [newStartTime, setNewStartTime] = useState('')
        const [newEndTime, setNewEndTime] = useState('')
        const [newMedication, setNewMedication] = useState('')
        const [newLocationInfo, setNewLocationInfo] = useState('')
        const [newPainTrigger, setNewPainTrigger] = useState('')
        const [newPainType, setNewPainType] = useState('')
        const [newLocationId, setNewLocationId] = useState('')
        const [newNotes, setNewNotes] = useState('')
        const [locations, setLocations] = useState([])
        const [newUserId, setNewUserId] = useState('')

        useEffect(() => {
            const userFromLS = localStorage.getItem('user')
            if(userFromLS) {
              setNewUserId(userFromLS)
              console.log(userFromLS)
            }
          }, [])

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
            var newLog = {
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
            console.log(newLog)
            const jwt = localStorage.getItem('token')
            LogService.setToken(jwt)
            LogService
                .create(newLog)
                .then(response => {
                    if (response.status === 200) {
                        setPainlogs(painlogs.concat(newLog))
                        setMessage(`Lisätty uusi merkintä`)
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
                    setAddPainlog(false)
                }, 500);
        }
        return (
            <form onSubmit={submitLog}>
                <div className="lomake">
                <h4>Lisää kipumerkintä</h4>
                <div>
                    <input id="intensity" type="number" value={newPainIntensity} placeholder="Intensiteetti 1-10" min="1" max="10"
                    onChange={({ target }) => setNewPainIntensity(target.value)} required/>
                </div>
                <div>
                    <input id="starttime" type="datetime-local" value={newStartTime} placeholder="Alkuaika"
                    onChange={({ target }) => setNewStartTime(target.value)} required/>
                </div>
                <div>
                    <input id="endtime" type="datetime-local" value={newEndTime} placeholder="Loppuaika"
                    onChange={({ target }) => setNewEndTime(target.value)} required/>
                </div>
                <div>
                    <input id="medication" type="text" value={newMedication} placeholder="Otetut lääkkeet" maxLength="250"
                    onChange={({ target }) => setNewMedication(target.value)}/>
                </div>
                <div>
                <select id="locationselect" className='locationselect' value={newLocationId} onChange={e=>setNewLocationId(e.target.value)} required>
                    <option value=""></option>
                    {locations.map(location => (<option key={location.locationId} value={location.locationId}> {location.locationId} {location.locationName} </option>))}
                </select>
                </div>
                <div>
                    <input id="locationinfo" type="text" value={newLocationInfo} placeholder="Sijainnin lisätieto"
                    onChange={({ target }) => setNewLocationInfo(target.value)}/>
                </div>
                <div>
                    <input id="trigger" type="text" value={newPainTrigger} placeholder="Kivun aiheuttajat" maxLength="250"
                    onChange={({ target }) => setNewPainTrigger(target.value)}/>
                </div>
                <div>
                    <input id="type" type="text" value={newPainType} placeholder="Kivun tyyppi" maxLength="250"
                    onChange={({ target }) => setNewPainType(target.value)}/>
                </div>
                <div>
                    <input id="notes" type="text" value={newNotes} placeholder="Lisätiedot"
                    onChange={({ target }) => setNewNotes(target.value)}/>
                </div>
                <div>
                    <p>Käyttäjä-ID: {newUserId} </p>
                </div>
                <button id="cancellogadd" className="nappi1" onClick={() => setAddPainlog(false)} style={{ background: 'red '}} title="Peruuta"><FontAwesomeIcon icon="far fa-window-close" /></button>
                <button id="submitpainlog" className="nappi" type="submit" style={{ background: 'green', marginLeft: '10px'}} title="Tallenna"><FontAwesomeIcon icon="far fa-check-square" /></button>
                </div>
            </form>
        )
}
export default PainlogAdd