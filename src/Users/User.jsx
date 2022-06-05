import React, { useState } from 'react'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const User = ({ user, handleDeleteClick, handleEditClick }) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <>
        <div className='notepage' onClick={() => setShowMore(!showMore)}>
        Käyttäjä: {user.username}
        <div className='buttons'>
        <button id="useredit" className="nappi2" onClick={() => handleDeleteClick(user.userId)} title="Poista"><FontAwesomeIcon icon="far fa-trash-alt" /></button>
        <button id="userdelete" className="nappi3" onClick={() => handleEditClick(user)} title="Muokkaa"><FontAwesomeIcon icon="far fa-edit" /></button>
        </div>
        </div>

        {showMore && <div className="lisatiedot">
                <div className="showMore">
                <div>Email: {user.email}</div>
                </div>
                </div>}
        </>
    )
}

export default User