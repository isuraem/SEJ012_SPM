import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";


function Reservationview(reservations) {

    //console.log("model openingggg", reservations)

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Customer Name : {reservations.data.customername}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-12">
                        <table class="table table-striped table-light ">
                            <tbody>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Customer Name : 
                                    </th>
                                    <td class="text-left">{reservations.data.customername}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Customer Contact No :
                                    </th>
                                    <td class="text-left">{reservations.data.contactnumber}</td>
                                </tr><tr>
                                    <th class="text-left" scope="row">
                                        Customer Address :
                                    </th>
                                    <td class="text-left">{reservations.data.customeraddress}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Customer NIC :
                                    </th>
                                    <td class="text-left">{reservations.data.customernic}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Package Name :
                                    </th>
                                    <td class="text-left">{reservations.data.packagename}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Event Type : 
                                    </th>
                                    <td class="text-left">{reservations.data.eventtype}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        From :
                                    </th>
                                    <td class="text-left">{reservations.data.from}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        To :
                                    </th>
                                    <td class="text-left">{reservations.data.to}</td>
                                </tr>
                                <tr>
                                    <th class="text-left" scope="row">
                                        Advanced Payment :
                                    </th>
                                    <td class="text-left">{reservations.data.advancedpayment}</td>
                                </tr>
                                
                                <tr>
                                    <th class="text-left" scope="row">
                                        Total Reservation : 
                                    </th>
                                    <td class="text-left">{reservations.data.totalreservation}</td>
                                </tr>
                                 <tr>
                                    <th class="text-left" scope="row">
                                        Status : 
                                    </th>
                                    <td class="text-left">{reservations.data.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-close" onClick={reservations.onHide}>Close</button>
            </Modal.Footer>
        </div>
    )
}

export default Reservationview
