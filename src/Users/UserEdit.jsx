import React, { useState } from 'react'
import '../App.css'
import UserService from '../services/user'
import md5 from 'md5'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserEdit = ({ setEditUser, setUsers, users, setMessage, setShowMessage, setIsPositive, changedUser }) => {  
        const [newUserId, setNewUserId] = useState(changedUser.userId)
        const [newEmail, setNewEmail] = useState(changedUser.email)
        const [newUserName, setNewUserName] = useState(changedUser.username)
        const [newPassword, setNewPassword] = useState(changedUser.password)
        const [passwordAgain, setPasswordAgain] = useState('')

        const submitUser = (event) => {
            event.preventDefault()
            if (newPassword !== passwordAgain) {
                setNewPassword('')
                setPasswordAgain('')
                return (alert('Salasanat eivät täsmänneet'))
            }
            var changedUser = {
                userId: newUserId,
                username: newUserName,
                email: newEmail,
                password: md5(newPassword),
            } 
            const jwt = localStorage.getItem('token')
            UserService.setToken(jwt)
            UserService
            .update(changedUser)
            .then(response => {
                if (response.status === 200) {
                    const id = changedUser.username
                    setUsers(users.filter(filtered => filtered.username !== id))
                    setUsers(users.concat(changedUser))
                    setMessage(`Päivitetty käyttäjää ${changedUser.username}`)
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
                setEditUser(false)
            }, 500);
        }

        return (
            <form onSubmit={submitUser}>
                <div id="usereditform" className="lomake">
                <h4>Muokkaa käyttäjää</h4>
                <div>
                <input id="eemailinput" type="text" value={newEmail} placeholder={changedUser.email} maxLength="250"
                onChange={({ target }) => setNewEmail(target.value)} required />
                </div>
                <div>
                <input id="epasswordinput" type="password" value={newPassword} placeholder="Salasana" maxLength="50"
                 onChange={({ target }) => setNewPassword(target.value)} required />
                </div>
                <div>
                <input id="epasswordagaininput" type="password" value={passwordAgain} placeholder="Salasana uudestaan" maxLength="50"
                 onChange={({ target }) => setPasswordAgain(target.value)} required />
                </div>
                <div>
                    <p>Käyttäjä: {changedUser.username}</p>
                </div>
                <button id="canceluseredit" className="nappi1" onClick={() => setEditUser(false)} style={{ background: 'red '}} title="Peruuta"><FontAwesomeIcon icon="far fa-window-close" /></button>
                <button id="submituseredit" className="nappi" type="submit" style={{ background: 'green', marginLeft: '10px'}} title="Tallenna"><FontAwesomeIcon icon="far fa-check-square" /></button>
                </div>
            </form>
        )
}
export default UserEdit