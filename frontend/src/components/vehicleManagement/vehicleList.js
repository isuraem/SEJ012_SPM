import axios from 'axios'
import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2'

import Header from "../../Header";



function VehicleList() {


    // const [search, setSearch] = useState("");

    const [vehicles, setVehicles] = useState([]);
    



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
                                  

                                </tr>
                            );


                        })}


                    </tbody>
                </table>
            </div>

           

        </div>
    )
}

export default VehicleList;
