import React, { useState, useEffect } from 'react'
import '../App.css'
import LogService from '../services/painlog'
import LocationService from '../services/location'

const PainlogAdd = ({ setAddPainlog, setPainlogs, painlogs, setMessage, setShowMessage, setIsPositive }) => {

        // State-määritykset, id:tä ei anneta vaan tietokanta luo sen
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

        useEffect(() => {
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
                notes: newNotes
            }
            console.log(newLog) //tämän saa logattua

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
                    } //if päättyy

                }) //.then päättyy
                .catch(error => {
                    setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
                    setIsPositive(false)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 7000);
                }) //.catch päättyy

                setTimeout(() => {
                    setAddPainlog(false)
                }, 500);
        } // submit

        return (
            <form onSubmit={submitLog}>
                <div className="lomake">
                <div>
                    <input type="number" value={newPainIntensity} placeholder="Intensiteetti 1-10" min="1" max="10"
                    onChange={({ target }) => setNewPainIntensity(target.value)}/>
                </div>
                <div>
                    <input type="datetime-local" value={newStartTime} placeholder="Alkuaika"
                    onChange={({ target }) => setNewStartTime(target.value)}/>
                </div>
                <div>
                    <input type="datetime-local" value={newEndTime} placeholder="Loppuaika"
                    onChange={({ target }) => setNewEndTime(target.value)}/>
                </div>
                <div>
                    <input type="text" value={newMedication} placeholder="Otetut lääkkeet" maxLength="250"
                    onChange={({ target }) => setNewMedication(target.value)}/>
                </div>
                <div>
                <select className='locationselect' value={newLocationId} onChange={e=>setNewLocationId(e.target.value)}>
                    <option value=""></option>
                    {locations.map(location => (<option key={location.locationId} value={location.locationId}> {location.locationId} {location.locationName} </option>))}
                </select>
                </div>
                <div>
                    <input type="text" value={newLocationInfo} placeholder="Sijainnin lisätieto"
                    onChange={({ target }) => setNewLocationInfo(target.value)}/>
                </div>
                <div>
                    <input type="text" value={newPainTrigger} placeholder="Kivun aiheuttajat" maxLength="250"
                    onChange={({ target }) => setNewPainTrigger(target.value)}/>
                </div>
                <div>
                    <input type="text" value={newPainType} placeholder="Kivun tyyppi" maxLength="250"
                    onChange={({ target }) => setNewPainType(target.value)}/>
                </div>
                <div>
                    <input type="text" value={newNotes} placeholder="Lisätiedot"
                    onChange={({ target }) => setNewNotes(target.value)}/>
                </div>
                {/* tällä submitoidaan koko form */}
                <button className="nappi3" type="submit">Tallenna</button>

                {/* cancel-buttonissa on setLisäysTila(false), jolloin palataan asiakasnäyttöön */}
                <button className="nappi2" onClick={() => setAddPainlog(false)}>Peruuta</button>
                </div>
            </form>


        ) //return päättyy

} //LoginAdd päättyy


export default PainlogAdd