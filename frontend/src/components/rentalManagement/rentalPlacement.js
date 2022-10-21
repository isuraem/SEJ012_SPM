import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import Swal from "sweetalert2";
import Header from "../../Header";

function RentalPlacement() {

    //variables created to set the backend vehicle lists received
    const [CarList, setCarList] = useState([]);
    const [BusList, setBusList] = useState([]);
    const [VanList, setVanList] = useState([]);


    //variables created to set the validation
    const [MobileErr, setMobileNoErr] = useState("");
    const [NICErr, setNICErr] = useState("");
    const [AdErr, setAdErr] = useState("");

    //calling useEffect to connect with the backend upon page loading
    useEffect(() => {

        function getCarList() {
            axios.get("http://localhost:8070/vehicle/searchVehicleModels/Car").then((res) => {
                setCarList(res.data);
            }).catch((error) => {
                alert(error.message);
            })
        }

        function getBusList() {
            axios.get("http://localhost:8070/vehicle/searchVehicleModels/Bus").then((res) => {
                setBusList(res.data);
            }).catch((error) => {
                alert(error.message);
            })
        }

        function getVanList() {
            axios.get("http://localhost:8070/vehicle/searchVehicleModels/Van").then((res) => {
                setVanList(res.data);
            }).catch((error) => {
                alert(error.message);
            })
        }

        getCarList();
        getBusList();
        getVanList();

    }, [])


    function populate() {
        var Stringsplit1 = CarList.split(',')
        var Stringsplit2 = VanList.split(",")
        var Stringsplit3 = BusList.split(",")

        var s1 = document.getElementById('vehicleType')
        var s2 = document.getElementById('vehicleModel')

        var arry1 = [Stringsplit1.length];

        for (var a = 0; a < Stringsplit1.length; a++) {
            arry1[a] = Stringsplit1[a].toLowerCase() + "|" + Stringsplit1[a];
        }
        arry1.unshift("choose|Choose");
        //alert(arry1)

        var arry2 = [Stringsplit2.length];

        for (var a = 0; a < Stringsplit2.length; a++) {
            arry2[a] = Stringsplit2[a].toLowerCase() + "|" + Stringsplit2[a];
        }
        arry2.unshift("choose|Choose");
        //alert(arry2)

        var arry3 = [Stringsplit3.length];

        for (var a = 0; a < Stringsplit3.length; a++) {
            arry3[a] = Stringsplit3[a].toLowerCase() + "|" + Stringsplit3[a];
        }
        arry3.unshift("choose|Choose");
        //alert(arry3)

        s2.innerjs = " ";
        if (s1.value == "Car") {
            var optionArray = arry1;
        } else if (s1.value == "Van") {
            var optionArray = arry2;
        } else if (s1.value == "Bus") {
            var optionArray = arry3;
        }

        for (var option in optionArray) {
            var pair = optionArray[option].split('|');
            var newoption = document.createElement("option")
            newoption.value = pair[0];
            newoption.innerHTML = pair[1];
            s2.options.add(newoption);


        }

    }

    //disable past dates
    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
        return current.isAfter(yesterday);
    };

    //disable future dates
    const today = moment().add(7, 'days');;
    const disableFutureDt = current => {
        return current.isBefore(today)
    }


    let history = useHistory();

    const [from, setFrom] = useState(moment());
    const [to, setTo] = useState(moment());
    const [status, setStatus] = useState("");
    const [payment, setPayment] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [model, setModel] = useState("");
    const [pickAddress, setPickAddress] = useState("");
    const [addPrice, setAddPrice] = useState("");
    const [advPayment, setAdvPayment] = useState("");
    const [finalPrice, setFinalPrice] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerNIC, setCustomerNIC] = useState("");
    const [customerAdd, setCustomerAdd] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [NICcopy, setNICcopy] = useState("");

    const [rentals, setRentals] = useState([]);
    const [perDayCharge, setPerDayCharge] = useState("");



    function getDateDiff() {
        var admission = moment(from, 'DD-MM-YYYY');
        var discharge = moment(to, 'DD-MM-YYYY');
        const diffDuration = discharge.diff(admission, 'days');
        return diffDuration;
    }


    function temporarilysendData(e) {

        e.preventDefault();//to prevent the default submission by submit button

        //from and to is not validated since it is originally set to current date
        if ((status == "" || payment == "" || vehicleType == "" || model == "" || advPayment == "")) {
            //alert("Please fill the form details ")
            Swal.fire({
                icon: 'error',
                title: "Please fill the form details ! ",
                confirmButtonColor: "#1fc191",
            })
        } else {
            //alert(vehicleType, model)
            getRentChargePerDay();
            //alert(perDayCharge);
            document.getElementById('rentalStatus').value = status;
            document.getElementById('rentalDuration').value = getDateDiff();
            var val3 = document.getElementById('perDayCharge').value = perDayCharge;
            document.getElementById('addPrice').value = addPrice;
            document.getElementById('tax').value = 1500;
            document.getElementById('subRent').value = (((getDateDiff() * val3) + Number(addPrice) + Number(document.getElementById('tax').value)));
            document.getElementById('advancePay').value = advPayment;
            document.getElementById('finalPrice').value = ((Number(document.getElementById('subRent').value) - Number(advPayment)));
            document.getElementById('totalRent').value = document.getElementById('subRent').value;
            document.getElementById('totalRent').innerHTML = document.getElementById('subRent').value;

        }



    }

    function getFinalPrice() {
        //return document.getElementById('finalPrice').value = ((Number(document.getElementById('subRent').value) - Number(advPayment)));

        setFinalPrice((((getDateDiff() * perDayCharge) + Number(addPrice) + 1500)))

    }

    //dynamically value setting
    function summaryStatus(value) {
        document.getElementById('rentalStatus').value = value
        document.getElementById('rentalStatus').innerHTML = value
    }

    function summaryCustomer(value) {
        document.getElementById('customer').value = value
        document.getElementById('customer').innerHTML = value
    }

    function summaryAdv(value) {
        document.getElementById('advancePay').value = value
        document.getElementById('advancePay').innerHTML = value
    }

    function summaryDuration() {
        document.getElementById('rentalDuration').value = getDateDiff();
        document.getElementById('rentalDuration').innerHTML = getDateDiff();
    }

    function summaryModel(value) {
        document.getElementById('vehicle').value = vehicleType + " " + value;
        document.getElementById('vehicle').innerHTML = value;
    }


    function sendData(e) {
        e.preventDefault();//to prevent the default submission by submit button
        //alert(finalPrice);


        checkForPendingCustomer();
        //alert(rentals.length);

        if (rentals.length !== 0) {
            //alert('Customer already has unsettled rentals')
            Swal.fire({
                icon: 'error',
                title: "Customer already has unsettled rentals ! ",
                confirmButtonColor: "#1fc191",
            })
            history.push("/rentalList")

        } else if (rentals.length === 0) {

            const MobileValid = MobileValidation();
            const NICValid = NICValidation();
            const AdvanceValid = AdvanceValidation();

            if (MobileValid && NICValid && AdvanceValid) {
                Swal.fire({
                    title: "Are you sure you want to confirm submission? ",
                    showConfirmButton: true,
                    showDenyButton: true,
                    confirmButtonText: "Proceed",
                    denyButtonText: "Cancel",
                    confirmButtonColor: "#1fc191",

                }).then((result) => {

                    if (result.isConfirmed) {

                        const newRental = { from, to, status, payment, vehicleType, model, pickAddress, addPrice, advPayment, finalPrice, customerName, customerNIC, customerAdd, contactNo, NICcopy }

                        axios.post("http://localhost:8070/rental/addRentalRec", newRental).then(() => {
                            Swal.fire({
                                title: "Rental Record added successfully! ",
                                icon: 'success',

                                confirmButtonColor: "#1fc191",

                            }).then((res) => {
                                if (res.isConfirmed) {
                                    window.location.replace('/rentalList');
                                }
                            })

                        }).catch((err) => {
                            var error = err.response.data.error

                            //alert(err.response.data.errorCode)
                            Swal.fire({
                                title: "Internal Server Error! ",
                                text: error,
                                icon: 'error',
                                confirmButtonColor: "#1fc191",

                            })

                        })

                    } else if (result.isDenied) {
                        refreshPage();
                    }

                })
                //const answer = window.confirm("Are you sure you want to confirm submission?");

            }
        }

    }

    const MobileValidation = () => {//validate function

        const MobileErr = {}; //State
        let MobileValid = true; //setting flag


        if (contactNo.trim().length > 10) {

            MobileErr.InValidMobileNo = " *Invalid Telephone Number"; // error msg
            Swal.fire({
                icon: 'error',
                title: 'Oops...Invalid Mobile No',
                text: '*Invalid Mobile Number, Try Again !!',
                confirmButtonColor: '#1fc191',
                // footer: '<a href=""#home">Why do I have this issue?</a>'
            })
            MobileValid = false;
        } else if (contactNo.trim().length < 10) {
            MobileErr.InValidMobileNo = " *Invalid Telephone Number"; // error msg
            Swal.fire({
                icon: 'error',
                title: 'Oops...Invalid Mobile No',
                text: '*Invalid Mobile Number, Try Again !!',
                confirmButtonColor: '#1fc191',
                // footer: '<a href=""#home">Why do I have this issue?</a>'
            })
            MobileValid = false;
        }


        setMobileNoErr(MobileErr);//update error objects
        return MobileValid;


    }


    const AdvanceValidation = () => {//validate function

        const AdErr = {}; //State
        let AdValid = true; //setting flag


        if (advPayment <= 1000) {

            AdErr.InValidAdvance = " *Advance Payment should be greater than Rs . 1000/="; // error msg

            Swal.fire({
                icon: 'error',
                title: 'Oops...Invalid Advance Payment',
                text: 'Advance Payment should be greater than Rs . 1000/= , Try Again !!',
                confirmButtonColor: '#1fc191',
                // footer: '<a href=""#home">Why do I have this issue?</a>'
            })
            AdValid = false;
        }
        else if (advPayment >= 10000) {

            AdErr.InValidAdvance = " *Advance Payment should be less than Rs . 10,000/="; // error msg
            Swal.fire({
                icon: 'error',
                title: 'Oops...Invalid Advance Payment',
                text: 'Advance Payment should be less than Rs . 10,000/= , Try Again !!',
                confirmButtonColor: '#1fc191',
                // footer: '<a href=""#home">Why do I have this issue?</a>'
            })
            AdValid = false;
        }


        setAdErr(AdErr);//update error objects
        return AdValid;


    }

    const NICValidation = () => {//validate function

        const NICErr = {}; //State
        let NICValid = true; //setting flag


        if (customerNIC.trim().length > 12) {

            NICErr.InValidNIC = " *Invalid NIC Number characters cannot exceed 12"; // error msg
            Swal.fire({
                icon: 'error',
                title: 'Oops...Invalid NIC',
                text: '*Invalid NIC Number characters cannot exceed 12 , Try Again !!',
                confirmButtonColor: '#1fc191',
                // footer: '<a href=""#home">Why do I have this issue?</a>'
            })
            NICValid = false;
        } else if (customerNIC.trim().length == 10 && customerNIC.charAt(9) !== "V") {
            NICErr.InValidNIC = " *Invalid NIC Number last Letter is not V"; // error msg
            Swal.fire({
                icon: 'error',
                title: 'Oops...Invalid NIC',
                text: '*Invalid NIC Number last Letter is not V , Try Again !!',
                confirmButtonColor: '#1fc191',
                // footer: '<a href=""#home">Why do I have this issue?</a>'
            })
            NICValid = false;
        } else if (customerNIC.trim().length == 9) {
            NICErr.InValidNIC = " *Invalid NIC Number ending V is missing"; // error msg
            Swal.fire({
                icon: 'error',
                title: 'Oops...Invalid NIC',
                text: '*Invalid NIC Number ending V is missing, Try Again !!',
                confirmButtonColor: '#1fc191',
                // footer: '<a href=""#home">Why do I have this issue?</a>'
            })
            NICValid = false;
        } else if (customerNIC.trim().length < 10) {
            NICErr.InValidNIC = " *Invalid NIC Number characters are lesser"; // error msg
            Swal.fire({
                icon: 'error',
                title: 'Oops...Invalid NIC',
                text: '*Invalid NIC Number characters are lesser, Try Again !!',
                confirmButtonColor: '#1fc191',
                // footer: '<a href=""#home">Why do I have this issue?</a>'
            })
            NICValid = false;
        }


        setNICErr(NICErr);//update error objects
        return NICValid;


    }

    const [isMobileValid, setMobileIsValid] = useState(false);
    const [Mobilemessage, setMobileMessage] = useState('');

    const MobileRegex = /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/;

    const validateMobileNo = (event) => {
        const mobileNo = event.target.value;
        if (MobileRegex.test(mobileNo)) {
            setMobileIsValid(true);
            setMobileMessage('Your Mobile Number is valid!');
        } else {
            setMobileIsValid(false);
            setMobileMessage('Please enter a valid Mobile Number!');
        }
    };


    const [isNICValid, setNICIsValid] = useState(false);
    const [NICmessage, setNICMessage] = useState('');

    const NICRegex1 = /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][V]$/;
    const NICRegex2 = /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/;

    const validateNICNo = (event) => {
        const NIC = event.target.value;
        if (NICRegex1.test(NIC)) {
            setNICIsValid(true);
            setNICMessage('Your NIC looks good!');
        } else if (NICRegex2.test(NIC)) {
            setNICIsValid(true);
            setNICMessage('Your NIC looks good!');
        } else {
            setNICIsValid(false);
            setNICMessage('Please enter a valid NIC Number!');
        }
    };


    const [advanceValid, setAdvanceValid] = useState(false);
    const [advanceMessage, setAdvMessage] = useState('');

    // const VehRegex1 = /^[0-9]+[0-9][0-9][0-9][0-9]$/;
    // const VehRegex2 = /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/;

    const validateAdvance = (event) => {
        const Advance = event.target.value;

        if (Advance <= 1000) {
            setAdvanceValid(false);
            // setRegMessage('Vehicle Registation Number looks good!');
            setAdvMessage('Advance payment amount should be greater than 1000');
        }

        else if (Advance <= 10000) {
            setAdvanceValid(true);
            // setRegMessage('Vehicle Registation Number looks good!');
            setAdvMessage('Advance paymnet amount is valid');
        }


        else {
            setAdvanceValid(false);
            setAdvMessage('Advance paymnet should be less than Rs 10,000/=');
        }
    };





    function refreshPage() {
        window.location.reload();
    }
    //refreshPage();



    function checks() {
        checkForPendingCustomer();
        //alert(rentals.length);
    }


    function checkForPendingCustomer() {
        function checkUserExistance() {
            axios.get(`http://localhost:8070/rental/searchRentalRecs/${customerNIC}`).then((res) => {
                setRentals(res.data)
                return rentals.length
            }).catch((error) => {
                //alert(error.message);
                Swal.fire({
                    title: "Error Occured !",
                    text: `${error.message}`,
                    icon: 'error',
                    confirmButtonColor: "#1fc191",

                })
            })
        }
        checkUserExistance();
    }

    function getRentChargePerDay() {
        function getRent() {
            axios.get(`http://localhost:8070/vehicle/searchPerDayRentalPrice/${vehicleType}/${model}`).then((res) => {
                setPerDayCharge(res.data)
                console.log(res.data);
            }).catch((error) => {
                //alert(error.message);
                Swal.fire({
                    title: "Error Occured !",
                    text: `${error.message}`,
                    icon: 'error',
                    confirmButtonColor: "#1fc191",

                })
            })
        }
        getRent();
    }

    return (


        <div className="page-component-body">
            <Header></Header>
            <div class="container input-main-form ">
                <br></br>
                <h2>Rental Placement</h2>

                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Rental Details</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Customer Details</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-content-emp"></div>
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <form onSubmit={temporarilysendData} action="post">
                            <div class="container">
                                <br></br>
                                <h6 className="customersize2">Rental Dates</h6>

                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <br></br>
                                        <div class="d-grid gap-2 d-md-flex justify-content-md"  >
                                            <div class="col-3 mr-2"  >
                                                <label for="rfrom" class="form-label-emp">From</label>
                                                <DatePicker required id="rfrom"
                                                    name="rfrom"
                                                    onChange={(event) => { setFrom(event); }}
                                                    timeFormat={false}
                                                    isValidDate={disablePastDt}
                                                />
                                            </div>
                                            <div class="col-3" >
                                                <label for="rto" class="form-label-emp">To</label>
                                                <DatePicker required id="rto"
                                                    name="rto"
                                                    onChange={(event) => { setTo(event); summaryDuration() }}
                                                    timeFormat={false}
                                                    isValidDate={disablePastDt}
                                                />
                                            </div>
                                            <div class="col-3">
                                                <label for="rStatus" class="form-label-emp">Status</label>
                                                <select class="form-select" className="form-control"
                                                    name="rStatus"
                                                    id="rStatus"
                                                    required
                                                    onChange={(event) => { setStatus(event.target.value); summaryStatus(event.target.value); }}>
                                                    <option id="pending" >choose...</option>
                                                    <option id="pending" >Pending</option>
                                                    <option id="completed">Completed</option>
                                                </select>
                                            </div>
                                            <div class="col-3" >
                                                <label for="rPayment" class="form-label-emp">Payment</label>
                                                <select class="form-select" className="form-control"
                                                    name="rPayment"
                                                    id="rPayment"
                                                    required
                                                    onChange={(event) => { setPayment(event.target.value); }}>
                                                    <option id="pending" >choose...</option>
                                                    <option id="cash" >Cash payment</option>
                                                    <option id="card">Card payment</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container">
                                <br></br><br></br>
                                <h6 className="customersize2">Vehicle Details</h6>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <br></br>
                                            <div class="d-grid gap-2 d-md-flex justify-content-md"  >
                                                <div class="col-6" >
                                                    <label class="form-label-emp" for="vehicleType">Vehicle Type</label>
                                                    <select class="form-select" className="form-control"
                                                        name="vehicleType"
                                                        id="vehicleType"
                                                        onChange={e => { setVehicleType(e.target.value); populate(); }}
                                                        required
                                                    >
                                                        <option  >choose</option>
                                                        <option value="Car" >Car</option>
                                                        <option value="Van">Van</option>
                                                        <option value="Bus">Bus</option>
                                                    </select>
                                                </div>



                                                <div class="col-6" >
                                                    <label class="form-label-emp" for="vehicleModel">Vehicle Model</label>
                                                    <select class="form-select" className="form-control"
                                                        name="vehicleModel"
                                                        id="vehicleModel"
                                                        required
                                                        onChange={(event) => { setModel(event.target.value); summaryModel(event.target.value); }}>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-12" >
                                        <label class="form-label-emp" for="pAddress">Pick Up Address</label>
                                        <input type="text" class="form-control formInput"
                                            id="pAddress"
                                            name="pAddress"
                                            placeholder="Pick-Up Address(No 149/6A, Thalahena, Malabe)"
                                            tabindex="3"
                                            onChange={(event) => { setPickAddress(event.target.value); }}
                                            maxLength="200" />
                                    </div>
                                </div>


                            </div>

                            <div class="container">
                                <br></br>
                                <h6 className="customersize2">Payment Details</h6>

                                <div class="form-group">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                                        <div class="d-grid gap-2 d-md-flex justify-content-md"  >
                                            <div class="col-6">
                                                <br></br>
                                                <label class="form-label-emp" for="additionalPrice">Additional Price</label>

                                                <input type="number" class="form-control formInput"
                                                    id="additionalPrice"
                                                    name="additionalPrice"
                                                    placeholder="Additional Price(Rs: 5000.00)"
                                                    tabindex="3"
                                                    onChange={(event) => { setAddPrice(event.target.value); }}
                                                    max="100000000"
                                                    min="0" />
                                            </div>
                                            <div class="col-6" >
                                                <br></br>
                                                <label class="form-label-emp" for="advPayment">Advanced Payment</label>
                                                <input type="number" class="form-control formInput"
                                                    id="advPayment"
                                                    name="advPayment"
                                                    placeholder="Advanced Payment(Rs: 3000.00)"
                                                    tabindex="3"
                                                    max="100000000"
                                                    min="0"
                                                    onChange={(event) => {
                                                        setAdvPayment(event.target.value); getFinalPrice(); summaryAdv(event.target.value);
                                                        validateAdvance(event)
                                                    }}
                                                    onFocus={getRentChargePerDay} />

                                                <div className={`message ${advanceValid ? 'success' : 'error'}`}>
                                                    {advanceMessage}
                                                </div>

                                                {Object.keys(AdErr).map((key) => {
                                                    // return<div style={{color :"red"}}>{NICErr[key]}</div>
                                                })}
                                            </div>

                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                                        <div class="d-grid gap-2 d-md-flex justify-content-md"  >
                                            <div class="col-6">
                                                <br></br>
                                                <label class="form-label-emp" for="totalRent">Rental Charge</label>

                                                <input type="number" class="form-control-plaintext"
                                                    id="totalRent"
                                                    name="totalRent"
                                                    placeholder="TotalRent(Rs: 5000.00)"
                                                    tabindex="3"
                                                    //onKeyPress={(event) => {  }}
                                                    max="10000000"
                                                    min="0" readOnly />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row">

                                <div className="col py-3 text-center">
                                    <button type="submit" className="btn btn-ok" >SUMMARY</button>

                                </div>
                                <div className="col py-3 text-center">
                                    <button type="reset" className="btn btn-reset" id="ReSet" onClick={refreshPage} >RESET</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="tab-pane fade " id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="container ">
                            <div>
                                <br></br>
                            </div>
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                                    <form id="contact-form" class="form" role="form" onSubmit={sendData}>
                                        <div class="form-group">
                                            <label class="form-label" for="cname">Customer Name</label>
                                            <input type="text" class="form-control formInput"
                                                id="cname"
                                                name="cname"
                                                placeholder="Full Name"
                                                tabindex="1"
                                                required
                                                maxLength="100"
                                                onChange={(event) => { setCustomerName(event.target.value); summaryCustomer(event.target.value); }} />

                                        </div>
                                        <div class="form-group">
                                            <label class="form-label" for="caddress">Customer Address</label>
                                            <input type="text" class="form-control formInput"
                                                id="caddress"
                                                name="caddress"
                                                placeholder="Permenant Address" tabindex="2"
                                                required
                                                maxLength="200"
                                                onChange={(event) => { setCustomerAdd(event.target.value); }} />

                                        </div>
                                        <div class="row">
                                            <div class="col-6" >
                                                <div class="form-group">
                                                    <label class="form-label" for="cNumber">Contact Number</label>
                                                    <input type="number" class="form-control formInput"
                                                        id="cNumber"
                                                        name="cNumber"
                                                        placeholder="Contact Number (0784123695)"

                                                        onChange={(event) => {
                                                            setContactNo(event.target.value);
                                                            validateMobileNo(event)
                                                        }}
                                                        required />

                                                    <div className={`message ${isMobileValid ? 'success' : 'error'}`}>
                                                        {Mobilemessage}
                                                    </div>

                                                    {Object.keys(MobileErr).map((key) => {
                                                        // return<div style={{color :"red"}}>{MobileErr[key]}</div>


                                                    })}


                                                </div>
                                            </div>
                                            <div class="col-6" >
                                                <div class="form-group">
                                                    <label class="form-label" for="cNIC">Customer NIC</label>
                                                    <input type="text" class="form-control formInput"
                                                        id="cNIC"
                                                        name="cNIC"
                                                        placeholder="National ID(978412351V)"
                                                        onChange={(event) => {
                                                            setCustomerNIC(event.target.value);
                                                            validateNICNo(event)
                                                        }}

                                                        required />


                                                    <div className={`message ${isNICValid ? 'success' : 'error'}`}>
                                                        {NICmessage}
                                                    </div>

                                                    {Object.keys(NICErr).map((key) => {
                                                        // return<div style={{color :"red"}}>{NICErr[key]}</div>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <br></br>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label class="form-label-emp" for="form-control formInput">NIC Upload</label>
                                                    <input type="file" class="form-control formInput"
                                                        id="exampleFormControlFile1"
                                                        name="nicSoftCopy"
                                                        onChange={(event) => { setNICcopy(event.target.value); }}
                                                        pattern="*.[doc,pdf]"
                                                        required
                                                        onClick={checks} />
                                                </div>
                                            </div>


                                        </div>
                                        <div className="row">

                                            <div className="col py-3 text-center">
                                                <button type="submit" id="btnSub" className="btn btn-ok">SAVE</button>
                                            </div>
                                            <div className="col py-3 text-center">
                                                <button type="reset" className="btn btn-reset" id="Reset" >RESET</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" rental-summary-body">
                <div class="tab-content-emp"></div>
                <form>
                    <br></br>
                    <center>
                        <h2>Rental Summary</h2></center>
                    <div class="form-row">
                        <div class="col-6 form-row-change">
                            <label class="form-label-h" for="rentalStatus">Rental Status : </label>
                        </div>
                        <div class="col-4 form-row-change1">
                            <input type="text" class="form-control-plaintext" id="rentalStatus" readOnly />
                        </div>
                    </div>
                    <div class="form-row ">
                        <div class="col-6 form-row-change">
                            <label class="form-label-h" for="customer">Customer Name: </label>
                        </div>
                        <div class="col-4 form-row-change1">
                            <input type="text" class="form-control-plaintext" id="customer" readOnly />
                        </div>
                    </div>
                    <div class="form-row ">
                        <div class="col-6 form-row-change">
                            <label class="form-label-h" for="vehicle">Vehicle: </label>
                        </div>
                        <div class="col-4 form-row-change1">
                            <input type="text" class="form-control-plaintext" id="vehicle" readOnly />
                        </div>
                    </div>
                    <div class="form-row form-row-change">
                        <div class="col-6">
                            <label class="form-label-h" for="rentalDuration" >Rental Duration : </label>
                        </div>
                        <div class="col-4 form-row-change1">
                            <input type="text" class="form-control-plaintext" id="rentalDuration" readOnly />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-6 form-row-change">
                            <label class="form-label-h" for="perDayCharge">Rental Per Day : </label>
                        </div>
                        <div class="col-4 form-row-change1">
                            <input type="text" class="form-control-plaintext"
                                id="perDayCharge"
                                name="perDayCharge"
                                readOnly />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-6 form-row-change">
                            <label class="form-label-h" for="additionalPrice">Additional Price : </label>
                        </div>
                        <div class="col-4 form-row-change1">
                            <input type="text" class="form-control-plaintext" id="addPrice"
                                readOnly />
                        </div>
                        <hr></hr>
                    </div>

                    <div class="form-row">
                        <div class="col-6 form-row-change">
                            <label class="form-label-h" for="tax">Tax : </label>
                        </div>
                        <div class="col-4 form-row-change1">
                            <input type="text" class="form-control-plaintext" id="tax" readOnly />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-6 form-row-change">
                            <label class="form-label-h" for="subRent">Sub Rental Price : </label>
                        </div>
                        <div class="col-4 form-row-change1">
                            <input type="text" class="form-control-plaintext" id="subRent" readOnly />
                        </div>
                        <hr></hr>
                    </div>


                    <div class="form-row">
                        <div class="col-6 form-row-change">
                            <label class="form-label-h" for="advancePay">Advance Deposit :  </label>
                        </div>
                        <div class="col-4 form-row-change1">
                            <input type="text" class="form-control-plaintext" id="advancePay" readOnly />
                        </div>
                    </div>
                    <div class="form-row form-row-change">
                        <div class="col-6">
                            <label class="form-label-h" for="finalPay">Final Rental Price : </label>
                        </div>
                        <div class="col-4 form-row-change1">
                            <input type="text" class="form-control-plaintext" id="finalPrice" readOnly
                            />
                        </div>
                    </div>
                </form>


            </div>

        </div >
    )
}

export default RentalPlacement


