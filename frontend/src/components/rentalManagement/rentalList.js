import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2';

import Header from "../../Header";
import RentalUpdateModal from "./modals/RentalUpdate";

function RentalList() {

    let history = useHistory();

    
    const [rentalList, setRentalList] = useState([]);
   
    const [modalDataDelete, setModalDataDelete] = useState([]);
    const [modalDeleteConfirm, setModalDeleteConfirm] = useState(false);

    const [modalDataUpdate, setModalDataUpdate] = useState([]);
    const [modalUpdate, setModalUpdate] = useState(false);
   

    useEffect(() => {

      
            function getRentals() {
                axios.get("http://localhost:8070/rental/displayRentals").then((res) => { //normally the fetched rental record details are displayed through this
                    //setRentals(res.data.reverse());
                    setRentalList(res.data.reverse());
                }).catch((error) => {
                    alert(error.message);
                    
                })
            }
            getRentals();
    }, []);

    const deleteRental = async (data) => {
        console.log("----------------",data);
        
                console.log("modalDataDelete.fyiff",modalDataDelete);
                    const value = axios.post("http://localhost:8070/rental/deleteRental", modalDataDelete);
                    //console.log("deletedddd", value);
                    if (value) {
                        // alert("**Permenantly deleted the Vehicle Record");
                        // window.location.replace("/viewReservation");
                        Swal.fire({
                            title: 'Success!',
                            text: 'Permenantly deleted the Vehicle Record &  added successfully !!',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }
                        ).then(() => {
                            window.location.reload();
                        })
        
        
        
                    }
        
            }

    const openModalDelete = (data) => {
        setModalDataDelete(data);
        setModalDeleteConfirm(true);
    }


    function refreshPage() {
        window.location.reload();
    }

    const openModalUpdate = (data) => {

        console.log("request came for modal updateeeeeee", data);
        setModalDataUpdate(data);
        setModalUpdate(true);

    }



    return (
        <div className="page-component-body">
            <Header></Header>
            
            <div className="table-emp ">
                <div class="row table-head mt-3">
                    <div class="col">
                        <h3 className="float-left" onClick={refreshPage}>List of Rentals</h3>
                    </div>
                    <a href="/addRental" class="float-right" id="addRecs">
                        <button class="btn btn-ok white" id="addRec">
                            + Add Rental
                        </button>
                    </a>
                    
                </div>
                <div class="row table-head-search">
                    <div className="col-md-8"></div>

                    <div className="col">
                        <div class="input-group input-group-search">
                           
                        </div>
                    </div>

                </div>


                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Vehicle</th>
                            <th>NIC</th>
                            <th>Customer Name</th>
                            <th>Total (Rs.)</th>
                            <th>Status</th>
                            <th>Action</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {rentalList.map((rental) => {
                            return (

                                <tr >

                                    <td >{rental.from}</td>
                                    <td >{rental.to}</td>
                                    <td >{rental.vehicleType}</td>
                                    <td >{rental.customerNIC}</td>
                                    <td >{rental.customerName}</td>
                                    <td >{rental.finalPrice.toFixed(2)}</td>
                                    <td >{rental.status}</td>
                                    <td>

                                        <button
                                            class="btn btn-light btn-sm"
                                            onClick={() => openModalUpdate(rental)}
                                        >
                                            update
                                        </button>
                                        <button class="btn btn-danger btn-sm" 
                                        onClick={() => openModalDelete(rental)}
                                        > remove</button>

                                    </td>
                                   
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <Modal show={modalDeleteConfirm} onHide={() => setModalDeleteConfirm(false)} size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you want to delete this item ?</p>

                </Modal.Body>
                <Modal.Footer>
                    <div className="row">
                        <div className="col -6">
                            <button type="submit" className="btn btn-delete" onClick={() => { deleteRental(modalDataDelete); }}>
                                Confirm
                            </button>
                        </div>
                        <div className="col-6 text-right" onClick={() => setModalDeleteConfirm(false)}>
                            <button type="reset" className="btn btn-reset">
                                cancel
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

    

            <Modal
                show={modalUpdate}
                onHide={() => setModalUpdate(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <RentalUpdateModal
                    data={modalDataUpdate}
                    onHide={() => setModalUpdate(false)}
                />
            </Modal>


        </div >
    )
}

export default RentalList;
