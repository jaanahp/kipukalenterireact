import React, { useState, useEffect } from 'react'
import '../App.css'
import LocationService from '../services/location'

const Painlog = ({ log, handleDeleteClick, handleEditClick }) => {

    const [showMore, setShowMore] = useState(false);
    const [locations, setLocations] = useState([]);

    var dateStart = new Date(log.startTime).toLocaleDateString('fi-FI', {hour: '2-digit', minute: '2-digit'});
    var dateEnd = new Date(log.endTime).toLocaleDateString('fi-FI', {hour: '2-digit', minute: '2-digit'});

    useEffect(() => {
        LocationService
            .getAll()
            .then(data => {
                // console.log(data)
                setLocations(data)
            })
    }, [])

    const id = log.locationId
    const location = locations.find(loc => loc.locationId === log.locationId)

    const time = log.duration
    const [hours, minutes] = [Math.floor(time/60), time%60];

    return (

        <>
        <div className='notepage' onClick={() => setShowMore(!showMore)}>
        {dateStart} {log.locationId}
        <div className="buttons">
        <button className="nappi2" onClick={() => handleDeleteClick(log.logId)}>Poista</button>
        <button className="nappi3" onClick={() => handleEditClick(log)}>Muokkaa</button>
        </div>
        </div>


        {showMore && <div className="lisatiedot">
            <div className="showMore">
            <div>Kivun intensiteetti: {log.painIntensity}</div>
            <div>Loppumisaika: {dateEnd}</div>
            <div>Kivun kesto: {hours} h {minutes} min</div>
            <div>Lääkitys: {log.medication}</div>
            <div>Kivun sijainti: {log.locationId} {location.locationName}</div>
            <div>Aiheuttaja: {log.painTrigger}</div>
            <div>Kivun tyyppi: {log.painType}</div>
            <div>Lisätiedot: {log.notes}</div>
            </div>
            </div>}
        </>



    ) //return päättyy
}

export default Painlog