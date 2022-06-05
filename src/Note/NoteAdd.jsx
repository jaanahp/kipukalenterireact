import React, { useState, useEffect } from 'react'
import '../App.css'
import NoteService from '../services/note'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NoteAdd = ({ setAddNote, setNotes, notes, setMessage, setShowMessage, setIsPositive }) => {
        const [newNoteText, setNewNoteText] = useState('')
        const [newNoteDate, setNewNoteDate] = useState('')
        const [newUserId, setNewUserId] = useState('')

        useEffect(() => {
            const userFromLS = localStorage.getItem('user')
            if(userFromLS) {
              setNewUserId(userFromLS)
              console.log(userFromLS)
            }
          }, [])

        const submitNote = (event) => {
            event.preventDefault()
            var newNote = {
                noteText: newNoteText,
                noteDate: newNoteDate,
                userId: newUserId
            } 
            const jwt = localStorage.getItem('token')
            NoteService.setToken(jwt)
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
                    setAddNote(false)
                }, 500);
        }
        return (
            <form onSubmit={submitNote}>
                <div className="lomake">
                <h4>Lisää muistiinpano</h4>
                <div>
                    <label>Päivämäärä</label><br></br>
                    <input id="notedate" type="datetime-local" value={newNoteDate}
                    onChange={({ target }) => setNewNoteDate(target.value)}/>
                </div>
                <div>
                <input id="notetext" type="text" value={newNoteText} placeholder="Muistiinpano" maxLength="250"
                onChange={({ target }) => setNewNoteText(target.value)} required/>
                </div>
                <div>
                    <p>Käyttäjä-ID: {newUserId} </p>
                </div>
                <button id="cancelnoteadd" className="nappi1" onClick={() => setAddNote(false)} style={{ background: 'red '}} title="Peruuta"><FontAwesomeIcon icon="far fa-window-close" /></button>
                <button id="submitnote" className="nappi" type="submit" style={{ background: 'green', marginLeft: '10px'}} title="Tallenna"><FontAwesomeIcon icon="far fa-check-square" /></button>
                </div>
            </form>
        )
}

export default NoteAdd