import React, { useState } from 'react'
import '../App.css'
import PainlogService from '../services/painlog'

const PainlogAdd = ({ setAddPainlog, setPainlogs, painlogs, setMessage, setShowMessage, setIsPositive }) => {

        // State-määritykset, id:tä ei anneta vaan tietokanta luo sen
        const [newLogDate, setNewLogDate] = useState('')
        const [newPainIntensity, setNewPainIntensity] = useState('')
        // const [newStartTime, setNewStartTime] = useState('')
        // const [newEndTime, setNewEndTime] = useState('')
        const [newMedication, setNewMedication] = useState('')
        const [newDuration, setNewDuration] = useState('')
        const [newLocationInfo, setNewLocationInfo] = useState('')
        const [newPainTrigger, setNewPainTrigger] = useState('')
        const [newPainType, setNewPainType] = useState('')
        const [newLocationId, setNewLocationId] = useState('')
        const [newNotes, setNewNotes] = useState('')

        const submitLog = (event) => {
            event.preventDefault()
            var newLog = {
                logDate: newLogDate,
                painIntensity: newPainIntensity,
                // startTime: newStartTime,
                // endTime: newEndTime,
                medication: newMedication,
                duration: newDuration,
                locationInfo: newLocationInfo,
                painTrigger: newPainTrigger,
                painType: newPainType,
                locationId: newLocationId,
                notes: newNotes
            } 

            PainlogService
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
                <div>
                    <input type="datetime" value={newLogDate} placeholder="Päivämäärä"
                    onChange={({ target }) => setNewLogDate(target.value)}/>
                </div>
                <div>
                    <input type="number" value={newPainIntensity} placeholder="Intensiteetti" min="1" max="10"
                    onChange={({ target }) => setNewPainIntensity(target.value)}/>
                </div>
                {/* <div>
                    <input type="time" value={newStartTime} placeholder="Alkuaika"
                    onChange={({ target }) => setNewStartTime(target.value)}/>
                </div>
                <div>
                    <input type="time" value={newEndTime} placeholder="Loppuaika"
                    onChange={({ target }) => setNewEndTime(target.value)}/>
                </div> */}
                <div>
                    <input type="number" value={newDuration} placeholder="Kesto"
                    onChange={({ target }) => setNewDuration(target.value)}/>
                </div>
                <div>
                    <input type="text" value={newMedication} placeholder="Otetut lääkkeet" maxLength="250"
                    onChange={({ target }) => setNewMedication(target.value)}/>
                </div>
                <div>
                    <input type="number" value={newLocationId} placeholder="Sijainti" min="100" max="1000"
                    onChange={({ target }) => setNewLocationId(target.value)}/>
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
                <button className="nappi" type="submit" style={{ background: 'green'}}>Tallenna</button>

                {/* cancel-buttonissa on setLisäysTila(false), jolloin palataan asiakasnäyttöön */}
                <button className="nappi" onClick={() => setAddPainlog(false)} style={{ background: 'red '}}>Peruuta</button>

            </form>


        ) //return päättyy

} //LoginAdd päättyy

export default PainlogAdd