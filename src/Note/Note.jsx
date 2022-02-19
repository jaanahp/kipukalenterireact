import React from 'react'
import '../App.css'

const Note = ({ note, handleDeleteClick, handleEditClick }) => {

    return (

        <>
        <div className='notepage'>
        ID {note.noteId}
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