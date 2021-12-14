import React, { useState } from 'react'
import '../App.css'
import LogService from '../services/painlog'

const PainlogEdit = ({ setEditPainlog, setPainlogs, painlogs, setMessage, setShowMessage, setIsPositive, changedLog }) => {

        // State-määritykset, id:tä ei anneta vaan tietokanta luo sen
        const [newLogId, setNewLogId] = useState(changedLog.logId)
        const [newLogDate, setNewLogDate] = useState(changedLog.logDate)
        const [newPainIntensity, setNewPainIntensity] = useState(changedLog.painIntensity)
        const [newStartTime, setNewStartTime] = useState(changedLog.startTime)
        const [newEndTime, setNewEndTime] = useState(changedLog.endTime)
        const [newMedication, setNewMedication] = useState(changedLog.medication)
        const [newLocationInfo, setNewLocationInfo] = useState(changedLog.locationInfo)
        const [newPainTrigger, setNewPainTrigger] = useState(changedLog.painTrigger)
        const [newPainType, setNewPainType] = useState(changedLog.painType)
        const [newLocationId, setNewLocationId] = useState(changedLog.locationId)
        const [newLocationName, setNewLocationName] = useState(changedLog.locationName)
        const [newNotes, setNewNotes] = useState(changedLog.notes)

        const submitLog = (event) => {
            event.preventDefault()
            var changedLog = {
                logDate: newLogDate,
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

            LogService
            .update(changedLog) //put pyyntö backendille, viittaa update-metodiin customer.js:ssä
            .then(response => {
    
                if (response.status === 200) {
    
                    const id = changedLog.logId
    
                    setPainlogs(painlogs.filter(filtered => filtered.logId !== id))
                    setPainlogs(painlogs.concat(changedLog))
    
                    setMessage(`Päivitetty ${changedLog.logId}`)
                    setIsPositive(true)
                    setShowMessage(true)
    
                    setTimeout(() => {
                        setShowMessage(false)
                    }, 4000);
                } // if päättyy
            }) //.then päättyy
            .catch(error => {
                setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
                setIsPositive(false)
                setShowMessage(true)
    
                setTimeout(() => {
                    setShowMessage(false)
                }, 7000);
            }) //.catch päättyy
    
            // ennen kuin laitetaan muokkaustila falseksi, odotetaan puoli sekuntia jotta tietokantatallennus ehtii mennä läpi ja kun ladataan sieltä tilanne, se on oikein
            // react on niin nopea, että ilman tätä saattaisi tulla vielä vanha tilanne
            setTimeout(() => {
                setEditPainlog(false)
            }, 500);
    
        } //SubmitEmployee

        return (
            <form onSubmit={submitLog}>
                <div>
                    <p>ID: {newLogId}</p>
                </div>
                <div>
                    <input type="datetime" value={newLogDate} placeholder={changedLog.logDate}
                    onChange={({ target }) => setNewLogDate(target.value)}/>
                </div>
                <div>
                    <label>Kivun intensiteetti 1 - 10</label><br></br>
                    <input type="number" value={newPainIntensity} placeholder={changedLog.painIntensity} min="1" max="10"
                    onChange={({ target }) => setNewPainIntensity(target.value)}/>
                </div>
                <div>
                    <label>Kivun alkamisaika</label><br></br>
                    <input type="datetime" value={newStartTime} placeholder={changedLog.startTime}
                    onChange={({ target }) => setNewStartTime(target.value)}/>
                </div>
                <div>
                    <label>Kivun loppumisaika</label><br></br>
                    <input type="datetime" value={newEndTime} placeholder={changedLog.endTime}
                    onChange={({ target }) => setNewEndTime(target.value)}/>
                </div>
                <div>
                    <label>Lääkitys</label><br></br>
                    <input type="text" value={newMedication} placeholder={changedLog.medication} maxLength="250"
                    onChange={({ target }) => setNewMedication(target.value)}/>
                </div>
                <div>
                <label>Kivun sijainti</label><br></br>
                    <input type="number" value={newLocationId} placeholder={changedLog.locationId}
                    onChange={({ target }) => setNewLocationId(target.value)}/>
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
                <button className="nappi" type="submit" style={{ background: 'green'}}>Tallenna</button>

                <button className="nappi" onClick={() => setEditPainlog(false)} style={{ background: 'red '}}>Peruuta</button>

            </form>


        ) //return päättyy

} //EmployeeEdit päättyy

export default PainlogEdit