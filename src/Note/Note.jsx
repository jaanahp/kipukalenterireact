import React from 'react'
import '../App.css'

const Note = ({ note, handleDeleteClick, handleEditClick }) => {

    return (

        <>
        <h3>
        {note.noteText}
        <button className="button1" onClick={() => handleDeleteClick(note.noteId)}>Poista</button>
        <button className="button1" onClick={() => handleEditClick(note)}>Muokkaa</button>
        </h3>
        </>



    ) //return päättyy
}

export default Note