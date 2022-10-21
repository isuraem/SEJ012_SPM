import {React, useEffect , useState} from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

import Header from "../../Header";

export default function UpdateEmployee({data , cl}){
    const [Name, setName] = useState("");
    const [Address, setAddress] = useState("");
    const [NIC, setNIC] = useState("");
    const [DOB, setDOB] = useState("");
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [Gender, setGender] = useState("");
    const [JoiningDate, setJoiningDate] = useState("");
    const [Designation, setDesignation] = useState("");
    // const [Photo, setPhoto] = useState("");
    // const [CV, setCV] = useState("");

    useEffect(() => {
        setName(data.Name)
        setAddress(data.Address)
        setNIC(data.NIC)
        setDOB(data.DOB)
        setPhone(data.Phone)
        setEmail(data.Email)
        setGender(data.Gender)
        setJoiningDate(data.JoiningDate)
        setDesignation(data.Designation)
        // setPhoto(data.Photo)
        // setCV(data.CV)
    },[data]) //[] <- pass only one array at a time

    function sendData(e){
        e.preventDefault();

        const updateEmployee = {
            Name,
            Address,
            NIC,
            DOB,
            Phone,
            Email,
            Gender,
            JoiningDate,
            Designation,
            // Photo,
            // CV
        }

        axios.put(`http://localhost:8070/employee/updateEmp/${data._id}`, updateEmployee).then(()=>{
                Swal.fire({
                    title:'Success!',
                    text:'Employee Details Updated Succesfully',
                    icon:'success',
                    showConfirmButton: false,
                    timer:2000
                }).then(()=>{
                    window.location.reload(true);
                })
            }).catch((err)=>{
                const msgerr = err.response.data.status
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: `${msgerr}`,
                    confirmButtonColor: '#1fc191',

                })
            })
    };

    return(
        <div>
                <Modal.Header closeButton>
                    <Modal.Title>Update Employee: {data.Name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <form id="contact-form" class="form" role="form" onSubmit={sendData}>
                                <div class="form-group">
                                    <label class="form-label" for="Name">Name : </label>
                                    <input 
                                        type="text" 
                                        class="form-control formInput" 
                                        id="Name" 
                                        name="Name" 
                                        // placeholder="Employee Name" 
                                        tabindex="1" 
                                        required
                                        onChange={(e) => {
                                            setName(e.target.value); // assign value
                                        }}
                                        value = {Name}
                                    />
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="Address">Address : </label>
                                    <textarea 
                                        type="text" 
                                        class="form-control formInput" 
                                        id="Address" 
                                        name="Address"
                                        // placeholder="Employee Address"
                                        tabindex="2" 
                                        required
                                        onChange={(e)=>{
                                            setAddress(e.target.value);// assign value
                                        }}
                                        value = {Address}
                                    />
                                </div>

                                <div className="row">
                                    <div class="form-group col-md-6">
                                        <label class="form-label" for="NIC">NIC : </label>
                                        <input 
                                            type="text" 
                                            class="form-control formInput" 
                                            id="NIC" 
                                            name="NIC"
                                            // placeholder="Employee NIC"
                                            tabindex="3"
                                            required
                                            onChange={(e)=>{
                                                setNIC(e.target.value);//assign value
                                                // validateNIC(e);
                                            }}
                                            value = {NIC}
                                        />
                                        {/* <div className={`message ${isNICValid ? 'success' : 'error'}`}>
                                            {NICmessage}
                                        </div>
                                        {Object.keys(NICErr).map((key) => {
                                            // return <div style={{ color: "red" }}>{NICErr[key]}</div>
                                        })} */}
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label class="form-label" for="DOB">DOB : </label>
                                        <input 
                                            type="date" 
                                            class="form-control formInput" 
                                            id="DOB" 
                                            // placeholder="Employee DOB"
                                            tabindex="4"
                                            required
                                            onChange={(e)=>{
                                                setDOB(e.target.value);
                                            }}
                                            value = {DOB}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div class="form-group col-md-6">
                                        <label class="form-label" for="Phone">Phone : </label>
                                        <input 
                                            type="text" 
                                            class="form-control formInput" 
                                            id="Phone" 
                                            // placeholder="Employee Contact Number"
                                            tabindex="5"
                                            required
                                            onChange={(e)=>{
                                                setPhone(e.target.value);
                                                // validateMobile(e);
                                            }}
                                            value = {Phone}
                                        />
                                        {/* <div className={`message ${isMobileValid ? 'success' : 'error'}`}>
                                            {Mobilemessage}
                                        </div>

                                        {Object.keys(TeleErr).map((key) => {
                                            // return<div className ={message}>{TeleErr[key]}</div>
                                        })} */}
                                    </div>


                                    <div class="form-group col-md-6">
                                        <label class="form-label" for="Email">Email : </label>
                                        <input 
                                            type="email" 
                                            class="form-control formInput" 
                                            id="Email" 
                                            // placeholder="Employee Email"
                                            tabindex="6"
                                            required
                                            onChange={(e)=>{
                                                setEmail(e.target.value);//assign value
                                                // validateEmail(e);
                                            }}
                                            value = {Email}
                                        />
                                        {/* <div className={`message ${isValid ? 'success' : 'error'}`}>
                                            {message}
                                        </div> */}
                                    </div>
                                </div>


                                <div className="row">
                                    <div class="form-group col-md-6">
                                        <label class="form-label" for="Gender">Gender : </label>
                                        <select
                                            name="Gender"
                                            id = "Gender"
                                            class="form-control formInput"
                                            onChange={(e) => {
                                                setGender(e.target.value);
                                            }}
                                            value={Gender}
                                        >
                                            {" "}
                                            <option selected disabled value="">
                                                choose
                                            </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label class="form-label" for="JoiningDate">JoiningDate : </label>
                                        <input 
                                            type="date" 
                                            class="form-control formInput" 
                                            id="JoiningDate" 
                                            // placeholder="Enter JoiningDate"
                                            tabindex="7"
                                            required
                                            onChange={(e)=>{
                                                setJoiningDate(e.target.value);
                                            }}
                                            value = {JoiningDate}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    {/* <div class="form-group col-md-6">
                                        <label class="form-label" for="Photo">Photo : </label>
                                        <input 
                                            type="file" 
                                            class="form-control-file" 
                                            id="Photo"
                                            tabindex="7"
                                            required
                                            onChange={(e)=>{
                                                setPhoto(e.target.value);
                                            }}
                                        />
                                    </div> */}
                                    <div class="form-group col-md-6">
                                        <label class="form-label" for="Designation">Designation : </label>
                                        <input 
                                            type="text" 
                                            class="form-control formInput" 
                                            id="Designation" 
                                            // placeholder="Employee Designation"
                                            tabindex="8"
                                            required
                                            onChange={(e)=>{
                                                setDesignation(e.target.value);
                                            }}
                                            value={Designation}
                                        />
                                    </div>
                                </div>
                                {/* <div class="form-group col-md-6">
                                    <label class="form-label" for="CV">CV : </label>
                                    <input 
                                        type="file" 
                                        class="form-control-file" 
                                        id="CV"
                                        tabindex="9"
                                        required
                                        onChange={(e)=>{
                                            setCV(e.target.value);
                                        }}
                                    />
                                </div> */}
                                
                                <div className="row mt-2 mb-3">
                                    <div className="col py-3 text-center">
                                        <button type="submit" className="btn btn-ok">
                                            Update
                                        </button>
                                    </div>
                                    <div className="col py-3 text-center">
                                        <button type="reset" className="btn btn-reset">
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
            </Modal.Body>
        </div> 

    )

}