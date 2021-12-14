import React from 'react'
import '../App.css'

const Location = ({ location, handleDeleteClick, handleEditClick }) => {

    return (

        <>
        <div className='notepage'>
        ID {location.locationId}
        : {location.locationName}
        <button className="button1" onClick={() => handleDeleteClick(location.locationId)}>Poista</button>
        <button className="button1" onClick={() => handleEditClick(location)}>Muokkaa</button>
        </div>
        </>



    ) //return päättyy
}

export default Location