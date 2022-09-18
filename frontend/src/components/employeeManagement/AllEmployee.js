import axios from 'axios'
import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2'

import Header from "../../Header";



export default function AllEmployee() {


    // const [search, setSearch] = useState("");

    const [employees, setEmployees] = useState([]);
    



    useEffect(() => {

        function getEmployees() {
            axios.get("http://localhost:8070/employee/allEmp").then((res) => {


                setEmployees(res.data.reverse());
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

        getEmployees();

    }, []);


  


    return (
        <div className='container pt-2'>

        <div className="page-component-body">
            <Header></Header>


            <div className="table-emp">
                <div class="row table-head mt-3">
                    <div class="col">
                        <h3 className="float-left ">List of current employees</h3>
                    </div>
                    <a href="/addEmp" class="float-right">
                        <button class="btn btn-ok white">
                            Add Employee
                        </button>
                    </a>
                    <a href="/" class="float-right">
                        <button class="btn btn-ok white">
                            Resigned Employees
                        </button>
                    </a>
                   
                </div>
            

                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th class="text-center">EmpName</th>
                            <th class="text-center">Email</th>
                            <th class="text-center">Phone</th>
                            <th class="text-center">NIC</th>
                            <th class="text-right">Designation</th>
                            {/* <th class="text-right">Years Of Rent </th> */}
                           
                        </tr>

                    </thead>
                    <tbody>
                        {employees.map((employees) => {

                            return (
                                <tr>
                                    <td class="text-center">{employees.Name}</td>
                                    <td class="text-center">{employees.Email}</td>
                                    <td class="text-center">{employees.Phone}</td>
                                    <td class="text-center">{employees.NIC}</td>
                                    <td class="text-right">{employees.Designation}</td>
                                    {/* <td class="text-right">{employees.YearsRent}</td> */}
                                </tr>
                            );


                        })}


                    </tbody>
                </table>
            </div>

           

        </div>
        </div>
    )
}

