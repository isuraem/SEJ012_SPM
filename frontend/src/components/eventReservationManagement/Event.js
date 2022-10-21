import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import Swal from "sweetalert2";
import Header from "../../Header";

function Reservation() {
  // disable past dates
  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  //disable future dates
  const today = moment().add(30, "days");
  const disableFutureDt = (current) => {
    return current.isBefore(today);
  };


  const [customername, setcustomername] = useState("");
  const [contactnumber, setcontactnumber] = useState("");
  const [nic, setnic] = useState("");
  const [customernic, setcustomernic] = useState("");
  const [customeraddress, setcustomeraddress] = useState("");
  const [packagename, setpackagename] = useState("");
  const [eventtype, seteventtype] = useState("");
  const [from, setfrom] = useState(moment());
  const [to, setto] = useState(moment());
  const [discount, setdiscount] = useState("");
  const [advancedpayment, setadvancedpayment] = useState("");
  const [totalreservation, settotalreservation] = useState("");
  const [status, setstatus] = useState("");


  const [vehicleType, setVehicleType] = useState("");
  const [model, setModel] = useState("");

  const [vehicleType1, setVehicleType1] = useState("");
  const [model1, setModel1] = useState("");

  const [perDayCharge, setPerDayCharge] = useState("");
  const [perDayCharge1, setPerDayCharge1] = useState("");

  const [no1, setno1] = useState("");
  const [no2, setno2] = useState("");

  const [NICErr, setNICErr] = useState("");
  const [MobErr, setMobileErr] = useState("");

  //set remaining payment
  useEffect(() => {
    calcprice1();
  }, [advancedpayment, totalreservation]);

  function sendData(e) {
    console.log("from date", from);
    const finalpay = (document.getElementById("FinalreservationPrice").value =
      document.getElementById("total").value - advancedpayment);

    const NICValid = NICValidation();
    const CntValid = MobileValidation();

    if (NICValid && CntValid) {

         const newReservation = {
            customername,
            contactnumber,
            nic,
            customernic,
            customeraddress,
            packagename,
            eventtype,
            from,
            to,
            discount,
            advancedpayment,
            totalreservation,
            status
          };

         axios
            .post("http://localhost:8070/event/addEvent", newReservation)
            .then(() => {
              console.log("new")
              Swal.fire({
                title: 'Reservation Completed!',
                icon: 'success',
                confirmButtonColor: "#1fc191",
            }).then((res) => {
                if (res.isConfirmed) {
                    window.location.reload();
                }
            })
            }
            )
         
    }
  }

  //select vehicle model under category
  function searchModel() {
    if (document.getElementById("vehicleType").value == "Car") {
      document.getElementById("model1").value = "Axio";
      document.getElementById("model1").innerHTML = "Axio";
      document.getElementById("model2").value = "Leaf";
      document.getElementById("model2").innerHTML = "Leaf";
      document.getElementById("model3").value = "Alto";
      document.getElementById("model3").innerHTML = "Alto";
    } else if (document.getElementById("vehicleType").value == "Van") {
      document.getElementById("model1").value = "Caravan";
      document.getElementById("model1").innerHTML = "Caravan";
      document.getElementById("model2").value = "KDH";
      document.getElementById("model2").innerHTML = "KDH";
    } else if (document.getElementById("vehicleType").value == "Bus") {
      document.getElementById("model1").value = "Coater";
      document.getElementById("model1").innerHTML = "Coater";
      document.getElementById("model2").value = "Rosa";
      document.getElementById("model2").innerHTML = "Rosa";
    }
  }

  //select vehicle model under category
  function searchModel1() {
    if (document.getElementById("vehicleType1").value == "Car") {
      document.getElementById("model11").value = "Axio";
      document.getElementById("model11").innerHTML = "Axio";
      document.getElementById("model22").value = "Leaf";
      document.getElementById("model22").innerHTML = "Leaf";
      document.getElementById("model33").value = "Alto";
      document.getElementById("model33").innerHTML = "Alto";
    } else if (document.getElementById("vehicleType1").value == "Van") {
      document.getElementById("model11").value = "Caravan";
      document.getElementById("model11").innerHTML = "Caravan";
      document.getElementById("model22").value = "KDH";
      document.getElementById("model22").innerHTML = "KDH";
    } else if (document.getElementById("vehicleType1").value == "Bus") {
      document.getElementById("model11").value = "Coater";
      document.getElementById("model11").innerHTML = "Coater";
      document.getElementById("model22").value = "Rosa";
      document.getElementById("model22").innerHTML = "Rosa";
    }
  }

  // date different
  function getDateDiff() {
    var admission = moment(from, "DD-MM-YYYY");
    var discharge = moment(to, "DD-MM-YYYY");
    const diffDuration = discharge.diff(admission, "days");
    return diffDuration;
  }

  //calculate charge per day
  function calculateRentPerDate() {
    function getRentFirstVehicle() {
      axios
        .get(
          `http://localhost:8070/vehicle/searchPerDayRentalPrice/${vehicleType}/${model}`
        )
        .then((res) => {
          setPerDayCharge(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          Swal.fire({
            title: "Error Occured !",
            text: `${error.message}`,
            icon: "error",
            confirmButtonColor: "#1fc191",
          });
        });
    }
    getRentFirstVehicle();
  }

  //calculate charge per day for second vehicle
  function calculateRentPerDate1() {
    function getRentFirstVehicle2() {
      axios
        .get(
          `http://localhost:8070/vehicle/searchPerDayRentalPrice/${vehicleType1}/${model1}`
        )
        .then((res) => {
          setPerDayCharge1(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          Swal.fire({
            title: "Error Occured !",
            text: `${error.message}`,
            icon: "error",
            confirmButtonColor: "#1fc191",
          });
        });
    }
    getRentFirstVehicle2();
  }

  //calculate final payment after clicking payment button
  function CalcFinalPayment() {
    calculateRentPerDate();
    calculateRentPerDate1();

    document.getElementById("perDayCharge").value =
      Number(document.getElementById("noVehiclehide1").value) * perDayCharge;
    document.getElementById("perDayCharge1").value =
      Number(document.getElementById("noVehiclehide2").value) * perDayCharge1;

    var result =
      Number(document.getElementById("perDayCharge").value) +
      Number(document.getElementById("perDayCharge1").value);

    var dis = Number(document.getElementById("discount").value) / 100;

    if (getDateDiff() == 0) {
      var finalresult = (document.getElementById("totalreservation").value =
        result - result * dis);
      document.getElementById("totalreservation").innerHTML =
        result - result * dis;
    } else {
      var finalresult = (document.getElementById("totalreservation").value =
        result * getDateDiff() - result * getDateDiff() * dis);
      document.getElementById("totalreservation").innerHTML =
        result * getDateDiff() - result * getDateDiff() * dis;
    }

    if (document.getElementById("entry1").click) {
      document.getElementById("pentry").style.display = "none";
      document.getElementById("create").style.display = "block";
      document.getElementById("reset").style.display = "block";
    }

    return finalresult;
  }

  //hide payment button after clciking payment button
  function resetclick() {
    if (document.getElementById("reset").click) {
      document.getElementById("pentry").style.display = "block";
      document.getElementById("create").style.display = "none";
      document.getElementById("reset").style.display = "none";
    }
  }

  //set final reservatin payment
  function UpdatedPenaltyDays() {
    var value = CalcFinalPayment();
    settotalreservation(value);
  }

  //set final reservation second page
  function calcprice1() {
    //calculateRentPerDate();
    var finalbill =
      document.getElementById("totalreservation").value -
      Number(advancedpayment);
    document.getElementById("FinalreservationPrice").value = finalbill;
    //document.getElementById('FinalreservationPrice').innerHTML = document.getElementById('totalreservation').value - Number(advancedpayment);
    return finalbill;
  }

  //set date different
  function nodate() {
    document.getElementById("dateRange").value = getDateDiff();
    document.getElementById("dateRange").innerHTML = getDateDiff();
  }

  //set first vehicle unit price
  function unitprice() {
    calculateRentPerDate();
    // document.getElementById('perDayCharge').value = perDayCharge;
    // document.getElementById('perDayCharge').innerHTML = perDayCharge;
  }

  //set second vehicle unit price
  function unitpricesecond() {
    calculateRentPerDate1();
    // document.getElementById('perDayCharge1').value =  perDayCharge1;
    // document.getElementById('perDayCharge1').innerHTML =  perDayCharge1;
  }

  //validate and hold package details after clicking create button
  function addtemporaryilyData(e) {
    e.preventDefault();

    calculateRentPerDate();
    calculateRentPerDate1();
    if (
      packagename == "Package 1" &&
      ((vehicleType == "Car" && vehicleType1 == "Van") ||
        (vehicleType == "Van" && vehicleType1 == "Car"))
    ) {
      document.getElementById("total").value = CalcFinalPayment();
      document.getElementById("packagename").value = packagename;

      Swal.fire({
        icon: "success",
        title: "Package created ! ",
        confirmButtonColor: "#1fc191",
      });
    } else if (
      packagename == "Package 2" &&
      ((vehicleType == "Van" && vehicleType1 == "Bus") ||
        (vehicleType == "Bus" && vehicleType1 == "Van"))
    ) {
      document.getElementById("total").value = CalcFinalPayment();
      document.getElementById("packagename").value = packagename;

      Swal.fire({
        icon: "success",
        title: "Package created ! ",
        confirmButtonColor: "#1fc191",
      });
    } else if (
      packagename == "Package 3" &&
      ((vehicleType == "Bus" && vehicleType1 == "Car") ||
        (vehicleType == "Car" && vehicleType1 == "Bus"))
    ) {
      document.getElementById("total").value = CalcFinalPayment();
      document.getElementById("packagename").value = packagename;

      Swal.fire({
        icon: "success",
        title: "Package created ! ",
        confirmButtonColor: "#1fc191",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Wrong Package created ! ",
        confirmButtonColor: "#1fc191",
      });
    }
  }

  //unhode second vehicle details
  function showDelivery() {
    if (document.getElementById("entry").click) {
      document.getElementById("btnAdd1").style.display = "none";
      document.getElementById("hide11").style.display = "block";
      document.getElementById("hide22").style.display = "block";
      document.getElementById("hide33").style.display = "block";
      document.getElementById("hide44").style.display = "block";
    }
  }

  //validate nic
  const NICValidation = () => {
    const NICErr = {}; //State
    let NICValid = true; //setting flag

    if (customernic.trim().length > 12) {
      NICErr.InValidNIC = " Invalid NIC Number"; // error msg
      Swal.fire({
        title: "Oops!",
        text: `${"Invalid NIC Number"}`,
        icon: "error",
        confirmButtonColor: "#1fc191",
      });
      NICValid = false;
    } else if (customernic.trim().length < 10) {
      NICErr.InValidNIC = "Invalid NIC Number"; // error msg
      Swal.fire({
        title: "Oops!",
        text: `${"Invalid NIC Number"}`,
        icon: "error",
        confirmButtonColor: "#1fc191",
      });
      NICValid = false;
    }

    setNICErr(NICErr); //update error objects
    return NICValid;
  };

  //validate mobile number
  const MobileValidation = () => {
    //validate function

    const MobErr = {}; //State
    let mobileValid = true; //setting flag

    if (contactnumber.trim().length > 10) {
      MobErr.InValidTeleNo = " *Invalid Phone Number"; // error msg
      Swal.fire({
        title: "Oops!",
        text: `${"Invalid Telephone Number"}`,
        icon: "error",
        confirmButtonColor: "#1fc191",
      });
      //alert("**Invalid Telephone Number");
      mobileValid = false;
    } else if (contactnumber.trim().length < 10) {
      MobErr.InValidTeleNo = " *Invalid Phone Number"; // error msg
      Swal.fire({
        title: "Oops!",
        text: `${"Invalid Telephone Number"}`,
        icon: "error",
        confirmButtonColor: "#1fc191",
      });
      //alert("**Invalid Telephone Number");
      mobileValid = false;
    }

    setMobileErr(MobErr); //update error objects

    return mobileValid;
  };

  const [isCntValid, setMobileIsValid] = useState(false);
  const [Mobilemessage, setMobileMessage] = useState("");

  const CntNoRegex = /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/;

  const validateCntNo = (event) => {
    const CntNo = event.target.value;
    if (CntNoRegex.test(CntNo)) {
      setMobileIsValid(true);
      setMobileMessage("Your Contact Number looks good!");
    } else {
      setMobileIsValid(false);
      setMobileMessage("Please enter a Contact Number!");
    }
  };

  const [isNICValid, setNICIsValid] = useState(false);
  const [NICmessage, setNICMessage] = useState("");

  const NICRegex1 = /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][V]$/;
  const NICRegex2 =
    /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/;

  const validateNICNo = (event) => {
    const NIC = event.target.value;
    if (NICRegex1.test(NIC)) {
      setNICIsValid(true);
      setNICMessage("Your NIC looks good!");
    } else if (NICRegex2.test(NIC)) {
      setNICIsValid(true);
      setNICMessage("Your NIC looks good!");
    } else {
      setNICIsValid(false);
      setNICMessage("Please enter a valid NIC Number!");
    }
  };

  //refreshing page
  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="container ">
      <div className="page-component-body pl-0">
        <Header></Header>
        <div class="container input-main-form pl-5">
          <br></br>
          <h3> Event Reservation</h3>
          <br></br>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Package
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link "
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Reservation
              </a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div className="tab-content-emp"></div>
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div class="container">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <form
                      onSubmit={addtemporaryilyData}
                      id="contact-form"
                      class="form"
                    >
                      <div class="form-group">
                        <label class="form-label" for="packageName">
                          Package Name
                        </label>
                        <input
                          type="text"
                          class="form-control formInput"
                          id="packageName"
                          name="packageName"
                          placeholder="Package 1"
                          //tabindex="1"
                          required
                          onChange={(event) => {
                            setpackagename(event.target.value);
                          }}
                        />
                      </div>
                      <br></br>
                      <div class="row">
                        <div class="form-group col-md-4">
                          <label class="form-label-emp" for="from">
                            From
                          </label>
                          <DatePicker
                            //type="date"
                            class="form-control formInput"
                            id="from"
                            name="from"
                            placeholder=""
                            //tabindex="5"
                            required
                            onChange={(event) => {
                              setfrom(event);
                            }}
                            timeFormat={false}
                            isValidDate={disablePastDt}
                          />
                        </div>
                        <div class="form-group col-md-4">
                          <label class="form-label-emp" for="to">
                            To
                          </label>
                          <DatePicker
                            required
                            class="form-control formInput"
                            id="to"
                            name="to"
                            placeholder=""
                            timeFormat={false}
                            isValidDate={disablePastDt}
                            onChange={(event) => {
                              setto(event);
                            }}
                          />
                        </div>
                        <div class="form-group col-md-4">
                          <label class="form-label" for="dateRange">
                            Date Range
                          </label>
                          <input
                            type="text"
                            class="form-control formInput"
                            id="dateRange"
                            name="dateRange"
                            placeholder="Date Range"
                            //tabindex="2"
                            disabled
                            //pattern="[0-9]"
                          />
                        </div>
                      </div>
                      <br></br>

                      <div class="row">
                        <div class="form-group col-md-4" id="hide1">
                          <label class="form-label-emp" for="vehicleType">
                            Vehicle Type
                          </label>
                          <select
                            id="vehicleType"
                            className="form-control "
                            //tabindex="3"
                            onChange={(e) => {
                              setVehicleType(e.target.value);
                              searchModel();
                              nodate();
                            }}
                            required
                          >
                            <option>choose</option>
                            <option id="type1" value="Car">
                              Car
                            </option>
                            <option id="type2" value="Van">
                              Van
                            </option>
                            <option id="type3" value="Bus">
                              Bus
                            </option>
                          </select>
                        </div>
                        <div class="form-group col-md-4" id="hide2">
                          <label class="form-label-emp" for="vehicleModel">
                            Vehicle Model
                          </label>
                          <select
                            id="vehicleModel"
                            className="form-control "
                            tabindex="4"
                            //required
                            onChange={(event) => {
                              setModel(event.target.value);
                            }}
                          >
                            <option>choose</option>
                            <option id="model1"></option>
                            <option id="model2"></option>
                            <option id="model3"></option>
                          </select>
                        </div>
                        <div class="form-group col-md-2" id="hide3">
                          <label class="form-label-emp" for="noVehiclehide1">
                            No of Vehicle
                          </label>
                          <input
                            type="number"
                            class="form-control formInput"
                            id="noVehiclehide1"
                            name="noVehiclehide1"
                            placeholder="Count"
                            min="1"
                            //tabindex="5"
                            pattern="[0-9]"
                            required
                            onChange={(event) => {
                              setno1(event.target.value);
                              unitprice();
                            }}
                          />
                        </div>
                        <div class="form-group col-md-2" id="hide4">
                          <label class="form-label-emp" for="perDayCharge">
                            Price
                          </label>
                          <input
                            type="text"
                            class="form-control formInput"
                            id="perDayCharge"
                            name="perDayCharge"
                            placeholder="0.00"
                            //onChange={(event) => { setPerDayCharge(event.target.value); }}
                            disabled
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div
                          class="form-group col-md-4"
                          style={{ display: "none" }}
                          id="hide11"
                        >
                          <label class="form-label-emp" for="vehicleType1">
                            Vehicle Type
                          </label>
                          <select
                            id="vehicleType1"
                            className="form-control "
                            //tabindex="3"
                            onChange={(e) => {
                              setVehicleType1(e.target.value);
                              searchModel1();
                            }}
                            required
                          >
                            <option>choose</option>
                            <option id="type11" value="Car">
                              Car
                            </option>
                            <option id="type22" value="Van">
                              Van
                            </option>
                            <option id="type33" value="Bus">
                              Bus
                            </option>
                          </select>
                        </div>
                        <div
                          class="form-group col-md-4"
                          style={{ display: "none" }}
                          id="hide22"
                        >
                          <label class="form-label-emp" for="vehicleModel">
                            Vehicle Model
                          </label>
                          <select
                            id="vehicleModelnew"
                            className="form-control "
                            //tabindex="4"
                            onChange={(event) => {
                              setModel1(event.target.value);
                            }}
                          >
                            <option>choose</option>
                            <option id="model11"></option>
                            <option id="model22"></option>
                            <option id="model33"></option>
                          </select>
                        </div>
                        <div
                          class="form-group col-md-2"
                          style={{ display: "none" }}
                          id="hide33"
                        >
                          <label class="form-label-emp" for="noVehiclehide2">
                            No of Vehicle
                          </label>
                          <input
                            type="number"
                            class="form-control formInput"
                            id="noVehiclehide2"
                            name="noVehiclehide2"
                            placeholder="Count"
                            min="1"
                            //tabindex="5"
                            pattern="[0-9]"
                            required
                            onChange={(event) => {
                              setno2(event.target.value);
                              unitpricesecond();
                            }}
                          />
                        </div>
                        <div
                          class="form-group col-md-2"
                          style={{ display: "none" }}
                          id="hide44"
                        >
                          <label class="form-label-emp" for="perDayCharge1">
                            Price
                          </label>
                          <input
                            type="text"
                            class="form-control formInput"
                            id="perDayCharge1"
                            name="perDayCharge1"
                            placeholder="0.00"
                            //onChange={(event) => { setPerDayCharge1(event.target.value); }}
                            disabled
                          />
                        </div>
                      </div>
                      <div class="row" id="btnAdd1">
                        <div class="form-group col-md-2">
                          <input
                            type="button"
                            class="btn btn-info"
                            id="entry"
                            value=" Add Vehicles"
                            onClick={showDelivery}
                          />
                        </div>
                      </div>
                      <br></br>
                      <div class="row">
                        <div class="form-group col-md-6">
                          <label class="form-label" for="discount">
                            Discount
                          </label>
                          <input
                            type="text"
                            class="form-control formInput"
                            id="discount"
                            name="discount"
                            placeholder="Discount (5)"
                            //tabindex="6"
                            //pattern="[0-9]"
                            //required
                            onChange={(event) => {
                              setdiscount(event.target.value);
                            }}
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label class="form-label-emp" for="totalreservation">
                            Total Price
                          </label>
                          <input
                            type="text"
                            class="form-control formInput"
                            id="totalreservation"
                            name="totalreservation"
                            placeholder="0.00"
                            //tabindex="7"
                            //required

                            onChange={(event) => {
                              settotalreservation(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div class="col py-3 text-center" id="pentry">
                          <input
                            type="button"
                            class="btn btn-info-total"
                            id="entry1"
                            value=" Payment "
                            onClick={(CalcFinalPayment, UpdatedPenaltyDays)}
                          />
                        </div>
                        <div
                          className="col py-3 text-center"
                          style={{ display: "none" }}
                          id="create"
                        >
                          <button
                            type="submit"
                            className="btn btn-ok" /*onClick ="sendpackageName();"*/
                          >
                            Create
                          </button>
                        </div>
                        <div
                          className="col py-3 text-center"
                          style={{ display: "none" }}
                          id="reset"
                        >
                          <button
                            type="reset"
                            className="btn btn-reset"
                            onClick={resetclick}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>

                    <br></br>
                  </div>
                </div>
              </div>
              <div className=" package ml-5">
                <div class="tab-content-emp"></div>
                <form>
                  <br></br>
                  <center>
                    <h2>Packages</h2>
                  </center>
                  <div class="form-row">
                    <div class="col-6 form-row-change">
                      <label class="form-label-reservation" for="rentalStatus">
                        Package 1:{" "}
                      </label>
                    </div>
                    <div class="col-4 form-row-change1">
                      <input
                        type="text"
                        class="form-control-plaintext"
                        id="rentalStatus"
                        value="Car & Van"
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="form-row ">
                    <div class="col-6 form-row-change">
                      <label class="form-label-reservation" for="customer">
                        Package 2:{" "}
                      </label>
                    </div>
                    <div class="col-4 form-row-change1">
                      <input
                        type="text"
                        class="form-control-plaintext"
                        id="customer"
                        value="Van & Bus"
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="form-row ">
                    <div class="col-6 form-row-change">
                      <label class="form-label-reservation" for="vehicle">
                        Package 3:{" "}
                      </label>
                    </div>
                    <div class="col-4 form-row-change1">
                      <input
                        type="text"
                        class="form-control-plaintext"
                        id="vehicle"
                        value="Bus & Car"
                        readOnly
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div
              class="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div class="container">
                <br></br>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <form onSubmit={sendData} id="contact-form" class="form">
                      <div class="row">
                        <br></br>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                          <h3 className="text-left mt-4 mb-3 customersize">
                            Customer Details
                          </h3>
                        </div>
                      </div>
                      <div class="row">
                        <div class="form-group col-md-6">
                          <label class="form-label" for="customername">
                            Customer Name
                          </label>
                          <input
                            type="text"
                            class="form-control formInput"
                            id="customername"
                            name="customername"
                            placeholder="Full Name"
                            tabindex="1"
                            required
                            onChange={(event) => {
                              setcustomername(event.target.value);
                            }}
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label class="form-label" for="customernic">
                            Customer NIC
                          </label>
                          <input
                            type="text"
                            class="form-control formInput"
                            id="customernic"
                            name="customernic"
                            placeholder="Customer NIC - 985732984V"
                            required
                            onChange={(event) => {
                              setcustomernic(event.target.value);
                              validateNICNo(event);
                            }}
                          />
                          <div
                            className={`message ${
                              isNICValid ? "success" : "error"
                            }`}
                          >
                            {NICmessage}
                          </div>

                          {Object.keys(NICErr).map((key) => {
                            // return <div style={{ color: "red" }}>{NICErr[key]}</div>
                          })}
                        </div>
                      </div>
                      <div class="row">
                        <div class="form-group col-md-6">
                          <label class="form-label" for="contactnumber">
                            Contact Number
                          </label>
                          <input
                            type="text"
                            class="form-control formInput"
                            id="contactnumber"
                            name="contactnumber"
                            placeholder="Contact Number(0703814914)"
                            required
                            onChange={(event) => {
                              setcontactnumber(event.target.value);
                              validateCntNo(event);
                            }}
                          />
                          <div
                            className={`message ${
                              isCntValid ? "success" : "error"
                            }`}
                          >
                            {Mobilemessage}
                          </div>

                          {Object.keys(MobErr).map((key) => {
                            // return<div className ={message}>{TeleErr[key]}</div>
                          })}
                        </div>
                        <div class="form-group col-md-6">
                          <label class="form-label" for="nic">
                            NIC
                          </label>
                          <input
                            type="file"
                            class="form-control formInput"
                            id="nic"
                            name="nic"
                            placeholder="NIC (965169472v)"
                            //tabindex="3"
                            //required
                            onChange={(event) => {
                              setnic(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="form-label" for="customeraddress">
                          Customer Address
                        </label>
                        <input
                          type="text"
                          class="form-control formInput"
                          id="customeraddress"
                          name="customeraddress"
                          placeholder="Customer Address"
                          //tabindex="4"
                          required
                          onChange={(event) => {
                            setcustomeraddress(event.target.value);
                          }}
                        />
                      </div>
                      <div class="row">
                        <br></br>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                          <h3 className="text-left mt-4 mb-4 reservesize">
                            Reservation Details
                          </h3>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="form-label-emp" for="packagename">
                          Package Name
                        </label>
                        <input
                          type="text"
                          class="form-control formInput"
                          id="packagename"
                          name="packagename"
                          placeholder=""
                          //tabindex="7"
                          required
                          disabled
                        />
                      </div>
                      <div class="row">
                        <div class="form-group col-md-6">
                          <label class="form-label" for="eventtype">
                            Event Type
                          </label>
                          <input
                            type="text"
                            class="form-control formInput"
                            id="eventtype"
                            name="eventtype"
                            placeholder="Event Type (Wedding)"
                            //tabindex="7"
                            required
                            onChange={(event) => {
                              seteventtype(event.target.value);
                            }}
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label class="form-label-emp" for="status">
                            Status
                          </label>
                          <select
                            id="status"
                            className="form-control "
                            onChange={(event) => {
                              setstatus(event.target.value);
                            }}
                          >
                            <option id="pending">Select</option>
                            <option id="pending">Pending</option>
                            <option id="complete">Complete</option>
                          </select>
                        </div>
                      </div>
                      <div class="row">
                        <div class="form-group col-md-6">
                          <label class="form-label" for="advancedpayment">
                            Advanced Payment
                          </label>
                          <input
                            type="text"
                            class="form-control formInput"
                            id="advancedpayment"
                            name="advancedpayment"
                            placeholder="Advanced Payment (10000.00)"
                            required
                            //tabindex="9"
                            onChange={(event) => {
                              setadvancedpayment(event.target.value);
                            }}
                            // onFocus={calculateRentPerDate}
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label class="form-label-emp" for="total">
                            Total Reservation Price
                          </label>
                          <input
                            type="text"
                            class="form-control formInput"
                            id="total"
                            name="total"
                            placeholder="Total Reservation Price (25000.00)"
                            //tabindex="10"
                            disabled
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="form-group col-md-6">
                          <label
                            class="form-label-emp"
                            for="FinalreservationPrice"
                          >
                            Final Remaining Price
                          </label>
                          <input
                            type="text"
                            class="form-control formInput"
                            id="FinalreservationPrice"
                            name="FinalreservationPrice"
                            placeholder="Final Reservation Price (15000.00)"
                            //tabindex="11"
                            disabled
                            /*onChange={(event) => 
                                                        {
                                                            setcustomername(event.target.value);
                                                        }
                                                    }*/
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col py-3 text-center">
                          <button type="submit" className="btn btn-ok">
                            Reserve
                          </button>
                        </div>
                        <div className="col py-3 text-center">
                          <button type="reset" className="btn btn-reset">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                    <br></br>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
      </div>
    </div>
  );
}

export default Reservation;

{
}
