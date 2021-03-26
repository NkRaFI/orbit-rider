import React, { useContext, useEffect, useState } from 'react';
import { VehicleTypeContext } from '../../App';
import fakeData from '../../fakeData/fakeData.json';
import Header from '../Header/Header';
import Map from '../Map/Map';
import VehicleDetail from '../VehicleDetail/VehicleDetail';
import './Destination.css';

const Destination = () => {
    const vehicleType = useContext(VehicleTypeContext)[0];
    const [vehicles, setVehicles] = useState(fakeData);
    console.log(setVehicles);
    const [chosenVehicle, setChosenVehicle] = useState([]);
    useEffect(() => {
        const matchedVehicles = vehicles.filter(vehicle => vehicle.vehicleType.toLowerCase() === vehicleType.toLowerCase());
        setChosenVehicle(matchedVehicles);
    }, [vehicleType, vehicles]);
    const [destination,setDestination] = useState({
        pickFrom: '',
        pickTo: '',
        pickupDate: ''
    })
    const handleBlur =(e)=>{
        if(e.target.name === 'pickFrom'){
            const newDestinationInfo = {...destination};
            newDestinationInfo[e.target.name] = e.target.value;
            setDestination(newDestinationInfo);
        }
        if(e.target.name === 'pickTo'){
            const newDestinationInfo = {...destination};
            newDestinationInfo[e.target.name] = e.target.value;
            setDestination(newDestinationInfo);
        }
        if(e.target.name === 'pickDate'){
            const newDestinationInfo = {...destination};
            newDestinationInfo[e.target.name] = e.target.value;
            setDestination(newDestinationInfo);
        }
    }

    const [infoAvailable, setInfoAvailable] = useState(false)
    const handleSubmit = (e) => {
        if(destination.pickFrom && destination.pickTo){
            setInfoAvailable(true)
        }
        e.preventDefault();
    }

    return (
        <div className="container">
            <Header></Header>
            <div className="row my-3">
                <div className="col-12 col-lg-4 my-3">
                    <div className="bg-color p-3 rounded">
                        {
                            infoAvailable
                            ?
                            <div>
                                <div className="bg-danger text-white px-2 py-4 rounded font-weight-bold">
                                    <ul>
                                        <li>{destination.pickFrom.toUpperCase()}</li>
                                        <br/>
                                        <li>{destination.pickTo.toUpperCase()}</li>
                                    </ul>
                                </div>
                                <div>
                                    {
                                    chosenVehicle.map(vh => <VehicleDetail vehicle={vh} destination={destination} key={vh.id}></VehicleDetail>) 
                                    }
                                </div>
                            </div>
                            : 
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="pickFrom">Pick From</label>
                                <input onBlur={handleBlur} className="form-control" name="pickFrom" type="text" id="pickFrom" required/>
                                <label htmlFor="pickTo">Pick To</label>
                                <input onBlur={handleBlur} className="form-control" name="pickTo" type="text" id="pickTo" required/>
                                <label htmlFor="pickupDate">Pickup Date</label>
                                <input onBlur={handleBlur} className="form-control" name="pickupDate" type="date" id="pickTo" required/>
                                <br/>
                                <input className="form-control bg-danger text-white" type="submit" value="Search"/>
                            </form>
                        }
                    </div>
                </div>
                <div className="col-12 col-lg-8 my-3 map">
                    <Map></Map>
                </div>
            </div>
        </div>
    );
};

export default Destination;