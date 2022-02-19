import React, { useState, useEffect } from 'react'
import '../App.css'
import NoteService from '../services/note'
import Note from './Note'
import Message from '../Message'
import NoteAdd from './NoteAdd'
import NoteEdit from './NoteEdit'

const NoteList = () => {

    const [notes, setNotes] = useState([]) // tietotyyppi on taulukko
    const [addNote, setAddNote] = useState(false)

    const [editNote, setEditNote] = useState(false)
    const [changedNote, setChangedNote] = useState({}) 

    const [showMessage, setShowMessage] = useState(false)
    const [isPositive, setIsPositive] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        NoteService
            .getAll()
            .then(data => {
                console.log(data)
                setNotes(data)
            })
    }, [addNote, editNote])

    const handleDeleteClick = id => {
        const note = notes.find(note => note.noteId === id)
        const confirm = window.confirm(`Haluatko todella poistaa muistiinpanon pysyvästi?`)

        if (confirm) {

            NoteService.remove(id)
                .then(response => {
                    if (response.status === 200) {
                        // Poistetaan login statesta
                        setNotes(notes.filter(filtered => filtered.noteId !== id))

                        setMessage(`Muistiinpanon poisto onnistui`)
                        setIsPositive(true)
                        setShowMessage(true)
                        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

                        setTimeout(() => {
                            setShowMessage(false)
                        }, 4000 )
                    } //if
                }) //.then
                .catch(error => {
                    console.log(error)
                    setMessage(`Tapahtui virhe: ${error}`)
                    setIsPositive(false)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 7000 )
                }) //.catch
        } //if
        else {
            setMessage('Poisto peruutettu')
            setIsPositive(true)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 4000 )
        } //else
    } // handleDeleteClick

    const handleEditClick = note => {
        setChangedNote(note)
        setEditNote(true)
    }

    if (!addNote && !editNote && notes.length === 0) {
        return (
        <>
            <h1 className="otsikko"> Muistiinpanot
            <button className="nappi" onClick={() => setAddNote(true)}>Lisää uusi</button></h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <p>Lataa...</p>
        </>
        ) //return
    } //if

    if (!addNote && notes && !editNote) {
        return (
            <>
                <h1 className="otsikko"> Muistiinpanot
                <button className="nappi" onClick={() => setAddNote(true)}>Lisää</button></h1>
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