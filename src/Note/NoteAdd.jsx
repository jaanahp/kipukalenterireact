import React, { useState } from 'react'
import '../App.css'
import NoteService from '../services/note'

const NoteAdd = ({ setAddNote, setNotes, notes, setMessage, setShowMessage, setIsPositive }) => {

        // State-määritykset, id:tä ei anneta vaan tietokanta luo sen
        const [newNoteText, setNewNoteText] = useState('')

        const submitNote = (event) => {
            event.preventDefault()
            var newNote = {
                noteText: newNoteText
            } 

            NoteService
                .create(newNote)
                .then(response => {

                    if (response.status === 200) {
                        setNotes(notes.concat(newNote))

                        setMessage(`Lisätty uusi muistiinpano`)
                        setIsPositive(true)
                        setShowMessage(true)

                        setTimeout(() => {
                            setShowMessage(false)
                        }, 4000);
                    } //if päättyy

                }) //.then päättyy
                .catch(error => {
                    setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
                    setIsPositive(false)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 7000);
                }) //.catch päättyy

                setTimeout(() => {
                    setAddNote(false)
                }, 500);
        } // submit

        return (
            <form onSubmit={submitNote}>
                <div className="lomake">
                <div>
                <input type="text" value={newNoteText} placeholder="Muistiinpano" maxLength="250"
                onChange={({ target }) => setNewNoteText(target.value)} required/>
                </div>

                {/* tällä submitoidaan koko form */}
                <button className="nappi" type="submit" style={{ background: 'green'}}>Tallenna</button>

                {/* cancel-buttonissa on setLisäysTila(false), jolloin palataan asiakasnäyttöön */}
                <button className="nappi" onClick={() => setAddNote(false)} style={{ background: 'red '}}>Peruuta</button>
                </div>
            </form>


        ) //return päättyy

} //LoginAdd päättyy

export default NoteAdd