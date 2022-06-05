import React, { useState } from "react"
import './App.css'
import AuthService from './services/auth'
import md5 from "md5"
import UserAdd from './Users/UserAdd'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LoginForm = ({ currentUser, setCurrentUser, setMessage, setIsPositive, setShowMessage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [addUser, setAddUser] = useState(false)
    const [users, setUsers] = useState([])

    const authenticate = (event) => {
        event.preventDefault()
        const userForAuth = {
            username: username,
            password: md5(password)
        }
        AuthService
        .authenticate(userForAuth)
        .then(response => {
            localStorage.setItem('user', response.username)
            localStorage.setItem('token', response.token)
            setCurrentUser(response.username)
            setMessage(`Tervetuloa ${response.username}`)
            setIsPositive(true)
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            }, 4000)
        })
        .catch(error => {
            setMessage(`Error ${error}`)
            setIsPositive(false)
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            }, 4000
            )
        })
    }

    const logout = () => {
        localStorage.clear()
        setCurrentUser(null)
        setMessage(`Kirjauduttu ulos`)
        setIsPositive(true)
        setShowMessage(true)
        setTimeout(() => {
            setShowMessage(false)            
        }, 4000);
    }

    const emptyFields = () => {
        setPassword('')
        setUsername('')
    }

    if (addUser) {
        return (
        <>
            <h1 className="otsikko"> Käyttäjät </h1>
            <UserAdd setAddUser={setAddUser} users={users} setUsers={setUsers} />
        </>
        )
    }

    if (!currentUser) {
        return (
            <>
            <form className="locationform" style={{ marginTop: '5px', width: '600px'}} onSubmit={authenticate}>
            <div className="lomake">
                <input id="hpuserinput" className="login-input" value={username} type="text" placeholder="Käyttäjätunnus" onChange={({ target }) => setUsername(target.value)} />
                <input id="hpuserpass" className="login-input" value={password} type="password" placeholder="Salasana" onChange={({ target }) => setPassword(target.value)} />
                <button className="nappi1" onClick={emptyFields} style={{ background: 'red '}} title="Tyhjennä"><FontAwesomeIcon icon="far fa-window-close" /></button>
                <button id="submitlogin" className="nappi" type="submit" style={{ background: 'green'}} title="Kirjaudu"><FontAwesomeIcon icon="fas fa-sign-in-alt" /></button>
                <button className="nappi" onClick={() => setAddUser(true)} style={{ background: 'green'}} title="Lisää"><FontAwesomeIcon icon="far fa-plus-square" /></button>
            </div>
            </form>

            </>
        )
    }
    else if (currentUser) {
        return (
            <div className="logged-in">
                <div style={{ color: 'white' }}>{`Kirjautuneena ${currentUser}`}
                <button id="logout" className="nappi4" style={{ background: 'red'}}onClick={logout} title="Kirjaudu ulos"><FontAwesomeIcon icon="fas fa-sign-out-alt" /></button>
                </div>
            </div>
        )
    }
}
export default LoginForm