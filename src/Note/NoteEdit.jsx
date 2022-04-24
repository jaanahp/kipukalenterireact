import React, { useState } from 'react'
import '../App.css'
import NoteService from '../services/note'

const NoteEdit = ({ setEditNote, setNotes, notes, setMessage, setShowMessage, setIsPositive, changedNote }) => {

        // State-määritykset, id:tä ei anneta vaan tietokanta luo sen
        const [newNoteId, setNewNoteId] = useState(changedNote.noteId)
        const [newNoteText, setNewNoteText] = useState(changedNote.noteText)
        const [newNoteDate, setNewNoteDate] = useState(changedNote.noteDate)

        const submitNote = (event) => {
            event.preventDefault()
            var changedNote = {
                noteId: newNoteId,
                noteText: newNoteText,
                noteDate: newNoteDate

            } 

            NoteService
            .update(changedNote) //put pyyntö backendille, viittaa update-metodiin customer.js:ssä
            .then(response => {
    
                if (response.status === 200) {
    
                    const id = changedNote.noteId
    
                    //poistetaan ensin vanha customer statesta. Nämä ei olisi välttämättömiä tehdä, koska kuitenkin päivitetään tilanne tietokannasta.
                    setNotes(notes.filter(filtered => filtered.noteId !== id))
                    //ja lisätään uudestaan muuttuneilla tiedoilla
                    setNotes(notes.concat(changedNote))
    
                    setMessage(`Päivitetty muistiinpanoa`)
                    setIsPositive(true)
                    setShowMessage(true)
    
                    setTimeout(() => {
                        setShowMessage(false)
                    }, 4000);
                } // if päättyy
            }) //.then päättyy
            .catch(error => {
                setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
                setIsPositive(false)
                setShowMessage(true)
    
                setTimeout(() => {
                    setShowMessage(false)
                }, 7000);
            }) //.catch päättyy
    
            // ennen kuin laitetaan muokkaustila falseksi, odotetaan puoli sekuntia jotta tietokantatallennus ehtii mennä läpi ja kun ladataan sieltä tilanne, se on oikein
            // react on niin nopea, että ilman tätä saattaisi tulla vielä vanha tilanne
            setTimeout(() => {
                setEditNote(false)
            }, 500);
    
        } //SubmitEmployee

        return (
            <form onSubmit={submitNote}>
                <div>
                    <p>ID: {newNoteId}</p>
                </div>
                <div>
                    <label>Päivämäärä</label><br></br>
                    <input type="datetime-local" value={newNoteDate} placeholder={changedNote.noteDate}
                    onChange={({ target }) => setNewNoteDate(target.value)}/>
                </div>
                <div>
                <input type="text" value={newNoteText} placeholder={changedNote.noteText} maxLength="250"
                onChange={({ target }) => setNewNoteText(target.value)} required/>
                </div>
                <button className="nappi" type="submit" style={{ background: 'green'}}>Tallenna</button>

                <button className="nappi" onClick={() => setEditNote(false)} style={{ background: 'red '}}>Peruuta</button>

            </form>


        ) //return päättyy

} //EmployeeEdit päättyy

export default NoteEdit