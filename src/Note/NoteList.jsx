import React, { useState, useEffect } from 'react'
import '../App.css'
import NoteService from '../services/note'
import Note from './Note'
import Message from '../Message'
import NoteAdd from './NoteAdd'
import NoteEdit from './NoteEdit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NoteList = () => {

    const [notes, setNotes] = useState([])
    const [addNote, setAddNote] = useState(false)
    const [noteArray, setNoteArray] = useState([])
    const [currentUser, setCurrentUser] = useState()
    const [editNote, setEditNote] = useState(false)
    const [changedNote, setChangedNote] = useState({}) 
    const [showMessage, setShowMessage] = useState(false)
    const [isPositive, setIsPositive] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        const userFromLS = localStorage.getItem('user')
        if(userFromLS) {
          setCurrentUser(userFromLS)
        }
      }, [])

    useEffect(() => {
        let cancel = false;
        const token = localStorage.getItem('token')
        NoteService
            .setToken(token)
        NoteService
            .getAll()
            .then(data => {
                if (cancel) return;
                setNoteArray(data)
                const filtered = noteArray.filter(filtered => filtered.userId === currentUser)
                setNotes(filtered)
            })

            return () => {
                cancel = true;
        }
    }, [addNote, editNote, noteArray, currentUser])

    const handleDeleteClick = id => {
        const note = notes.find(note => note.noteId === id)
        const confirm = window.confirm(`Haluatko todella poistaa muistiinpanon pysyvästi?`)
        if (confirm) {
            const jwt = localStorage.getItem('token')
            NoteService.setToken(jwt)
            NoteService.remove(id)
                .then(response => {
                    if (response.status === 200) {
                        setNotes(notes.filter(filtered => filtered.noteId !== id))
                        setMessage(`Muistiinpanon poisto onnistui`)
                        setIsPositive(true)
                        setShowMessage(true)
                        window.scrollBy(0, -10000)
                        setTimeout(() => {
                            setShowMessage(false)
                        }, 4000 )
                    }
                })
                .catch(error => {
                    console.log(error)
                    setMessage(`Tapahtui virhe: ${error}`)
                    setIsPositive(false)
                    setShowMessage(true)
                    setTimeout(() => {
                        setShowMessage(false)
                    }, 7000 )
                })
        }
        else {
            setMessage('Poisto peruutettu')
            setIsPositive(true)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 4000 )
        }
    }

    const handleEditClick = note => {
        setChangedNote(note)
        setEditNote(true)
    }

    if (!addNote && !editNote && notes.length === 0) {
        return (
        <>
            <h1 className="otsikko"> Muistiinpanot
            <button className="nappi" onClick={() => setAddNote(true)} style={{ background: 'green'}} title="Lisää"><FontAwesomeIcon icon="far fa-plus-square" /></button></h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <p>Lataa...</p>
        </>
        ) //return
    } //if

    if (!addNote && notes && !editNote) {
        return (
            <>
                <h1 className="otsikko"> Muistiinpanot
                <button id="addnote1" className="nappi" onClick={() => setAddNote(true)} style={{ background: 'green'}} title="Lisää"><FontAwesomeIcon icon="far fa-plus-square" /></button></h1>
                { showMessage && <Message message={message} isPositive={isPositive} /> }
                {notes.map(note => <Note key={note.noteId} note={note} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} /> )}
            </>
        ) //return
    } //if

    if (addNote) {
        return (
        <>
            <h1 className="otsikko"> Muistiinpanot </h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <NoteAdd setAddNote={setAddNote} notes={notes} setNotes={setNotes} setMessage={setMessage} setShowMessage={setShowMessage}
            setIsPositive={setIsPositive} />
        </>
        ) // return
    } //if

    if (editNote) {
        return (
        <>
            <h1 className="otsikko"> Muistiinpanot </h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <NoteEdit setEditNote={setEditNote} changedNote={changedNote} notes={notes} setNotes={setNotes} setMessage={setMessage} setShowMessage={setShowMessage}
            setIsPositive={setIsPositive} />
        </>
        )//return
    }

} 

export default NoteList