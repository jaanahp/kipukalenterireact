import React, { useState } from 'react'
import '../App.css'
import NoteService from '../services/note'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NoteEdit = ({ setEditNote, setNotes, notes, setMessage, setShowMessage, setIsPositive, changedNote }) => {
        const [newNoteId, setNewNoteId] = useState(changedNote.noteId)
        const [newNoteText, setNewNoteText] = useState(changedNote.noteText)
        const [newNoteDate, setNewNoteDate] = useState(changedNote.noteDate)
        const [newUserId, setNewUserId] = useState(changedNote.userId)

        const submitNote = (event) => {
            event.preventDefault()
            var changedNote = {
                noteId: newNoteId,
                noteText: newNoteText,
                noteDate: newNoteDate,
                userId: newUserId
            } 
            const jwt = localStorage.getItem('token')
            NoteService.setToken(jwt)
            NoteService
            .update(changedNote)
            .then(response => {
                if (response.status === 200) {
                    const id = changedNote.noteId
                    setNotes(notes.filter(filtered => filtered.noteId !== id))
                    setNotes(notes.concat(changedNote))
                    setMessage(`Päivitetty muistiinpanoa`)
                    setIsPositive(true)
                    setShowMessage(true)
                    setTimeout(() => {
                        setShowMessage(false)
                    }, 4000);
                }
            })
            .catch(error => {
                setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
                setIsPositive(false)
                setShowMessage(true)
                setTimeout(() => {
                    setShowMessage(false)
                }, 7000);
            }) 
            setTimeout(() => {
                setEditNote(false)
            }, 500);
        } 

        return (
            <form onSubmit={submitNote}>
                <div className='lomake'>
                <h4>Muokkaa muistiinpanoa</h4>
                <div>
                    <label>Päivämäärä</label><br></br>
                    <input id="dateedit" type="datetime-local" value={newNoteDate} placeholder={changedNote.noteDate}
                    onChange={({ target }) => setNewNoteDate(target.value)}/>
                </div>
                <div>
                <input id="textedit" type="text" value={newNoteText} placeholder={changedNote.noteText} maxLength="250"
                onChange={({ target }) => setNewNoteText(target.value)} required/>
                </div>
                <div>
                    <p>Käyttäjä-ID: {changedNote.userId}</p>
                </div>
                <button id="cancelnoteedit" className="nappi1" onClick={() => setEditNote(false)} style={{ background: 'red '}} title="Peruuta"><FontAwesomeIcon icon="far fa-window-close" /></button>
                <button className="nappi" type="submit" style={{ background: 'green', marginLeft: '10px'}} title="Tallenna"><FontAwesomeIcon icon="far fa-check-square" /></button>
                </div>
            </form>
        ) 
} 
export default NoteEdit