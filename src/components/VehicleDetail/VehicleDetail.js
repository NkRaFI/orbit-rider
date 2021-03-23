import React from 'react';

const VehicleDetail = (props) => {
    const {vehicleType, imgUrl, totalSeats, price} = props.vehicle;
    return (
        <div className="container">
            <h3>vehicle type: {vehicleType}</h3>
        </div>
    );
};

export default VehicleDetail;