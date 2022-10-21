import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import Eventviewmodal from "../eventReservationManagement/modals/eventView";
import UpdateEventModal from "../eventReservationManagement/modals/updateEvent";
import Header from "../../Header";

function ViewEvent() {
  const [viewevent, setviewevent] = useState([]);
  const [search, setSearch] = useState("");

  const [modalData, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const [modalDataDelete, setModalDataDelete] = useState([]);
  const [modalDeleteConfirm, setModalDeleteConfirm] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [modalLoading, setModalLoading] = useState(false);

  const [modalDataUpdate, setModalDataUpdate] = useState([]);
  const [modalUpdate, setModalUpdate] = useState(false);

  useEffect(() => {
    function getEvent() {
      axios
        .get(`http://localhost:8070/event/displayEvent`)
        .then((res) => {
          setviewevent(res.data.reverse());
        })
        .catch((error) => {
          // alert(error.message);
          console.log("f354754", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            confirmButtonColor: "#207159",
          });
        });
    }

    getEvent();
  }, []);

  useEffect(() => {
    //console.log("component did update", modalDataDelete)
  }, [modalDataDelete]);

  const openModal = (reservations) => {
    setData(reservations);
    handleViewOnClick();
  };

  const handleViewOnClick = () => {
    setModalShow(true);
  };

  //set delete modal
  const openModalDelete = (data) => {
    setModalDataDelete(data);
    setModalDeleteConfirm(true);
  };

  //set update modal
  const openModalUpdate = (data) => {
    //console.log("request came for modal updateeeeeee", data);
    setModalDataUpdate(data);
    setModalUpdate(true);
  };

  // //search all completed record after clicking completed button
  function pendingRecords() {
      function getPendingReservation() {
          axios.get("http://localhost:8070/event/searchCompletedEventRecords/").then((res) => {
              setviewevent(res.data.reverse());
          }).catch((error) => {
              alert(error.message);
          })
      }
      getPendingReservation();
  }

  //search customer nic and package name after the search
  function searchEvent(e) {
    e.preventDefault();
    if (!isNaN(search.charAt(0))) {
      axios
        .get(`http://localhost:8070/event/searchEventRecs/${search}`)
        .then((res) => {
          setviewevent(res.data);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      axios
        .get(`http://localhost:8070/event/searchEventRecordsX/${search}`)
        .then((res) => {
          setviewevent(res.data);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }

  //handle delete from reservation and add to the remove reservation list
  function deleteReservation(data) {
    axios
      .post(`http://localhost:8070/removedEvent/addRemovedReservation`, {
        data,
      })
      .then(() => {
        Swal.fire({
          title: "Completed Reservation removed! ",
          text: "Reservation removed",
          icon: "success",
          confirmButtonColor: "#207159",
        });

        const value = axios.post(
          `http://localhost:8070/event/deleteEvent`,
          modalDataDelete
        );

        if (value) {
          Swal.fire({
            title: "Success!",
            text: `${"Reservation Deleted Successfully"}`,
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            window.location.reload();
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Oops!",
          text: `${"Reservation not Completed"}`,
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  //refresh the page
  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="page-component-body">
      <Header></Header>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Eventviewmodal data={modalData} onHide={() => setModalShow(false)} />
      </Modal>
      <div className="table-emp">
        <div class="row table-head">
          <div class="col">
            <h3 className="float-left" onClick={refreshPage}>
              List of Reservation
            </h3>
          </div>

          <a href="/addEvent" class="float-right">
            <button class="btn btn-ok white">+Add Reservation</button>
          </a>
          <p class="float-right ml-4">
            <button class="btn btn-ok white" id="pending" onClick={pendingRecords}>
              Completed Reservation
            </button>
          </p>
          <a href="/display/RemoveEventlist" class="float-right ml-4" >
            <button class="btn btn-ok white">Past Records</button>
          </a>
        </div>
        <div class="row table-head-search">
          <div className="col-md-8"></div>
          <div className="col">
            <div class="input-group input-group-search">
              <div class="searchbar">
                <form onSubmit={searchEvent}>
                  <input
                    class="search_input"
                    type="text"
                    name="search"
                    placeholder="Search..."
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                    require
                  />
                  <button
                    class="btn search_icon"
                    id="submit"
                    name="submit"
                    type="submit"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                </form>
              </div>
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
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {viewevent.map((reservations) => {
              return (
                <tr>
                  <td
                    class="text"
                    onClick={() => openModal(reservations)}
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Click to view reservation"
                    className="view-td"
                  >
                    {reservations.customername}
                  </td>
                  <td class="text">{reservations.customernic}</td>
                  <td class="text">{reservations.packagename}</td>
                  <td class="text">{reservations.eventtype}</td>
                  <td class="text">
                    {moment(reservations.from).format("YYYY-MMMM-DD")}
                  </td>
                  <td class="text">
                    {moment(reservations.to).format("YYYY-MMMM-DD")}
                  </td>
                  <td class="text-right">
                    {reservations.totalreservation.toFixed(2)}
                  </td>
                  <td class="text-right">{reservations.status}</td>
                  <td class="text">
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        class="btn btn-light btn-sm"
                        onClick={() => openModalUpdate(reservations)}
                      >
                        update
                      </button>

                      <button
                        class="btn btn-danger btn-sm"
                        onClick={() => {
                          openModalDelete(reservations);
                        }}
                        role="button"
                      >
                        remove
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        show={modalDeleteConfirm}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you want to delete this item ?</p>
        </Modal.Body>
        <Modal.Footer>
          <div className="row">
            <div className="col -6">
              <button
                type="submit"
                className="btn btn-delete"
                onClick={() => {
                  deleteReservation(modalDataDelete);
                }}
              >
                Confirm
              </button>
            </div>
            <div
              className="col-6   text-right"
              onClick={() => setModalDeleteConfirm(false)}
            >
              <button type="reset" className="btn btn-reset">
                cancel
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
      {/* modal for display while loading or on error */}

      <Modal
        show={modalLoading}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div class="d-flex justify-content-center mt-2">
            <div class="spinner-grow text-danger" role="status"></div>
            <div class="spinner-grow text-danger" role="status"></div>
            <div class="spinner-grow text-danger" role="status"></div>

            <span class="sr-only">something went wrong...</span>
          </div>
          <div class="d-flex justify-content-center mt-4 h5">
            {" "}
            something went wrong
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="col py-3 text-center">
            <button
              type="submit"
              className="btn btn-delete"
              onClick={() => {
                window.location.reload();
              }}
            >
              Try again
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* modal for update the data of Event */}
      <Modal
        show={modalUpdate}
        onHide={() => setModalUpdate(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <UpdateEventModal
          data={modalDataUpdate}
          onHide={() => setModalUpdate(false)}
        />
      </Modal>
    </div>
  );
}

export default ViewEvent;
