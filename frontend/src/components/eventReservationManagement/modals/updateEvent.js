import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useHistory, useParams, Link } from "react-router-dom";
import DatePicker from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import Swal from "sweetalert2";

import { Modal } from "react-bootstrap";

function UpdateEvent(reservations) {
  // let history = useHistory();

  const RID = reservations.data.eventid;

  useEffect(() => {
    loadReservation();
  }, []);

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
  const [returnDay, setreturnDay] = useState(moment());
  const [penaltyDay, setpenaltyDay] = useState("");
  const [penalty, setpenalty] = useState("");

  const [remaining, setremaining] = useState("");

  const loadReservation = async () => {
    await axios
      .get(`http://localhost:8070/event/getEvent/${RID}`)
      .then((res) => {
        setcustomername(res.data.events.customername);
        setcontactnumber(res.data.events.contactnumber);
        setnic(res.data.events.nic);
        setcustomernic(res.data.events.customernic);
        setcustomeraddress(res.data.events.customeraddress);
        setpackagename(res.data.events.packagename);
        seteventtype(res.data.events.eventtype);
        setfrom(res.data.events.from);
        setto(res.data.events.to);
        setdiscount(res.data.events.discount);
        setadvancedpayment(res.data.events.advancedpayment);
        settotalreservation(res.data.events.totalreservation);
        setstatus(res.data.events.status);
        setreturnDay(res.data.events.returnDay);
        setpenaltyDay(res.data.events.penaltyDay);
        setpenalty(res.data.events.penaltyCharge);
        //setremaining(res.data.reservation.remaining);
      })
      .catch((err) => {
        alert(err);
        Swal.fire({
          title: "Are you sure you want to close the Reservation ? ",
          text: `${err.response.data.error}`,
          showConfirmButton: true,
          showDenyButton: true,
          confirmButtonText: "Proceed",
          denyButtonText: "Cancel",
          confirmButtonColor: "#1fc191",
        });
      });
  };

  //disable past dates
  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  // calculate the penalty Day
  function getDateDiff() {
    var TO = moment(to).format("YYYY-MMMM-DD");
    var Ret = moment(returnDay).format("YYYY-MMMM-DD");
    var admission = moment(TO, "YYYY-MMMM-DD");
    var discharge = moment(Ret, "YYYY-MMMM-DD");
    const diffDuration = discharge.diff(admission, "days");
    return diffDuration;
  }

  //calculate the penalty Cost
  function calculatePenaltycharge() {
    const Price = totalreservation * (5 / 100) * getDateDiff();

    return Price;
  }

  //calculate reamaing payment
  function calculateRemainingCharge() {
    return totalreservation - advancedpayment + calculatePenaltycharge();
  }

  //update payment details
  function updateTotal() {
    document.getElementById("penaltyCharge").value = calculatePenaltycharge();
    document.getElementById("remaining").value = calculateRemainingCharge();

    if (document.getElementById("entry").click) {
      document.getElementById("pentry").style.display = "none";
      document.getElementById("update").style.display = "block";
      document.getElementById("reset").style.display = "block";
    }
  }

  //reset page after clicking cancel button
  function resetclick() {
    if (document.getElementById("reset").click) {
      document.getElementById("pentry").style.display = "block";
      document.getElementById("update").style.display = "none";
      document.getElementById("reset").style.display = "none";
    }
  }

  //calculate penalty charge
  function calculateCharges() {
    document.getElementById("penaltyDay").value = getDateDiff();
  }

  const penaltyCharge = calculatePenaltycharge();

  //set penalty day
  function UpdatedPenaltyDays() {
    var value = getDateDiff();
    setpenaltyDay(value);
  }

  //update data after submit form
  const onSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure you want to close the Reservation ? ",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Proceed",
      denyButtonText: "Cancel",
      confirmButtonColor: "#1fc191",
    }).then((result) => {
      if (result.isConfirmed) {
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
          status,
          returnDay,
          penaltyDay,
          penaltyCharge,
          //remaining
        };

        axios
          .put(`http://localhost:8070/event/updateEvent/${RID}`, newReservation)
          .then(() => {
            Swal.fire({
              title: "Reservation Record successfully Completed! ",
              icon: "success",
              confirmButtonColor: "#207159",
            }).then((res) => {
              if (res.isConfirmed) {
                window.location.replace("/viewEvent");
              }
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error with reservation occured ! ",
              text: `${err.response.data.error}`,
              icon: "error",
              confirmButtonColor: "#207159",
            });
          });
      } else if (result.isDenied) {
        refreshPage();
      }
    });
  };

  //refresh page
  function refreshPage() {
    window.location.reload();
  }

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>
          Update Reservation : {reservations.data.customername}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <form id="contact-form" class="form" onSubmit={onSubmit}>
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
                  <label class="form-label-emp" for="customername">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    class="form-control formInput"
                    id="customername"
                    name="customername"
                    placeholder="Customer Name"
                    value={customername}
                    onChange={(event) => {
                      setcustomername(event.target.value);
                    }}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label class="form-label-emp" for="contactnumber">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    class="form-control formInput"
                    id="contactnumber"
                    name="contactnumber"
                    placeholder="Contact Number"
                    value={contactnumber}
                    onChange={(event) => {
                      setcontactnumber(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label class="form-label-emp" for="customernic">
                    Customer NIC
                  </label>
                  <input
                    type="text"
                    class="form-control formInput"
                    id="customernic"
                    name="customernic"
                    placeholder="Customer Address"
                    tabindex="3"
                    value={customernic}
                    onChange={(event) => {
                      setcustomernic(event.target.value);
                    }}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label class="form-label-emp" for="customeraddress">
                    Customer Address
                  </label>
                  <input
                    type="text"
                    class="form-control formInput"
                    id="customeraddress"
                    name="customeraddress"
                    placeholder="Customer Address"
                    tabindex="3"
                    value={customeraddress}
                    onChange={(event) => {
                      setcustomeraddress(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="row">
                <br></br>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                  <h3 className="text-left mt-4 mb-4 reservesize">
                    Reservation Details
                  </h3>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-4">
                  <label class="form-label-emp" for="from">
                    From
                  </label>
                  <input
                    class="form-control formInput"
                    id="from"
                    name="from"
                    required
                    value={moment(from).format("YYYY-MM-DD")}
                    timeFormat={false}
                    onChange={(event) => {
                      setfrom(event);
                    }}
                    readonly="readonly"
                  />
                </div>
                <div class="form-group col-md-4">
                  <label class="form-label-emp" for="to">
                    To
                  </label>
                  <input
                    required
                    class="form-control formInput"
                    id="to"
                    name="to"
                    value={moment(to).format("YYYY-MM-DD")}
                    timeFormat={false}
                    onChange={(event) => {
                      setto(event);
                    }}
                    readonly="readonly"
                  />
                </div>
                <div class="form-group col-md-4">
                  <label class="form-label-emp" for="status">
                    Status
                  </label>
                  <select
                    id="status"
                    className="form-control "
                    tabindex="4"
                    value={status}
                    onChange={(event) => {
                      setstatus(event.target.value);
                      UpdatedPenaltyDays();
                      // oldcomment?
                      ///UpdatedRemainder();
                    }}
                  >
                    <option id="pending">Pending</option>
                    <option id="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-4">
                  <label class="form-label-emp" for="returnDay">
                    Return Date
                  </label>
                  <DatePicker
                    required
                    id="returnDay"
                    name="returnDay"
                    placeholder=""
                    value={moment(returnDay).format("YYYY-MM-DD")}
                    timeFormat={false}
                    onChange={(event) => {
                      setreturnDay(event);
                    }}
                    // isValidDate={disablePastDt}
                    // onClose={calculateCharges}
                  />
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-6">
                  <label class="form-label-emp" for="penaltyDay">
                    Penalty Days
                  </label>
                  <input
                    type="Number"
                    class="form-control formInput"
                    id="penaltyDay"
                    name="penaltyDay"
                    placeholder="0"
                    //required
                    value={penaltyDay}
                    onChange={(event) => {
                      setpenaltyDay(event.target.value);
                      {
                        /*getDateDiff()*/
                      }
                    }}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label class="form-label-emp" for="penaltyCharge">
                    Penalty Charge
                  </label>
                  <input
                    type="number"
                    class="form-control formInput"
                    id="penaltyCharge"
                    name="penaltyCharge"
                    placeholder="0"
                    value={penalty}
                    onChange={(e) => {
                      setpenalty(e.target.value);
                      calculatePenaltycharge();
                    }}
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label class="form-label-emp" for="advancedpayment">
                    Advanced Payment
                  </label>
                  <input
                    type="number"
                    class="form-control formInput"
                    id="advancedpayment"
                    name="advancedpayment"
                    placeholder="Advanced Payment"
                    value={advancedpayment}
                    onChange={(event) => {
                      setadvancedpayment(event.target.value);
                    }}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label class="form-label-emp" for="totalreservation">
                    Total Reservation Payment
                  </label>
                  <input
                    type="number"
                    class="form-control formInput"
                    id="totalreservation"
                    name="totalreservation"
                    placeholder="Total Reservation Payment"
                    tabindex="11"
                    value={totalreservation}
                    required

                    // onChange={(event) => { settotalreservation(event.target.value) }}
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label class="form-label-emp" for="remaining">
                    Remaining Reservation Payment
                  </label>
                  <input
                    type="number"
                    class="form-control formInput"
                    id="remaining"
                    name="remaining"
                    value={remaining}
                    placeholder="Remaining Reservation Payment"
                    onChange={(event) => {
                      setremaining(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col py-3 text-center" id="pentry">
                  <input
                    type="button"
                    class="btn btn-info-total"
                    id="entry"
                    value="Payment"
                    onClick={updateTotal}
                  />
                </div>
                <div
                  className="col py-3 text-center"
                  id="update"
                  style={{ display: "none" }}
                >
                  <button type="submit" className="btn btn-ok">
                    Update
                  </button>
                </div>
                <div
                  className="col py-3 text-center"
                  id="reset"
                  style={{ display: "none" }}
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
          </div>
        </div>
      </Modal.Body>
    </div>
  );
}

export default UpdateEvent;
