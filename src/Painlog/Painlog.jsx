import React, { useState } from 'react'
import '../App.css'

const Painlog = ({ log, handleDeleteClick, handleEditClick }) => {

    const [showMore, setShowMore] = useState(false)

    return (

        <>
        <h3 onClick={() => setShowMore(!showMore)}>
        {log.painIntensity}
        <button className="button1" onClick={() => handleDeleteClick(log.logId)}>Poista</button>
        <button className="button1" onClick={() => handleEditClick(log)}>Muokkaa</button>
        </h3>


        {showMore && <div className="customerWindow">
            <div className="showMore">
            <div>Kivun intensiteetti: {log.painIntensity}</div>
            <div>Kivun kesto: {log.duration}</div>
            <div>Lääkitys: {log.medication}</div>
            <div>Sijainti: {log.locationiD}</div>
            <div>Aiheuttaja: {log.painTrigger}</div>
            <div>Kivun tyyppi: {log.painType}</div>
            <div>Lisätiedot: {log.notes}</div>
            </div>
            </div>}
        </>



    ) //return päättyy
}

export default Painlog