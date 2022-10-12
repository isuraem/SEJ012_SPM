import axios from 'axios'
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2'

import UpdateVehicleModal from "./updateVehicleModal";
import Header from "../../Header";



function VehicleList() {


    // const [search, setSearch] = useState("");

    const [vehicles, setVehicles] = useState([]);

    const [modalDataDelete, setModalDataDelete] = useState([]);
    const [modalDeleteConfirm, setModalDeleteConfirm] = useState(false);



    const [modalDataUpdate, setModalDataUpdate] = useState([]);
    const [modalUpdate, setModalUpdate] = useState(false);
    



    useEffect(() => {

        function getVehicles() {
            axios.get("http://localhost:8070/vehicle/viewVehicle").then((res) => {


                setVehicles(res.data.reverse());
                //console.log("Data recieved");

            }).catch((error) => {
                // alert(error.message);
                console.log("f354754",error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    confirmButtonColor: '#207159',

                })
            })

        }

        getVehicles();

    }, []);

    const deleteVehicle = async (data) => {
console.log("----------------",data);
        await axios.post("http://localhost:8070/vehicleRemove/addRemoveVehicle", { data }).then(() => {
            // alert("**Vehicle Record added successfully")

            Swal.fire({
                title: 'Success!',
                text: 'Permenantly deleted the Vehicle Record',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
        console.log("modalDataDelete.fyiff",modalDataDelete);
            const value = axios.post("http://localhost:8070/vehicle/deleteV", modalDataDelete);
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

        }).catch((err) => {
            // alert("enne na")
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                confirmButtonColor: '#207159',

            }).then(() => {
                window.location.reload();
            })

            alert(err.response.data.errorCode)

        })

    }


    const openModalDelete = (data) => {
        setModalDataDelete(data);
        setModalDeleteConfirm(true);
    }

    const openModalUpdate = (data) => {

        //console.log("request came for modal updateeeeeee", data);
        setModalDataUpdate(data);
        setModalUpdate(true);

    }


    return (

        <div className="page-component-body">
            <Header></Header>


            <div className="table-emp">
                <div class="row table-head mt-3">
                    <div class="col">
                        <h3 className="float-left ">List of vehicle</h3>
                    </div>
                    <a href="/vehicle/addVehicle" class="float-right">
                        <button class="btn btn-ok white">
                            Add Vehicle
                        </button>
                    </a>
                   
                </div>
            



                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th class="text-center">Vehicle Reg No</th>
                            <th class="text-center">Brand</th>
                            <th class="text-center">Model</th>
                            <th class="text-center">Type</th>
                            <th class="text-right">Rate (Rs.)</th>
                            <th class="text-right">Years Of Rent </th>
                            <th class="text-center">Action</th>
                           
                        </tr>

                    </thead>
                    <tbody>
                        {vehicles.map((vehicles) => {

                            return (
                                <tr>
                                     <td class="text-center">
                                        {vehicles.VehicleRegNo}
                                    </td>
                                    <td class="text-center">{vehicles.VehicleBrand}</td>
                                    <td class="text-center">{vehicles.VehicleModel}</td>
                                    <td class="text-center">{vehicles.VehicleType}</td>
                                    <td class="text-right">{vehicles.RatePDay}</td>
                                    <td class="text-right">{vehicles.YearsRent}</td>
                                     <td class="text-center">
                                        <button
                                            class="btn btn-light btn-sm"
                                            onClick={() => openModalUpdate(vehicles)}
                                        >
                                            update
                                        </button>
                                        <button
                                            id="btnDelete"
                                            class="btn btn-danger btn-sm"
                                            onClick={() => openModalDelete(vehicles)}
                                        >
                                            remove
                                        </button>

                                    </td>
                                  

                                </tr>
                            );


                        })}


                    </tbody>
                </table>
            </div>

           

   
    



        {/* modal for delete employee record */}
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
                    <button type="submit" className="btn btn-delete" onClick={() => { deleteVehicle(modalDataDelete); }}>
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

         {/* modal for update the data of vehicle  */}
        <Modal
        show={modalUpdate}
        onHide={() => setModalUpdate(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <UpdateVehicleModal
            data={modalDataUpdate}
            onHide={() => setModalUpdate(false)}
        />
        </Modal>


        </div>


    )
}

export default VehicleList;
