import React, { useState, useEffect } from 'react'
import '../App.css'
import UserService from '../services/user'
import User from './User'
import Message from '../Message'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserList = () => {

    const [users, setUsers] = useState([]) 
    const [addUser, setAddUser] = useState(false)
    const [userArray, setUserArray] = useState([])
    const [currentUser, setCurrentUser] = useState()
    const [editUser, setEditUser] = useState(false)
    const [changedUser, setChangedUser] = useState({}) 
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
        UserService
            .setToken(token)
        UserService
            .getAll()
            .then(data => {
                if (cancel) return;
                setUserArray(data)
                const filtered = userArray.filter(filtered => filtered.username === currentUser)
                setUsers(filtered)
            })
    }, [addUser, editUser, userArray, currentUser])

    const handleDeleteClick = id => {
        const user = users.find(user => user.userId === id)
        const confirm = window.confirm(`Haluatko varmasti poistaa käyttäjän ${user.username}?`)
        if (confirm) {
            const jwt = localStorage.getItem('token')
            UserService.setToken(jwt)
            UserService.remove(id)
                .then(response => {
                    if (response.status === 200) {
                        setUsers(users.filter(filtered => filtered.userId !== id))
                        setMessage(`Käyttäjän ${user.username} poisto onnistui`)
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

    const handleEditClick = user => {
        setChangedUser(user)
        setEditUser(true)
    }

    if (!addUser && !editUser && users.length === 0) {
        return (
        <>
            <h1 className="otsikko"> Käyttäjät
            <button className="nappi" onClick={() => setAddUser(true)} style={{ background: 'green'}} title="Lisää"><FontAwesomeIcon icon="far fa-plus-square" /></button></h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <p>Lataa...</p>
        </>
        )
    }

    if (!addUser && users && !editUser) {
        return (
            <>
                <h1 className="otsikko"> Käyttäjät
                <button className="nappi" onClick={() => setAddUser(true)} style={{ background: 'green'}} title="Lisää"><FontAwesomeIcon icon="far fa-plus-square" /></button></h1>
                { showMessage && <Message message={message} isPositive={isPositive} /> }
                {users.map(user => <User key={user.username} user={user} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} /> )}
            </>
        )
    }

    if (addUser) {
        return (
        <>
            <h1 className="otsikko"> Käyttäjät </h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <UserAdd setAddUser={setAddUser} users={users} setUsers={setUsers} setMessage={setMessage} setShowMessage={setShowMessage}
            setIsPositive={setIsPositive} />
        </>
        )
    }

    if (editUser) {
        return (
        <>
            <h1 className="otsikko"> Käyttäjät </h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <UserEdit setEditUser={setEditUser} changedUser={changedUser} users={users} setUsers={setUsers} setMessage={setMessage} setShowMessage={setShowMessage}
            setIsPositive={setIsPositive} />
        </>
        )
    }
}

export default UserList