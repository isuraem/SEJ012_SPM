import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import Header from '../../Header';
import Pdf from "react-to-pdf";
import Swal from 'sweetalert2';

const ref = React.createRef();

function EventReport() {

    const [from, setfrom] = useState(moment().format('YYYY-MMMM-DD'));
    const [to, setto] = useState(moment().format('YYYY-MMMM-DD'));
    const [status, setstatus] = useState("");
    const [packagename, setpackagename] = useState("");
    const [eventtype, seteventtype] = useState("");
    const [viewevent, setviewevent] = useState([]);

    useEffect(() => {
        document.getElementById("dateDisplay").innerHTML = date;

    }, []);

    function sendData(e) {
        e.preventDefault();
        changeBoxes();

        var fromDate = moment(from).format('YYYY-MMMM-DD');
        var toDate = moment(to).format('YYYY-MMMM-DD');

        if (status == "Pending") {

            if ((eventtype == "") && (packagename == "")) {
                const pack = "null"
                const event = "null"
                //fetching the count of reservation placed on current date
                axios.get(`http://localhost:8070/event/generateReport/${fromDate}/${toDate}/${pack}/${event}`).then((res) => { 
                    console.log(res.data);
                    setviewevent(res.data);
                }).catch((error) => {
                    Swal.fire({
                        title: 'Oops!',
                        text: `${error}`,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }
                    )
                    //alert(error)
                })
            }
            else if (eventtype == "") {
                const evet = "null"
               
                axios.get(`http://localhost:8070/event/generateReport/${fromDate}/${toDate}/${packagename}/${evet}`).then((res) => { 
                    console.log(res.data);
                    setviewevent(res.data);
                }).catch((error) => {
                    Swal.fire({
                        title: 'Oops!',
                        text: `${error}`,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }
                    )
                    //alert(error)
                })
            } else if (packagename == "") {
                const ptype = "null"
               
                axios.get(`http://localhost:8070/event/generateReport/${fromDate}/${toDate}/${ptype}/${eventtype}`).then((res) => { 
                    console.log(res.data);
                    setviewevent(res.data);
                }).catch((error) => {
                    Swal.fire({
                        title: 'Oops!',
                        text: `${error}`,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }
                    )
                    //alert(error)
                })

            } else {
               

                axios.get(`http://localhost:8070/event/generateReport/${fromDate}/${toDate}/${packagename}/${eventtype}`).then((res) => { 
                    console.log(res.data);
                    setviewevent(res.data);
                }).catch((error) => {
                    Swal.fire({
                        title: 'Oops!',
                        text: `${error}`,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }
                    )
                    //alert(error)
                })
            }
        }
        else if (status == "Completed") {
            if ((eventtype == "") && (packagename == "")) {
                const pack = "null"
                const event = "null"
               
                axios.get(`http://localhost:8070/removedEvent/generateReport/${fromDate}/${toDate}/${pack}/${event}`).then((res) => { 
                    console.log(res.data);
                    setviewevent(res.data);
                }).catch((error) => {
                    Swal.fire({
                        title: 'Oops!',
                        text: `${error}`,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }
                    )
                    //alert(error)
                })
            }
            else if (eventtype == "") {
                const evet = "null"
              
                axios.get(`http://localhost:8070/removedEvent/generateReport/${fromDate}/${toDate}/${packagename}/${evet}`).then((res) => { 
                    console.log(res.data);
                    setviewevent(res.data);
                }).catch((error) => {
                    Swal.fire({
                        title: 'Oops!',
                        text: `${error}`,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }
                    )
                    //alert(error)
                })
            } else if (packagename == "") {
                const ptype = "null"
               
                axios.get(`http://localhost:8070/removedEvent/generateReport/${fromDate}/${toDate}/${ptype}/${eventtype}`).then((res) => { 
                    console.log(res.data);
                    setviewevent(res.data);
                }).catch((error) => {
                    Swal.fire({
                        title: 'Oops!',
                        text: `${error}`,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }
                    )
                    //alert(error)
                })

            } else {

               
                axios.get(`http://localhost:8070/removedEvent/generateReport/${fromDate}/${toDate}/${packagename}/${eventtype}`).then((res) => { 
                    console.log(res.data);
                    setviewevent(res.data);
                }).catch((error) => {
                    Swal.fire({
                        title: 'Oops!',
                        text: `${error}`,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }
                    )
                    //alert(error)
                })
            }
        }
    }

    function changeBoxes() {
        document.getElementById('myTabContent').style.display = "none";
        document.getElementById('myTabContent2').style.display = "block";

    }

    const date = new Date();



    return (
        <div className="page-component-body">
            <Header></Header>
            <div class="container input-main-form-emp">
                <div class="tab-content-emp" id="myTabContent">

                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                                <form>
                                    <center>
                                        <h3 className=" mt-3 mb-4">Generate Report on Reservation Records </h3>
                                    </center>
                                    <hr></hr>
                                </form>
                            </div>
                        </div>
                        <br></br>
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <form id="contact-form" class="form" onSubmit={sendData}>
                                    <div class="row">
                                        <div class="form-group col-md-6">
                                            <label class="form-label-emp" for="from">From</label>
                                            <DatePicker
                                                //type="date" 
                                                class="form-control formInput"
                                                id="from"
                                                name="from"
                                                placeholder=""

                                                required
                                                timeFormat={false}
                                                onChange={(event) => { setfrom(event); }}

                                            />
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="form-label-emp" for="to">To</label>
                                            <DatePicker
                                                required
                                                //type="date" 
                                                class="form-control formInput"
                                                id="to"
                                                name="to"
                                                placeholder=""
                                                tabindex="6"
                                                timeFormat={false}
                                                onChange={(event) => { setto(event); }}

                                            />
                                        </div>
                                    </div>

                                    <br></br>

                                    <div class="form-group">
                                        <label class="form-label-emp" for="packagename">Package Type</label>
                                        <select
                                            type="text"
                                            class="form-control formInput"
                                            id="packagename"
                                            name="packagename"
                                            placeholder="Customer Address"
                                            tabindex="4"
                                            //required
                                            onChange={(event) => { setpackagename(event.target.value); }}
                                        >
                                            <option  >choose</option>
                                            <option id="model11">Package 1</option>
                                            <option id="model22">Package 2</option>
                                            <option id="model33">Package 3</option>
                                        </select>
                                    </div>

                                    <br></br>

                                    <div class="form-group">
                                        <label class="form-label-emp" for="eventtype">Event name</label>
                                        <input
                                            type="text"
                                            class="form-control formInput"
                                            id="eventtype"
                                            name="eventtype"
                                            placeholder=""
                                            tabindex="4"
                                            //required
                                            onChange={(event) => { seteventtype(event.target.value); }}
                                        />
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label className="form-label-emp " for="gender">Status:</label>
                                            <br></br>
                                            <div className="form-check form-check-inline ml-2 mr-5">
                                                <label className="form-check-label" for="inlineCheckbox1">
                                                    <input className="form-check-input" type="radio" id="status" name="status" value="Pending"
                                                        onChange={(event) => { setstatus(event.target.value); }}
                                                    />Pending</label>
                                            </div>
                                            <div className="form-check form-check-inline ml-5">
                                                <label className="form-check-label" for="inlineCheckbox2">
                                                    <input className="form-check-input" type="radio" id="status" name="status" value="Completed"
                                                        onChange={(event) => { setstatus(event.target.value); }}
                                                    />Complete</label>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col py-3 text-center">
                                            <button type="submit" className="btn btn-ok" >
                                                Generate
                                            </button>
                                        </div>

                                    </div>
                                    <br></br>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

                <div id="myTabContent2" style={{ display: "none" }}>
                    <Pdf targetRef={ref} filename="RentalReport.pdf">
                        {({ toPdf }) => <button class="btn btn-download white" onClick={toPdf}><i class="fa fa-download" aria-hidden="true"></i></button>}
                    </Pdf>
                    <div ref={ref} className="pl-4">
                        <div className="report">
                            {/* <img src="https://i.ibb.co/7S45yMk/reservation-Report.jpg" /> */}
                            <h1>Let's Go Enterprise Pvt(Ltd)</h1>
                            <h3>Reservation Management Report</h3>
                            <br></br>
                            <img src="/images/reportpic.jpg" width="250px" height="200px"/>
                            <br></br>

                            <table class="table table-hover"> 
                                <thead class="thead-dark">
                                    <tr>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Package Name</th>
                                        <th>Event Type</th>
                                        <th>Total (Rs.)</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewevent.map((reservations) => {
                                        console.log("table", reservations.from)
                                        return (

                                            <tr >

                                                <td > {reservations.from}</td>
                                                <td >{reservations.to}</td>
                                                <td >{reservations.packagename}</td>
                                                <td >{reservations.eventtype}</td>
                                                <td >{reservations.totalreservation.toFixed(2)}</td>
                                                <td >{reservations.status}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <h6 className="pb-5">Report generated on : <span id="dateDisplay"></span></h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventReport;
