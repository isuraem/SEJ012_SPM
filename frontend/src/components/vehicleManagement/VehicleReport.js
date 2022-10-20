import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Pdf from "react-to-pdf";
import Header from "../../Header";
import Swal from "sweetalert2";

const ref = React.createRef();



function VehicleReport() {


    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [Type, setType] = useState("");
    const [Brand, setBrand] = useState("");
    const [years, setYears] = useState("");
    
    const [vehicles, setVehicles] = useState([]);

    const date = new Date();

    useEffect(() => {
        document.getElementById("dateDisplay").innerHTML = date;

    }, []);

    function sendData(e) {

        e.preventDefault();
        changeBoxes();

        console.log("date from..",dateFrom);
        console.log("date to...",dateTo);
        
        axios.get(`http://localhost:8070/vehicle/reportV/${dateFrom}/${dateTo}`).then((res) => {
            // const message = "No record found!"
            // console.log("data in vehicle list page", res.data);
            setVehicles(res.data);
            //console.log("list", vehicles);

            if (res.data == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No data found!',
                    confirmButtonColor: '#207159',

                })
            }


        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                confirmButtonColor: '#207159',

            })
        })

    }

    function changeBoxes() {
        document.getElementById('myTabContent').style.display = "none";
        document.getElementById('myTabContent2').style.display = "block";

    }




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
                                        <h3 className=" mt-3 mb-4">Generate Report on Vehicle Records </h3>
                                    </center>
                                    <hr></hr>
                                </form>
                            </div>
                        </div>
                        <br></br>
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <form id="contact-form" class="form" onSubmit={sendData} >
                                    <div class="row">
                                        <div class="form-group col-md-6">
                                            <label class="form-label-emp" for="from">From</label>
                                            <DatePicker
                                                //type="date" 
                                                class="form-control formInput"
                                                id="dateFrom"
                                                name="dateFrom"
                                                placeholder=""
                                                tabindex="5"
                                                timeFormat={false}
                                                required
                                                onChange={(e) => {
                                                    setDateFrom(e);
                                                }}

                                            />
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="form-label-emp" for="to">To</label>
                                            <DatePicker
                                                required
                                                //type="date" 
                                                class="form-control formInput"
                                                id="dateTo"
                                                name="dateTo"
                                                placeholder=""
                                                tabindex="6"
                                                timeFormat={false}
                                                onChange={(e => {
                                                    setDateTo(e);
                                                })}


                                            />
                                        </div>
                                    </div>

                                    <br></br>

                                    {/* <div class="form-group">
                                        <label class="form-label-emp" for="customeraddress">Vehicle Type</label>
                                        <select
                                            type="text"
                                            class="form-control formInput"
                                            id="Type"
                                            name="customeraddress"
                                            placeholder="Customer Address"
                                            tabindex="4"
                                            //required
                                            onChange={(e) => {
                                                setType(e.target.value);
                                            }
                                            }
                                        >

                                            <option id="choose1">Choose</option>
                                            <option value="car">Car</option>
                                            <option value="van">Van</option>
                                            <option value="bus">Bus</option>
                                        </select>

                                    </div> */}

                                    <br></br>

                                    {/* <div class="form-group">
                                        <label class="form-label-emp" for="customeraddress">Brand</label>
                                        <input
                                            type="text"
                                            class="form-control formInput"
                                            id="Brand"
                                            name="Brand"
                                            placeholder="Eg: Toyota, Nissan, Mitsubishi"
                                            tabindex="4"
                                            //required

                                            onChange={(e) => {
                                                setBrand(e.target.value);

                                            }}
                                        />
                                    </div> */}
                                    <br></br>
                                    {/* <div className="row">
                                        <div className="form-group col-md-4">
                                            <label class="form-label-emp" for="customeraddress">Years of Rental</label>
                                            <input
                                                type="number"
                                                class="form-control formInput"
                                                id="years"
                                                name="years"
                                                placeholder="0 - 10 years"
                                                tabindex="4"
                                                //required
                                                onChange={(e) => {
                                                    setYears(e.target.value);
                                                }}
                                            />

                                        </div>

                                    </div> */}

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
                    <Pdf targetRef={ref} filename="VehicleReport.pdf">
                        {({ toPdf }) => <button class="btn btn-download white" onClick={toPdf}><i class="fa fa-download" aria-hidden="true"></i></button>}
                    </Pdf>
                    <div ref={ref} className="pl-4">
                        <div className="report">
                            {/* <img src="/images/report.png" /> */}
                            <br></br>

                            <h1>Let's Go Enterprise Pvt(Ltd)</h1>
                            <h3>Vehicle Management Report</h3>
                            <br></br>
                            <img src="/images/reportpic.jpg" width="250px" height="200px"/>
                            <br></br>


                            <table class="table table-hover">
                                <thead class="thead-dark">
                                    <tr>

                                        <th>Vehicle RegNo</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Brand</th>
                                        <th>Model</th>
                                        <th>Years of rental</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicles.map((vehicle) => {
                                        // console.log("table", vehicle.Date);
                                        return (


                                            <tr >

                                                <td>{vehicle.VehicleRegNo}</td>
                                                <td > {vehicle.Date}</td>
                                                <td >{vehicle.VehicleType}</td>
                                                <td >{vehicle.VehicleBrand}</td>
                                                <td >{vehicle.VehicleModel}</td>
                                                <td class="text-center">{vehicle.YearsRent}</td>

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

export default VehicleReport;