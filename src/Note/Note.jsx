import React from 'react'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Note = ({ note, handleDeleteClick, handleEditClick }) => {

    var noteDate = new Date(note.noteDate).toLocaleDateString('fi-FI', {hour: '2-digit', minute: '2-digit'});

    return (
        <>
        <div className='notepage'>
        Päivämäärä: {noteDate}
        <div className='notetext'>
        {note.noteText}
        </div>
        <div className='buttons'>
        <button id="notedelete" className="nappi2" onClick={() => handleDeleteClick(note.noteId)} title="Poista"><FontAwesomeIcon icon="far fa-trash-alt" /></button>
        <button id="noteedit" className="nappi3" onClick={() => handleEditClick(note)} title="Muokkaa"><FontAwesomeIcon icon="far fa-edit" /></button>
        </div>
        </div>
        </>
    )
}
export default Note