import React from 'react'
import '../App.css'

const Location = ({ location, handleDeleteClick, handleEditClick }) => {

    return (

        <>
        <div className='notepage'>
        ID {location.locationId}
        : {location.locationName}
        <div className='buttons'>
        <button className="nappi2" onClick={() => handleDeleteClick(location.locationId)}>Poista</button>
        <button className="nappi3" onClick={() => handleEditClick(location)}>Muokkaa</button>
        </div>
        </div>
        </>



    ) //return päättyy
}

export default Location