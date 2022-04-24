import React from 'react'
import '../App.css'

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
        <button className="nappi2" onClick={() => handleDeleteClick(note.noteId)}>Poista</button>
        <button className="nappi3" onClick={() => handleEditClick(note)}>Muokkaa</button>
        </div>
        </div>
        </>



    ) //return päättyy
}

export default Note