import React from 'react'
import '../App.css'

const Note = ({ note, handleDeleteClick, handleEditClick }) => {

    return (

        <>
        <div className='notepage'>
        ID {note.noteId}
        : {note.noteText}
        <button className="button1" onClick={() => handleDeleteClick(note.noteId)}>Poista</button>
        <button className="button1" onClick={() => handleEditClick(note)}>Muokkaa</button>
        </div>
        </>



    ) //return päättyy
}

export default Note