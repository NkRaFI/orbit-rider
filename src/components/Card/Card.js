import './Card.css';
import React, { useContext} from 'react';
import bikeImg from '../../images/Frame.png';
import busImg from '../../images/Frame-1.png';
import carImg from '../../images/Frame-2.png';
import trainImg from '../../images/Frame-3.png';
import { useHistory } from 'react-router';
import { VehicleTypeContext } from '../../App';


const Card = () => {
    const setVehicleType = useContext(VehicleTypeContext)[1]
    const history = useHistory();
    const handleDestination = (vehicleType) => {
        const url = '/destination';
        history.push(url);
        setVehicleType(vehicleType);
    }

    return (
        <div className="container p-5">
            <div className="row p-5">
                <div className="col-12 col-lg-3">
                    <div onClick={()=>handleDestination("bike")} className="vehicle-card bg-light text-center m-3 p-4 rounded">
                        <img className="img-fluid" src={bikeImg} alt=""/>
                        <h4 className="my-3">Bike</h4>
                    </div>
                </div>
                <div className="col-12 col-lg-3">
                    <div onClick={()=>handleDestination("car")} className="vehicle-card bg-light text-center m-3 p-4 rounded">
                        <img className="img-fluid" src={carImg} alt=""/>
                        <h4 className="my-3">Car</h4>
                    </div>
                </div>
                <div className="col-12 col-lg-3">
                    <div onClick={()=>handleDestination("bus")} className="vehicle-card bg-light text-center m-3 p-4 rounded">
                        <img className="img-fluid" src={busImg} alt=""/>
                        <h4 className="my-3">Bus</h4>
                    </div>
                </div>
                <div className="col-12 col-lg-3">
                    <div onClick={()=>handleDestination("train")} className="vehicle-card bg-light text-center m-3 p-4 rounded">
                        <img className="img-fluid" src={trainImg} alt=""/>
                        <h4 className="my-3">Train</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;