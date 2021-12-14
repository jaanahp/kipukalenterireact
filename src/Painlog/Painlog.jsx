import React, { useState } from 'react'
import '../App.css'

const Painlog = ({ log, handleDeleteClick, handleEditClick }) => {

    const [showMore, setShowMore] = useState(false)

    return (

        <>
        <div class='notepage' onClick={() => setShowMore(!showMore)}>
        Päivämäärä {log.logDate}
        <button className="button1" onClick={() => handleDeleteClick(log.logId)}>Poista</button>
        <button className="button1" onClick={() => handleEditClick(log)}>Muokkaa</button>
        </div>


        {showMore && <div className="customerWindow">
            <div className="showMore">
            <div>Kivun intensiteetti: {log.painIntensity}</div>
            <div>Kivun kesto: {log.duration}</div>
            <div>Lääkitys: {log.medication}</div>
            <div>Sijainti: {log.locationId}</div>
            <div>Aiheuttaja: {log.painTrigger}</div>
            <div>Kivun tyyppi: {log.painType}</div>
            <div>Lisätiedot: {log.notes}</div>
            </div>
            </div>}
        </>



    ) //return päättyy
}

export default Painlog