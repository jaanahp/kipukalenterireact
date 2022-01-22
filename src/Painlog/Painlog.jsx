import React, { useState } from 'react'
import '../App.css'
import LocationService from '../services/location'

const Painlog = ({ log, location, handleDeleteClick, handleEditClick }) => {

    const [showMore, setShowMore] = useState(false)

    var dateStart = new Date(log.startTime).toLocaleDateString('fi-FI', {hour: '2-digit', minute: '2-digit'});
    var dateEnd = new Date(log.endTime).toLocaleDateString('fi-FI', {hour: '2-digit', minute: '2-digit'});

    return (

        <>
        <div className='notepage' onClick={() => setShowMore(!showMore)}>
        Sijainti {log.locationId}: Alkamisaika: {dateStart}
        <button className="button1" onClick={() => handleDeleteClick(log.logId)}>Poista</button>
        <button className="button1" onClick={() => handleEditClick(log)}>Muokkaa</button>
        </div>


        {showMore && <div className="customerWindow">
            <div className="showMore">
            <div>Kivun intensiteetti: {log.painIntensity}</div>
            <div>Loppumisaika: {dateEnd}</div>
            <div>Kivun kesto: {log.duration}</div>
            <div>Lääkitys: {log.medication}</div>
            <div>Sijainti: {log.locationId} </div>
            {/* <div>Sijainti: {location.locationName}</div> */}
            <div>Aiheuttaja: {log.painTrigger}</div>
            <div>Kivun tyyppi: {log.painType}</div>
            <div>Lisätiedot: {log.notes}</div>
            </div>
            </div>}
        </>



    ) //return päättyy
}

export default Painlog