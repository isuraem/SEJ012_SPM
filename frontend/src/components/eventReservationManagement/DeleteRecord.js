import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import moment from 'moment';
import Header from "../../Header";
import TestModal from "./modals/deleteview";



function DeleteRecord() {

    const [viewreservation, setviewreservation] = useState([]);
    const [modalData, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const [modalLoading, setModalLoading] = useState(false);



    useEffect(() => {


        function getReservation() {
            axios.get("http://localhost:8070/removedEvent/displayRemovedReservation").then((res) => { //normally the fetched rental record details are displayed through this
              
                setviewreservation(res.data.reverse());
            }).catch((error) => {

                setModalLoading(true);
            })
        }
        getReservation();




    }, [])


    const openModal = (reservations) => {
        setData(reservations);
        handleViewOnClick();
    }

    const handleViewOnClick = () => {
        console.log("req came for modal");
        console.log(modalData, "data came for modalllllll");
        setModalShow(true);
    }


    function refreshPage() {
        window.location.reload();
    }



    return (
        <div className="page-component-body">
            <Header></Header>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <TestModal
                    data={modalData}
                    onHide={() => setModalShow(false)}
                />
            </Modal>
            <div className="table-emp mt-3">
                <div class="row table-head">
                    <div class="col">
                        <h3 className="float-left">Deleted Reservation</h3>
                    </div>

                </div>
                <p class="float-right mr-3">
                    <Link class="link" to={`/viewReservation`}><button class="btn btn-ok white" id="pending" >
                        Pending List
                    </button> </Link>
                </p>


                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th>Customer NIC</th>
                            <th>Package Name</th>
                            <th>Event Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Return Date</th>
                            <th class="text-center">Penalty</th>
                            <th class="text-center">Total</th>
                            <th class="text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewreservation.map((reservations) => {
                            return (
                                <tr >
                                    <td onClick={() => openModal(reservations)} data-toggle="tooltip" data-placement="right" title="Click to view details" className="view-td">{reservations.customernic}</td>
                                    <td >{reservations.packagename}</td>
                                    <td >{reservations.eventtype}</td>
                                    <td >{reservations.from}</td>
                                    <td >{reservations.to}</td>
                                    <td >{moment(reservations.returnDay).format('YYYY-MMMM-DD')}</td>
                                    <td class="text-right" >{reservations.penaltyCharge}</td>
                                    <td class="text-right">{reservations.totalreservation}</td>
                                    <td class="text-right">{reservations.status}</td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <br></br>

            <Modal show={modalLoading} size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <div class="d-flex justify-content-center mt-2">
                        <div class="spinner-grow text-danger" role="status">
                        </div>
                        <div class="spinner-grow text-danger" role="status">
                        </div><div class="spinner-grow text-danger" role="status">
                        </div>

                        <span class="sr-only">something went wrong...</span>
                    </div>
                    <div class="d-flex justify-content-center mt-4 h5"> something went wrong</div>

                </Modal.Body>
                <Modal.Footer>

                    <div className="col py-3 text-center">
                        <button type="submit" className="btn btn-delete" onClick={() => { window.location.reload() }}>
                            Try again
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>



        </div >
    )
}

export default DeleteRecord;