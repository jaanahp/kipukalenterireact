import React, { useState, useEffect } from 'react'
import '../App.css'
import PainlogService from '../services/painlog'
import Painlog from './Painlog'
import Message from '../Message'
import PainlogAdd from './PainlogAdd'
import PainlogEdit from './PainlogEdit'

const PainlogList = () => {

    const [painlogs, setPainlogs] = useState([]) // tietotyyppi on taulukko
    const [addPainlog, setAddPainlog] = useState(false)

    const [editPainlog, setEditPainlog] = useState(false)
    const [changedLog, setChangedLog] = useState({}) 

    const [showMessage, setShowMessage] = useState(false)
    const [isPositive, setIsPositive] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        PainlogService
            .getAll()
            .then(data => {
                console.log(data)
                setPainlogs(data)
            })
    }, [addPainlog, editPainlog])

    const handleDeleteClick = id => {
        const log = painlogs.find(log => log.logaId === id)
        const confirm = window.confirm(`Haluatko todella poistaa merkinnän pysyvästi?`)

        if (confirm) {

            PainlogService.remove(id)
                .then(response => {
                    if (response.status === 200) {
                        // Poistetaan login statesta
                        setPainlogs(painlogs.filter(filtered => filtered.logId !== id))

                        setMessage(`merkinnän poisto onnistui!`)
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

    const handleEditClick = log => {
        setChangedLog(log)
        setEditPainlog(true)
    }

    if (!addPainlog && !editPainlog && painlogs.length === 0) {
        return (
        <>
            <h1 className="otsikko"> Kipumerkinnät
            <button className="nappi" onClick={() => setAddPainlog(true)}>Lisää uusi</button></h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <p>Lataa...</p>
        </>
        ) //return
    } //if

    if (!addPainlog && painlogs && !editPainlog) {
        return (
            <>
                <h1 className="otsikko"> Kipumerkinnät
                <button className="nappi" onClick={() => setAddPainlog(true)}>Lisää</button></h1>
                { showMessage && <Message message={message} isPositive={isPositive} /> }
                {painlogs.map(log => <Painlog key={log.logId} log={log} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} /> )}
            </>
        ) //return
    } //if

    if (addPainlog) {
        return (
        <>
            <h1 className="otsikko"> Kipumerkinnät </h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <PainlogAdd setAddPainlog={setAddPainlog} painlogs={painlogs} setPainlogs={setPainlogs} setMessage={setMessage} setShowMessage={setShowMessage}
            setIsPositive={setIsPositive} />
        </>
        ) // return
    } //if

    if (editPainlog) {
        return (
        <>
            <h1 className="otsikko"> Kipumerkinnät </h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <PainlogEdit setEditPainlog={setEditPainlog} changedLog={changedLog} painlogs={painlogs} setPainlogs={setPainlogs} setMessage={setMessage} setShowMessage={setShowMessage}
            setIsPositive={setIsPositive} />
        </>
        )//return
    }

} 

export default PainlogList