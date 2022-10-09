import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";

import Header from "../Header";

function RentalList() {

    let history = useHistory();

    
    const [rentalList, setRentalList] = useState([]);
   
   

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

        }, [])

  



    function refreshPage() {
        window.location.reload();
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
                    {/* <p class="float-right ml-4">
                        <button class="btn btn-ok white" id="pending" onClick={pendingRecords}>
                            Pending Rental
                        </button>
                    </p> */}
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
                                   
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>


        </div >
    )
}

export default RentalList;
