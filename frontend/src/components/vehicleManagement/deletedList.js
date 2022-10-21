import axios from 'axios'
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";

import Header from '../../Header';

const DeletedList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setData] = useState([]);

    useEffect(() => {

        function getVehicles() {
            axios.get("http://localhost:8070/vehicleRemove/viewRemove").then((res) => {


                setVehicles(res.data.reverse());
                // console.log("Data recieved");
            }).catch((error) => {
                alert(error.message);
            })

        }

        getVehicles();

    }, []);


  return (
    <div className="page-component-body">
             <Header></Header>

            {/* <Modal
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
            </Modal>  */}


            <div className="table-emp">
                <div class="row table-head">
                    <div class="col">
                        <h3 className="float-left ">Removed Vehicle List</h3>
                    </div>
                    <a href="/vehicle/addVehicle" class="float-right">
                        <button class="btn btn-ok white">
                            Add Vehicle
                        </button>
                    </a>
                    <a href="/vehicle/viewVehicle" class="float-right ml-4">
                        <button class="btn btn-ok white">
                            Current Vehicle List
                        </button>
                    </a>
                </div>
                <div class="row table-head-search">
                    <div className="col-md-8"></div>
                    <div className="col">
                        <div class="input-group input-group-search">
                            <div class="searchbar">
                                <input class="search_input" type="text" name="" placeholder="Search..." />
                                <button class="btn search_icon" type="button"><i class="fa fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>



                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th class="text-center">Vehicle Reg No</th>
                            <th class="text-center">Owner Name</th>
                            <th class="text-center">Telephone No</th>
                            <th class="text-center">Brand</th>
                            <th class="text-center">Model</th>
                            <th class="text-center">Type</th>
                            <th class="text-right">Rate</th>
                            <th class="text-center">Years Of Rent </th>
                            {/* <th class="text-center">Action</th> */}
                        </tr>

                    </thead>
                    <tbody>
                        {vehicles.map((vehicles) => {

                            return (
                                <tr>
                                    <td class="text-center">
                                        {vehicles.VehicleRegNo}
                                    </td>
                                    {/* <td class="text-center">{vehicles.VehicleRegNo}</td> */}
                                    <td class="text-center">{vehicles.OwnerName}</td>
                                    <td class="text-center">0{vehicles.TeleNo}</td>
                                    <td class="text-center">{vehicles.VehicleBrand}</td>
                                    <td class="text-center">{vehicles.VehicleModel}</td>
                                    <td class="text-center">{vehicles.VehicleType}</td>
                                    <td class="text-right">{vehicles.RatePDay.toFixed(2)}</td>
                                    <td class="text-center">{vehicles.YearsRent}</td>
                                    {/* <td class="text-center">
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
                                            delete
                                        </button>
                                    </td> */}


                                </tr>
                            );


                        })}


                    </tbody>
                </table>
            </div>

        </div>
  )
}

export default DeletedList