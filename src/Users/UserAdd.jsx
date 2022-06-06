import React, { useState } from 'react'
import '../App.css'
import UserService from '../services/user'
import md5 from 'md5'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserAdd = ({ setAddUser, setUsers, users, setMessage, setShowMessage, setIsPositive }) => {

        const [newEmail, setNewEmail] = useState('')
        const [newUserName, setNewUserName] = useState('')
        const [newPassword, setNewPassword] = useState('')
        const [passwordAgain, setPasswordAgain] = useState('')

        const submitUser = (event) => {
            event.preventDefault()
            if (newPassword !== passwordAgain) {
                setNewPassword('')
                setPasswordAgain('')
                return (alert('Salasanat eivät täsmänneet'))
            }
            var newUser = {
                username: newUserName,
                email: newEmail,
                password: md5(newPassword),
            } 
            
            UserService
                .create(newUser)
                .then(response => {
                    if (response.status === 200) {
                        setUsers(users.concat(newUser))

                        setMessage(`Lisätty käyttäjä ${newUser.username}`)
                        setIsPositive(true)
                        setShowMessage(true)

                        setTimeout(() => {
                            setShowMessage(false)
                        }, 6000);
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
                    setAddUser(false)
                }, 500);
        }

        return (
            <form onSubmit={submitUser}>
                <div id="useraddform" className="lomake">
                <h4>Lisää käyttäjä</h4>
                <div>
                <input id="emailinput" type="text" value={newEmail} placeholder="Sähköposti" maxLength="250"
                onChange={({ target }) => setNewEmail(target.value)} />
                </div>
                <div>
                <input id="userinput" type="text" value={newUserName} placeholder={"Käyttäjätunnus"} maxLength="20"
                 onChange={({ target }) => setNewUserName(target.value)} required />
                </div>
                <div>
                <input id="passwordinput" type="password" value={newPassword} placeholder="Salasana" maxLength="50"
                 onChange={({ target }) => setNewPassword(target.value)} required />
                </div>
                <div>
                <input id="passwordagaininput" type="password" value={passwordAgain} placeholder="Salasana uudestaan" maxLength="50"
                 onChange={({ target }) => setPasswordAgain(target.value)} required />
                </div>
                <button id="canceluseradd" className="nappi1" onClick={() => setAddUser(false)} style={{ background: 'red '}} title="Peruuta"><FontAwesomeIcon icon="far fa-window-close" /></button>
                <button id="submituser" className="nappi" type="submit" style={{ background: 'green', marginLeft: '10px'}} title="Tallenna"><FontAwesomeIcon icon="far fa-check-square" /></button>
                </div>
            </form>
        )
} 
export default UserAdd