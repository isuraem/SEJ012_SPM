import axios from "axios";
import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Modal,Button } from "react-bootstrap";

import Header from "../../Header";

const RemovedEmployee = () => {
    const [employees, setEmployees] = useState([]);
    // const [showEmp, setShowEmp] = useState(false);
    // const [modalEmp, setEmp] = useState([]);

    useEffect(() => {

        function getEmployees() {
            axios.get("http://localhost:8070/REmployee/allREmp").then((res) => {
                setEmployees(res.data.reverse());
                console.log("Data recieved");
            }).catch((error) => {
                alert(error.message);
            })
        }

        getEmployees();

    }, []);

    return(
        <div className="page-component-body">
            <Header></Header>


            <div className="table-emp">
                <div class="row table-head mt-3">
                    <div class="col">
                        <h3 className="float-left ">List of Removed Employees</h3>
                    </div>
                    <a href="/addEmp" class="float-right">
                        <button class="btn btn-ok white">
                            Add Employee
                        </button>
                    </a>
                    <a href="/allEmp" class="float-right">
                        <button class="btn btn-ok white">
                            Current Employees
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
                            {/* <th class="text-right">Action</th> */}
                           
                        </tr>

                    </thead>
                    <tbody>
                        {employees.map((employee) => {

                            return (
                                <tr>
                                    <td class="text-center">{employee.Name}</td>
                                    <td class="text-center">{employee.Email}</td>
                                    <td class="text-center">{employee.Phone}</td>
                                    <td class="text-center">{employee.NIC}</td>
                                    <td class="text-right">{employee.Designation}</td>
                                    {/* <td class="text-center">
                                        <button
                                             class="btn btn-light btn-sm"
                                             onClick={() => openModalEmpUpdate(employee)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => openModalEmpDelete(employee)}
                                            class="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            </div>
    )
}
export default RemovedEmployee