import axios from 'axios'
import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'

import UpdateEmployee from './UpdateEmployee';

import Header from "../../Header";



export default function AllEmployee() {


    // const [search, setSearch] = useState("");

    const [employees, setEmployees] = useState([]);
    
    const [ModalEmpUpdate, setModalEmpUpdate] = useState([]);
    const [ModalEmpUpdateConfirm, setModalEmpUpdateConfirm] = useState(false);

    const [ModalEmpDelete, setModalEmpDelete] = useState([]);
    const [ModalEmpDeleteConfirm, setModalEmpDeleteConfirm] = useState(false);


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

    const deleteEmployee = async(data) => {
        console.log("deleteEmployee...",data);
        await axios.post("http://localhost:8070/REmployee/addRemovedEmp/",{data}).then(() =>{
            Swal.fire({
                title: 'Success!',
                text: 'Permenantly deleted the Employee Record',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            console.log("Emp delete modal....");

            console.log(ModalEmpDelete);
            const value = axios.post
            ("http://localhost:8070/employee/deleteEmp",ModalEmpDelete);
            if(value){
                Swal.fire({
                    title: 'Success!',
                    text: 'Permenantly deleted the Employee Record &  added successfully into the Removed Employee List !!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                }).then(()=>{
                    console.log("111111111111");
                    window.location.reload();
                })
            }
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                confirmButtonColor: '#207159',

            }).then(() => {
                window.location.reload();
            })
            alert(err.response.data.errorCode)
        })
    }


    const openModalEmpUpdate = (data) => {
        setModalEmpUpdate(data);
        setModalEmpUpdateConfirm(true);
    }

    const openModalEmpDelete = (data) => {
        console.log("delEmp")
        setModalEmpDelete(data);
        setModalEmpDeleteConfirm(true);
    }
  


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
                    <a href="/REmp" class="float-right">
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
                            <th class="text-right">Action</th>

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
                                    <td class="text-center">
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
                                    </td>
                                </tr>
                            );


                        })}
                    </tbody>
                </table>
            </div>

            {/* modal for update employee details */}
            <Modal
                show={ModalEmpUpdateConfirm}
                onHide={() => setModalEmpUpdateConfirm(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
            <UpdateEmployee
                data={ModalEmpUpdate}
                onHide={() => setModalEmpUpdate(false)}
                />
            </Modal>

            {/* modal for delete employee details */}
            <Modal
                show={ModalEmpDeleteConfirm}
                onHide={() => setModalEmpDeleteConfirm(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Would you like to remove this employee's details ?</p>
            </Modal.Body>
            <Modal.Footer>
                <div className="row">
                    <div className="col -6">
                        <button type="submit" className="btn btn-delete" onClick={() => {deleteEmployee(ModalEmpDelete);}}>
                            Confirm
                        </button>
                    </div>
                    <div className="col-6 text-right" onClick={() => setModalEmpDeleteConfirm(false)}>
                        <button type="reset" className="btn btn-reset">
                            cancel
                        </button>
                    </div>
                </div>
            </Modal.Footer>
            </Modal>
           
        </div>
        </div>
    )
}

