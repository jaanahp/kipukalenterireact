import React, { useState, useEffect } from 'react'
import '../App.css'
import LocationService from '../services/location'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Painlog = ({ log, handleDeleteClick, handleEditClick }) => {
    const [showMore, setShowMore] = useState(false);
    const [locations, setLocations] = useState([]);

    var dateStart = new Date(log.startTime).toLocaleDateString('fi-FI', {hour: '2-digit', minute: '2-digit'});
    var dateEnd = new Date(log.endTime).toLocaleDateString('fi-FI', {hour: '2-digit', minute: '2-digit'});

    useEffect(() => {
        let cancel = false;
        LocationService
            .getAll()
            .then(data => {
                if (cancel) return;
                setLocations(data)
            });
            return () => {
                cancel = true;
            }
    }, [])

    const id = log.locationId
    const location = locations.find(loc => loc.locationId === log.locationId) 
    const time = log.duration
    const [hours, minutes] = [Math.floor(time/60), time%60];

    if (locations !== null && locations !== undefined) {
        return (
            <>
            <div className='notepage' onClick={() => setShowMore(!showMore)}>
            Alkupäivämäärä: {dateStart} <br></br> Kivun sijainti: {location && location.locationName}
            <div className="buttons">
            <button id="logdelete" className="nappi2" onClick={() => handleDeleteClick(log.logId)} title="Poista"><FontAwesomeIcon icon="far fa-trash-alt" /></button>
            <button id="logedit" className="nappi3" onClick={() => handleEditClick(log)} title="Muokkaa"><FontAwesomeIcon icon="far fa-edit" /></button>
            </div>
            </div>
    
            {showMore && <div className="lisatiedot">
                <div className="showMore">
                <div>Loppumisaika: {dateEnd}</div>
                <div>Kivun kesto: {hours} h {minutes} min</div>
                <div>Kivun intensiteetti (1-10): {log.painIntensity}</div>
                <div>Lääkitys: {log.medication}</div>
                <div>Aiheuttaja: {log.painTrigger}</div>
                <div>Kivun tyyppi: {log.painType}</div>
                <div>Lisätiedot: {log.notes}</div>
                <div>Käyttäjä: {log.userId}</div>
                </div>
                </div>}
            </>
        )

    } else {
        return (
            <p>Ladataan...</p>
        )
    }
 


}

export default Painlog