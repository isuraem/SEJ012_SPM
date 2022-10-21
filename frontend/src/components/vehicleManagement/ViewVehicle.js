import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function ViewVehicle(vehicle) {

    //console.log("model open", vehicle)

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Vehicle Registration Number  : {vehicle.data.VehicleRegNo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-12">
                     

                        <table class="table table-striped table-light ">



                            <tbody>

                                <tr>
                                    <th class="text-left" scope="row">
                                        Vehicle Owner Name
                                    </th>
                                    <td class="text-left">{vehicle.data.OwnerName}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Owner NIC
                                    </th>
                                    <td class="text-left">{vehicle.data.OwnerNIC}</td>
                                </tr><tr>
                                    <th class="text-left" scope="row">
                                        Telephone Number
                                    </th>
                                    <td class="text-left">0{vehicle.data.TeleNo}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Address
                                    </th>
                                    <td class="text-left">{vehicle.data.Address}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Email
                                    </th>
                                    <td class="text-left">{vehicle.data.Email}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Date vehicle registerd to company
                                    </th>
                                    <td class="text-left">{vehicle.data.Date}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Vehicle Brand
                                    </th>
                                    <td class="text-left">{vehicle.data.VehicleBrand}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Vehicle Model
                                    </th>
                                    <td class="text-left">{vehicle.data.VehicleModel}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Vehicle Type
                                    </th>
                                    <td class="text-left">{vehicle.data.VehicleType}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Mileage
                                    </th>
                                    <td class="text-left">{vehicle.data.Mileage}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Insuarence Type
                                    </th>
                                    <td class="text-left">{vehicle.data.InsType}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Insuarence Company Name
                                    </th>
                                    <td class="text-left">{vehicle.data.InsComName}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Transmission
                                    </th>
                                    <td class="text-left">{vehicle.data.Transmission}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Air Condition
                                    </th>
                                    <td class="text-left">{vehicle.data.AirC}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Number Of Seats
                                    </th>
                                    <td class="text-left">{vehicle.data.NoOfSeats}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Rate Per Day
                                    </th>
                                    <td class="text-left">Rs.{vehicle.data.RatePDay}.00</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Years of Rental
                                    </th>
                                    <td class="text-left">{vehicle.data.YearsRent}</td>
                                </tr>



                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-close" onClick={vehicle.onHide}>Close</button>
            </Modal.Footer>
        </div>
    )
}

export default ViewVehicle