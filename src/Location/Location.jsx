import React from 'react'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Location = ({ location, handleDeleteClick, handleEditClick }) => {

    return (

        <>
        <div className='notepage'>
        ID {location.locationId}
        : {location.locationName}
        <div className='buttons'>
        <button id="locdelbutton" className="nappi2" onClick={() => handleDeleteClick(location.locationId)} title="Poista"><FontAwesomeIcon icon="far fa-trash-alt" /></button>
        <button id="loceditbutton" className="nappi3" onClick={() => handleEditClick(location)} title="Muokkaa"><FontAwesomeIcon icon="far fa-edit" /></button>
        </div>
        </div>
        </>



    ) //return päättyy
}

export default Location