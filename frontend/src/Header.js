import React from "react";
import { useHistory, Link } from "react-router-dom";

import "./style.scss";

function Header(props) {
  let history = useHistory();
  return (
    <div className="page-body ">
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <header>
        <nav
          className="navbar navbar-expand-lg navbar-light fixed-top"
          id="mainNav"
        >
          <div className="container-fluid">
            <a className="navbar-brand js-scroll-trigger" href="#">
              <img
                src="images/Let's.png"
                width="250px"
                height="100px"
              
                alt="todo"
                border="0"
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <Link to="/dashboard">
                    <button class="btn text-light">
                      Home <span class="sr-only">(current)</span>
                    </button>
                  </Link>
                </li>
                <li class="nav-item">
                  <button
                    class="btn text-light"
                    onClick={() => {
                      history.push("/");
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div>
        <div className="area"></div>
        <nav className="main-menu fixed-top">
          <ul>
            <hr></hr>
            <li>
              <Link to="#">
                <i className="fa fa-th fa-2x"></i>
                <span className="nav-text">Dashboard</span>
                <i className="fa fa-angle-right fa-2x"></i>
              </Link>
            </li>
            <hr></hr>
            <li className="has-subnav">
              <li
                data-toggle="collapse"
                data-target="#new1"
                className="collapsed"
              >
                <a href="javascript:void(0)">
                  {" "}
                  <i className="fa fa-clock-o fa-2x"></i>{" "}
                  <span className="nav-text">Rentals</span>{" "}
                  <i className="fa fa-angle-right fa-animate fa-2x"></i>
                </a>
              </li>
              <ul className="sub-menu collapse" id="new1">
                <li className="has-subnav">
                  <Link to="/rentalList">
                    <i className="fa  fa-2x"></i>
                    <span className="nav-text">Rentals List</span>
                    <i className="fa fa-angle-right fa-2x"></i>
                  </Link>
                </li>
                <li className="has-subnav ">
                  <Link to="/addRental">
                    <i className="fa"></i>
                    <span className="nav-text">Add Rentals</span>
                    <i className="fa fa-angle-right fa-3x"></i>
                  </Link>
                </li>
              </ul>
              <li></li>
            </li>
            <hr></hr>
            <li className="has-subnav">
              <li
                data-toggle="collapse"
                data-target="#new2"
                className="collapsed"
              >
                <a href="javascript:void(0)">
                  {" "}
                  <i className="fa fa-calendar fa-2x"></i>{" "}
                  <span className="nav-text">Reservations</span>{" "}
                  <i className="fa fa-angle-right fa-animate fa-2x"></i>
                </a>
              </li>
              <ul className="sub-menu collapse" id="new2">
                <li className="has-subnav">
                  <Link to="/viewEvent">
                    <i className="fa  fa-2x"></i>
                    <span className="nav-text"> Reservations List</span>
                    <i className="fa fa-angle-right fa-2x"></i>
                  </Link>
                </li>
                <li className="has-subnav ">
                  <Link to="/addEvent">
                    <i className="fa"></i>
                    <span className="nav-text">Add Reservation</span>
                    <i className="fa fa-angle-right fa-3x"></i>
                  </Link>
                </li>
              </ul>
              <li></li>
            </li>
            <hr></hr>
            <li className="has-subnav">
              <li
                data-toggle="collapse"
                data-target="#new3"
                className="collapsed"
              >
                <a href="javascript:void(0)">
                  {" "}
                  <i className="fa fa-car fa-2x"></i>{" "}
                  <span className="nav-text">Vehicle Inventory</span>{" "}
                  <i className="fa fa-angle-right fa-animate fa-2x"></i>
                </a>
              </li>
              <ul class="sub-menu collapse" id="new3">
                <li class="has-subnav ">
                  <Link to="/vehicleList">
                    <i class="fa"></i>
                    <span className="nav-text">Vehicle List</span>

                    <i class="fa fa-angle-right fa-3x"></i>
                  </Link>
                </li>
                <li className="has-subnav">
                  <Link to="/addVehicle">
                    <i className="fa  fa-2x"></i>
                    <span class="nav-text">Add Vehicle</span>
                    <i className="fa fa-angle-right fa-2x"></i>
                  </Link>
                </li>
              </ul>
              <li></li>
            </li>
            <hr></hr>
            <li className="has-subnav">
              <li
                data-toggle="collapse"
                data-target="#new4"
                className="collapsed"
              >
                <a href="javascript:void(0)">
                  {" "}
                  <i className="fa fa-users fa-2x"></i>{" "}
                  <span className="nav-text">Employees</span>{" "}
                  <i className="fa fa-angle-right fa-animate fa-2x"></i>
                </a>
              </li>
              <ul className="sub-menu collapse" id="new4">
                <li className="has-subnav ">
                  <Link to="/empList">
                    <i className="fa"></i>
                    <span className="nav-text">Employee List</span>
                    <i className="fa fa-angle-right fa-3x"></i>
                  </Link>
                </li>
                <li className="has-subnav">
                  <Link to="/addEmployee">
                    <i className="fa  fa-2x"></i>
                    <span className="nav-text">Add New Employee</span>
                    <i className="fa fa-angle-right fa-2x"></i>
                  </Link>
                </li>
              </ul>
            </li>
            <hr></hr>
            <li className="has-subnav">
              <li
                data-toggle="collapse"
                data-target="#new"
                className="collapsed"
              >
                <a href="javascript:void(0)">
                  {" "}
                  <i className="fa fa-file-pdf-o fa-2x"></i>{" "}
                  <span className="nav-text">Reports</span>{" "}
                  <i className="fa fa-angle-right fa-animate fa-2x"></i>
                </a>
              </li>
              <ul className="sub-menu collapse" id="new">
                <li className="has-subnav ">
                  <Link to="/employee/report">
                    <i className="fa"></i>
                    <span className="nav-text">Employees</span>
                    <i className="fa fa-angle-right fa-3x"></i>
                  </Link>
                </li>
                <li className="has-subnav">
                  <Link to="/rental/report">
                    <i className="fa  fa-2x"></i>
                    <span className="nav-text">Rentals</span>
                    <i className="fa fa-angle-right fa-2x"></i>
                  </Link>
                </li>
                <li className="has-subnav">
                  <Link to="/reservation/report">
                    <i className="fa fa-2x"></i>
                    <span className="nav-text">Reservations</span>
                    <i className="fa fa-angle-right fa-2x"></i>
                  </Link>
                </li>
                <li className="has-subnav">
                  <Link to="/vehicle/report">
                    <i className="fa fa-2x"></i>
                    <span className="nav-text">Vehicle Inventory</span>
                    <i className="fa fa-angle-right fa-2x"></i>
                  </Link>
                </li>
              </ul>
            </li>
            <hr></hr>
            <li>
              <Link to="/makeInquiry">
                <i className="fa fa-question-circle-o fa-2x"></i>
                <span className="nav-text">Make an Inquiry</span>
                <i className="fa fa-angle-right fa-2x"></i>
              </Link>
            </li>
            <hr></hr>
          </ul>
        </nav>
      </div>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <div>{props.children}</div>
    </div>
  );
}

export default Header;
