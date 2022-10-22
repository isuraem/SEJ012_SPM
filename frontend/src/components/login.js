import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

export default function LoginUser() {
  let history = useHistory();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState([]);

  function checkUser(e) {
    //function checks the availbilty of the admin within the system
    e.preventDefault();
    //pass the username and password and if exact user exsits will be directed to dashbord else it will display error for unavailable user
    axios
      .get(
        `http://localhost:8070/login/get/${username}/${password}`
      )
      .then((response) => {
        console.log(response.data);
        setLogin(response.data.login);
        if (response.data.login === null) {

         
          alert("User not available");
        } else {
          Swal.fire({
            title: 'Success!',
            text: 'User Available',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        }
        )
          // alert("User available");
          if (response.data.login.username == "CM001") {
    //         "username" : "CM001",
    //          "password" : "home"
            history.push("/home");
          } else if (response.data.login.username == "TD002") {
            // "username" : "TD002",
            // "password" : "lalithya"
            history.push("/vehicle/viewVehicle");
          } else if (response.data.login.username == "RD003") {
            // "username" : "ED003",
            // "password" : "isura"
            history.push("/viewEvent");
          } else if (response.data.login.username == "RT004") {
            // "username" : "ET004",
            // "password" : "oshada"
            history.push("/rentalList");
          } else if (response.data.login.username == "ED005") {
            // "username" : "IM005",
            // "password" : "udana"
            history.push("/allEmp");
          } 
        }
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }

  return (
    <div>
    <br />

<br />
   
      <div className="container">

        <div className="row px-3">
          <div className="col-lg-10 col-xl-9 card flex-row mx-auto px-0">
            <div className="img-left d-none d-md-flex">
            <img src="/images/City driver.png" width="350px" height="350px"/>
            </div>
            <div className="card-body">
              <h4 className="title text-center mt-4">Login</h4>
              <form className="form-box px-3" onSubmit={checkUser}>
                <div className="form-input">
                 
                  <input
                    type="text"
                    name=""
                    placeholder="Username"
                    tabIndex="10"
                    required
                    onChange={(event) => {
                      setUserName(event.target.value);
                    }}
                  />
                </div>
                <div className="form-input">
                  
                  <input
                    type="password"
                    name=""
                    placeholder="Password"
                    tabIndex="10"
                    required
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>
                {/* <div className="mb-3">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="cb1"/>{" "}
                            <label className="custom-control-label" for="cb1">Remember me</label>
                        </div>
                    </div> */}
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-block text-uppercase"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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
<br />
    </div>
  );
}
