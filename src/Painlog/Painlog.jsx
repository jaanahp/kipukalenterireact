import React, { useState } from 'react'
import '../App.css'

const Painlog = ({ log, location, handleDeleteClick, handleEditClick }) => {

    const [showMore, setShowMore] = useState(false)
    const [startDate, setStartDate] = useState(log.startTime)

    return (

        <>
        <div className='notepage' onClick={() => setShowMore(!showMore)}>
        Sijainti: {log.locationId} :
         Päivämäärä {log.startTime}
         {/* Päivämäärä {startDate.toLocaleDateString('fi-FI')} */}
         {/* {new Intl.DateTimeFormat("fi-FI", {
             year: "numeric",
             month: "long",
             day: "2-digit"
             }).format(startDate)} */}
        {/* {new Intl.DateTimeFormat('fi-FI').format(startDate)} */}
        <button className="button1" onClick={() => handleDeleteClick(log.logId)}>Poista</button>
        <button className="button1" onClick={() => handleEditClick(log)}>Muokkaa</button>
        </div>


        {showMore && <div className="customerWindow">
            <div className="showMore">
            <div>Kivun intensiteetti: {log.painIntensity}</div>
            <div>Loppumisaika: {log.endTime}</div>
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