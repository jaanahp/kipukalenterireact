import React, { useState, useEffect } from 'react'
import '../App.css'
import LocationService from '../services/location'

const Painlog = ({ log, handleDeleteClick, handleEditClick }) => {

    const [showMore, setShowMore] = useState(false);
    const [locations, setLocations] = useState([]);

    var dateStart = new Date(log.startTime).toLocaleDateString('fi-FI', {hour: '2-digit', minute: '2-digit'});
    var dateEnd = new Date(log.endTime).toLocaleDateString('fi-FI', {hour: '2-digit', minute: '2-digit'});

    useEffect(() => {
        // this resolves the problem async task is causing
        let cancel = false;

        LocationService
            .getAll()
            .then(data => {
                if (cancel) return;
                // console.log(data)
                setLocations(data)
            });

            // cleanup-function to prevent the setLocations to be called if the component has been unmounted
            return () => {
                cancel = true;
            }

    }, [])

    const id = log.locationId
    const location = locations.find(loc => loc.locationId === log.locationId) 

    const time = log.duration
    const [hours, minutes] = [Math.floor(time/60), time%60];

    if (locations !== null && locations !== undefined) {
 
        return (
            <>
            <div className='notepage' onClick={() => setShowMore(!showMore)}>
            Alkupäivämäärä: {dateStart} <br></br> Kivun sijainti: {location && location.locationName}
            <div className="buttons">
            <button className="nappi2" onClick={() => handleDeleteClick(log.logId)}>Poista</button>
            <button className="nappi3" onClick={() => handleEditClick(log)}>Muokkaa</button>
            </div>
            </div>
    
            {showMore && <div className="lisatiedot">
                <div className="showMore">
                <div>Kivun intensiteetti: {log.painIntensity}</div>
                <div>Loppumisaika: {dateEnd}</div>
                <div>Kivun kesto: {hours} h {minutes} min</div>
                <div>Lääkitys: {log.medication}</div>
                {/* <div>Kivun sijainti: {log.locationId} {locationA.locationName}</div> */}
                <div>Aiheuttaja: {log.painTrigger}</div>
                <div>Kivun tyyppi: {log.painType}</div>
                <div>Lisätiedot: {log.notes}</div>
                </div>
                </div>}
            </>
        ) //return päättyy

    } else {
        return (
            <p>Ladataan...</p>
        )
    }
 


}

export default Painlog