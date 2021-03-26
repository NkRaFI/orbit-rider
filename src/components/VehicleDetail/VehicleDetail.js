import React from 'react';
import './VehicleDetail.css';
import peopleIcon from '../../images/peopleicon.png';

const VehicleDetail = (props) => {
    const {vehicleType, imgUrl, totalSeats, price} = props.vehicle;
    return (
            <div className="d-flex my-3 bg-white p-3 rounded font-weight-bold">
                <img className="img-fluid vehicleTypeImg mr-3" src={imgUrl} alt=""/>
                <div className="d-flex mx-5">
                    <div><p>{vehicleType}</p></div>
                    <div><img className="peopleIcon m-2" src={peopleIcon} alt=""/></div>
                    <div><p className="">{totalSeats}</p></div>
                </div>
                <p className="ml-3">${price}</p>
            </div>
    );
};

export default VehicleDetail;