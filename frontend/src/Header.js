import React from "react";
import { useHistory, Link } from "react-router-dom";

import "./style.scss";


function Header(props) {

  // ............................
// Some random colors
// const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

// const numBalls = 2;
// const balls = [];

// for (let i = 0; i < numBalls; i++) {
//   let ball = document.createElement("div");
//   ball.classList.add("ball");
//   ball.style.background = colors[Math.floor(Math.random() * colors.length)];
//   ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
//   ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
//   ball.style.transform = `scale(${Math.random()})`;
//   ball.style.width = `${Math.random()}em`;
//   ball.style.height = ball.style.width;
  
//   balls.push(ball);
//   document.body.append(ball);
// }

// Keyframes
// balls.forEach((el, i, ra) => {
//   let to = {
//     x: Math.random() * (i % 2 === 0 ? -11 : 11),
//     y: Math.random() * 2
//   };

//   let anim = el.animate(
//     [
//       { transform: "translate(0, 0)" },
//       { transform: `translate(${to.x}rem, ${to.y}rem)` }
//     ],
//     {
//       duration: (Math.random() + 1) * 2000, // random duration
//       direction: "alternate",
//       fill: "both",
//       iterations: Infinity,
//       easing: "ease-in-out"
//     }
//   );
// });

// >>>>>>>>>>>>>
  
  let history = useHistory();
  return (
    <div className="page-body ">

      {/* <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div> */}
      <header>
        <nav
          className="navbar navbar-expand-lg navbar-light fixed-top"
          id="mainNav"
        >
          <div className="container-fluid">
            <a className="navbar-brand js-scroll-trigger" href="/dashboard">
              <img src="/images/Let's.png" width="250px" height="100px" alt="todo" border="0" />

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
                  <button class="btn text-light" href="/dashboard">
                    Home <span class="sr-only">(current)</span>
                  </button>
                </li>
                <li class="nav-item">
                  <button class="btn text-light"
                    onClick={() => {
                      history.push("/")
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
              <Link to="/dashboard">
                <i className="fa fa-th fa-2x"></i>
                <span className="nav-text">Dashboard</span>
                <i className="fa fa-angle-right fa-2x"></i>
              </Link>
            </li>
            <hr></hr>
            <li className="has-subnav">
              <li data-toggle="collapse" data-target="#new1" className="collapsed">
                <a href="javascript:void(0)">  <i className="fa fa-clock-o fa-2x"></i> <span className="nav-text">Rentals</span> <i className="fa fa-angle-right fa-animate fa-2x"></i></a>
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
              <li>
              </li>
            </li>
            <hr></hr>
            <li className="has-subnav">
              <li data-toggle="collapse" data-target="#new2" className="collapsed">
                <a href="javascript:void(0)" >  <i className="fa fa-calendar fa-2x"></i> <span className="nav-text">Reservations</span> <i className="fa fa-angle-right fa-animate fa-2x"></i></a>
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
              <li>
              </li>
            </li>
            <hr></hr>
            <li className="has-subnav">
              <li data-toggle="collapse" data-target="#new3" className="collapsed">
                <a href="javascript:void(0)">  <i className="fa fa-car fa-2x"></i> <span className="nav-text">Vehicle Inventory</span> <i className="fa fa-angle-right fa-animate fa-2x"></i></a>
              </li>
              <ul class="sub-menu collapse" id="new3">
                <li class="has-subnav ">
                  <Link to="/vehicle/viewVehicle">
                    <i class="fa"></i>
                    <span className="nav-text">Vehicle List</span>

                    <i class="fa fa-angle-right fa-3x"></i>
                  </Link>
                </li>
                <li className="has-subnav">
                  <Link to="/vehicle/addVehicle">
                    <i className="fa  fa-2x"></i>
                    <span class="nav-text">Add Vehicle</span>
                    <i className="fa fa-angle-right fa-2x"></i>
                  </Link>
                </li>
              </ul>
              <li>
              </li>
            </li>
            <hr></hr>
            <li className="has-subnav">
              <li data-toggle="collapse" data-target="#new4" className="collapsed">
                <a href="javascript:void(0)">  <i className="fa fa-users fa-2x"></i> <span className="nav-text">Employees</span> <i className="fa fa-angle-right fa-animate fa-2x"></i></a>
              </li>
              <ul className="sub-menu collapse" id="new4">
                <li className="has-subnav ">
                  <Link to="/allEmp">
                    <i className="fa"></i>
                    <span className="nav-text">Employee List</span>
                    <i className="fa fa-angle-right fa-3x"></i>
                  </Link>
                </li>
                <li className="has-subnav">
                  <Link to="/addEmp">
                    <i className="fa  fa-2x"></i>
                    <span className="nav-text">Add New Employee</span>
                    <i className="fa fa-angle-right fa-2x"></i>
                  </Link>
                </li>
              </ul>
            </li>
            <hr></hr>
            <li className="has-subnav">
              <li data-toggle="collapse" data-target="#new" className="collapsed">
                <a href="javascript:void(0)">  <i className="fa fa-file-pdf-o fa-2x"></i> <span className="nav-text">Reports</span> <i className="fa fa-angle-right fa-animate fa-2x"></i></a>
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
                  <Link to="/vehicle/viewVehicleReport">
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
      <div>
        {props.children}
      </div>
    </div >
  );
}

export default Header;
