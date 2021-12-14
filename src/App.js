import './App.css';
import LocationList from './Location/LocationList'
import NoteList from './Note/NoteList'
import PainlogList from './Painlog/PainlogList'
import Homepage from './Homepage'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
        <Router>
      <Navbar className="navbarOma">
      <Link to={'/'} className='nav-link'>Etusivu</Link>
        <Nav className="mr-auto">
          <Link to={'/Painlog'} className='nav-link'>Kipumerkinnät</Link>
          <Link to={'/Location'} className='nav-link'>Sijainnit</Link>
          <Link to={'/Note'} className='nav-link'>Muistiinpanot</Link>
          </Nav>
      </Navbar>

{/* Switchin kohtaan renderöityy esim CustomerList customers-näkymässä */}
      <Routes>
        <Route path='/Painlog' element={<PainlogList/>} />
        <Route path='/Location' element={<LocationList/>} />
        <Route path='/Note' element={<NoteList/>} />
        <Route path='/' element={<Homepage/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
