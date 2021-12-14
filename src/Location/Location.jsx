import React from 'react'
import '../App.css'

const Location = ({ location, handleDeleteClick, handleEditClick }) => {

    return (

        <>
        <h3>
        {location.locationName}
        <button className="button1" onClick={() => handleDeleteClick(location.locationId)}>Poista</button>
        <button className="button1" onClick={() => handleEditClick(location)}>Muokkaa</button>
        </h3>
        </>



    ) //return päättyy
}

export default Location