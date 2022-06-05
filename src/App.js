import React, { useEffect, useState } from 'react';
import './App.css';
import LocationList from './Location/LocationList'
import NoteList from './Note/NoteList'
import PainlogList from './Painlog/PainlogList'
import UserList from './Users/UserList'
import Homepage from './Homepage'
import LoginForm from './LoginForm'
import Message from './Message'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import reactDom from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { faFileAlt, faSadTear, faEdit, faTrashAlt, faCheckSquare, faWindowClose, faPlusSquare, faUser } from '@fortawesome/free-regular-svg-icons'
import { faSignOutAlt, faSignInAlt, faMapMarkerAlt, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(far, faFileAlt, faSadTear, faEdit, faTrashAlt, faCheckSquare, faWindowClose, faPlusSquare, faSignOutAlt, faUser, faMapMarkerAlt, faHome, faSignInAlt)

function App() {
  const [currentUser, setCurrentUser] = useState()
  const [showMessage, setShowMessage] = useState(false)
  const [isPositive, setIspositive] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const userFromLS = localStorage.getItem('user')
    if(userFromLS) {
      setCurrentUser(userFromLS)
    }
  }, [])

  if (currentUser) {
  return (
    <div className='kipukalenteri'>
      <Router>
      <Navbar className="navbarOma">
        <Nav>
          <Link to={''} className='nav-link' style={{ color: 'white'}} title="Etusivu"><FontAwesomeIcon icon="fas fa-home" /></Link>
          <Link to={'/Painlog'} className='nav-link' style={{ color: 'white'}} title="Kipumerkinnät"><FontAwesomeIcon icon="far fa-sad-tear" /></Link>
          <Link to={'/Location'} className='nav-link' style={{ color: 'white'}} title="Kivun sijainti"><FontAwesomeIcon icon="fas fa-map-marker-alt" /></Link>
          <Link to={'/Note'} className='nav-link'style={{ color: 'white'}} title="Muistiinpanot"><FontAwesomeIcon icon="far fa-file-alt" /></Link>
          <Link to={'/User'} className='nav-link'style={{ color: 'white'}} title="Käyttäjät"><FontAwesomeIcon icon="far fa-user" /></Link>
          <LoginForm currentUser={currentUser} setCurrentUser={setCurrentUser} setMessage={setMessage} setIspositive={setIspositive} setShowMessage={setShowMessage}/>
          </Nav>
      </Navbar>

      {showMessage && <Message message={message} isPositive={isPositive} />}

      <Routes>
        <Route index element={<Homepage/>} />
        <Route path='/Painlog' element={<PainlogList/>} />
        <Route path='/Location' element={<LocationList/>} />
        <Route path='/Note' element={<NoteList/>} />
        <Route path='/User' element={<UserList/>} />
      </Routes>
    </Router>
    </div>
  );
}
else {
  return (
    <div className="kipukalenteri">
      <Router>
      <Navbar className="navbarOma">
        <Nav>
          <Link to={'/User'} className='nav-link'style={{ color: 'white'}}></Link>
          </Nav>
      </Navbar>
      <LoginForm currentUser={currentUser} setCurrentUser={setCurrentUser} setMessage={setMessage} setIspositive={setIspositive} setShowMessage={setShowMessage} />
      {showMessage && <Message message={message} isPositive={isPositive} />}
      <Routes>
      </Routes>
    </Router>

    </div>
  )
}
}

export default App;
