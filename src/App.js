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
    <div className='kipukalenteri'>
      <Router>
      <Navbar className="navbarOma">
        <Nav>
          <Link to={'/'} className='nav-link' style={{ color: 'white'}}>Etusivu</Link>
          <Link to={'/Painlog'} className='nav-link' style={{ color: 'white'}}>Merkinnät</Link>
          <Link to={'/Location'} className='nav-link' style={{ color: 'white'}}>Sijainnit</Link>
          <Link to={'/Note'} className='nav-link'style={{ color: 'white'}}>Muistiinpanot</Link>
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

// nav className='mr-auto'

export default App;
