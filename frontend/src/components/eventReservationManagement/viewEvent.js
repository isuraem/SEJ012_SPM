import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment';
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router";
import Swal from 'sweetalert2'
import Header from '../../Header';


function Viewreservation() {

    const [viewreservation, setviewreservation] = useState([]);
  

    useEffect(() => {

        function getReservation() {
            axios.get("http://localhost:8070/event/displayEvent").then((res) => {
                                setviewreservation(res.data.reverse());
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

        getReservation();

    }, []);

    // useEffect(() => {

       
    //         function getReservation() {
    //             axios.get("http://localhost:8070/event/displayEvent").then((res) => {
    //                 setviewreservation(res.data.reverse());
    //             }).catch((error) => {

                  
    //             })
    //         }
         
    // },[])



    function refreshPage() {
        window.location.reload();
    }


    return (
        <div className="page-component-body">
            <Header></Header>
           
            <div className="table-emp">
                <div class="row table-head">
                    <div class="col">
                        <h3 className="float-left" onClick={refreshPage}>List of Reservation</h3>
                    </div>

                    <a href="/addReservation" class="float-right">
                        <button class="btn btn-ok white">
                            +Add Reservation
                        </button>
                    </a>
                    <p class="float-right ml-4">
                        <button class="btn btn-ok white" id="pending" >
                            Completed Reservation
                        </button>
                    </p>
                    <a href="/diplay/RemoveReservationlist" class="float-right ml-4">
                        <button class="btn btn-ok white">
                            Past Records
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
                <table class="table table-hover" id="myTable">
                    <thead class="thead-dark">
                        <tr>
                            <th class="text">Customer</th>
                            <th class="text">NIC</th>
                            <th class="text">Package Name</th>
                            <th class="text">Event Type</th>
                            <th class="text">From</th>
                            <th class="text">To</th>
                            <th class="text-center">Total</th>
                            <th class="text-right">Status</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {viewreservation.map((reservations) => {
                            return (
                                <tr>
                                    <td class="text" >{reservations.customername}</td>
                                    <td class="text">{reservations.customernic}</td>
                                    <td class="text">{reservations.packagename}</td>
                                    <td class="text">{reservations.eventtype}</td>
                                    <td class="text">{moment(reservations.from).format('YYYY-MMMM-DD')}</td>
                                    <td class="text">{moment(reservations.to).format('YYYY-MMMM-DD')}</td>
                                    <td class="text-right">{reservations.totalreservation.toFixed(2)}</td>
                                    <td class="text-right">{reservations.status}</td>
                                   
                                        
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

           

        </div>
    )
}

export default Viewreservation


/*useEffect(() => {

        if (document.getElementById('submit').clicked) {//this get executed if we are specifically searching
            searchOrders();

        } else {//normally the fetched order details are here   

            function getOrders() {
                axios.get("http://localhost:8060/order/displayOrders").then((res) => {
                    setOrders(res.data.reverse());
                }).catch((error) => {
                    alert(error.message);
                })
            }
            getOrders();
        }
    }, [])*/


/*function searchOrders(e) {
    e.preventDefault();
    if (!isNaN(search.charAt(0))) {//checking if the value entered at the search box is for NIC or normal name
        axios.get(`http://localhost:8060/order/searchOrders/${search}`).then((res) => {
            setOrders(res.data);
        }).catch((error) => {
            alert(error.message);
        })
    } else {
        axios.get(`http://localhost:8060/order/searchOrdersByOrderId/${search}`).then((res) => {
            setOrders(res.data);
        }).catch((error) => {
            alert(error.message);
        })
    }
}*/


/*function refreshPage() {
    window.location.reload();
}*/

{/*to={`/updateReservation/${reservations.reservationid}`}*/ }