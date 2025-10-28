import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Form, Button, Alert } from "react-bootstrap";
import api from "../api/api";
import { employeeOnBoardSchema, type employeeOnBoardData } from "../commons/scemas/employeeOnBoardSchema";
import { endPoints } from "../api/endPoints";
import SalaryBreackDown from "../commons/componets/SalaryBreackDown";
import { toast, ToastContainer } from "react-toastify";
import { addEmployee, metaLog } from "../api/apiService";
import type { metaLogRequest } from "../commons/interface/metalog";
import { FaArrowAltCircleLeft, FaFolder, FaLock, FaTicketAlt } from "react-icons/fa"

interface IDepartmentResponse {
    id: number,
    departmentName: string
}

interface ILocationResponse {
    id: number,
    locationName: string
}

interface IRoleResponse {
    id: number,
    roleName: string
}

interface IStatus {
    empId: number,
    probagationEndDate: string,
    Status: string,
    processDate: string,
    message: string,
    metaId: number,
}

const EmployeeOnBoard: React.FC = () => {

    const [department, setDepartment] = useState<IDepartmentResponse[] | null>(null);
    const [locations, setLocations] = useState<ILocationResponse[] | null>(null);
    const [roles, setRoles] = useState<IRoleResponse[] | null>(null);
    const [getrole, setGetRole] = useState<number>(0);

    const [annulSalary, setAnnulSalary] = useState<number>(0);

    const [status, setStatus] = useState<IStatus | null>(null);
    const [disabledValue, setDiabledValue] = useState<boolean>(false);

    // Fetching Departments
    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const response = await api.get(endPoints.GET_DEPARTMENT);
                setDepartment(response.data);
            } catch (error) {
                console.error("Error :", error);
            }
        };

        if (department === null) {
            fetchDepartment();
        }
    }, [department]);

    // Fetching Locations
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await api.get(endPoints.GET_LOCATIONS);
                setLocations(response.data);
            } catch (error) {
                console.error("Error :", error);
            }
        };

        if (locations === null) {
            fetchLocations();
        }
    }, [locations]);

    // Fetaching Roles based on Department
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await api.get(endPoints.GET_ROLE(getrole));
                setRoles(response.data);
            }
            catch (error) {
                console.error("Error : ", error)
            }
        }

        if (getrole !== 0) {
            fetchRoles();
        }
    }, [getrole]);

    const formDefaultValues: employeeOnBoardData = {
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        departmentId: "",
        roleId: "",
        locationId: "",
        experience: 0,
        joiningDate: "",
        ctc: 0
    };

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitted },
    } = useForm<employeeOnBoardData>({
        resolver: zodResolver(employeeOnBoardSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: formDefaultValues,
    });

    const departments = {
        marketing: 3,
        finance: 4
    };

    const onSubmit = async (data: employeeOnBoardData) => {
        try {
            const response = await addEmployee(data);

            if (response.departmentId === departments.marketing || response.departmentId === departments.finance) {

                const metalog: metaLogRequest = {
                    employeeId: response.id,
                    departmentId: response.departmentId,
                    roleId: response.roleId,
                    joiningDate: response.joiningDate
                };
                const metaResponse = await metaLog(metalog);

                const processOutput: IStatus = {
                    empId: response.id,
                    probagationEndDate: response.probationEndDate,
                    Status: metaResponse.processedBy,
                    processDate: metaResponse.processedDate,
                    message: metaResponse.message,
                    metaId: metaResponse.id
                };
                setStatus(processOutput);
            } else {
                const processOutput: IStatus = {
                    empId: response.id,
                    probagationEndDate: response.probationEndDate,
                    Status: response.status,
                    processDate: "",
                    message: "Employee Data SucessFully Added",
                    metaId: 0
                };

                setStatus(processOutput);
            }


            setDiabledValue(true);

        }
        catch (err: any) {
            toast.error(err.message);
        }
    };

    const formReset = () => {
        reset(formDefaultValues);
    }

    const resetEntire = () => {
        reset(formDefaultValues);
        setDiabledValue(false);
        setAnnulSalary(0);
        setStatus(null);
    }


    return (
        <div className="container my-5">

            {status && <div>
                <Alert variant="success" className=" text-center">
                    <div className=" fw-bold text-black"> Submission Sucessful! Your Employee ID has been created. The form is now locked</div>
                </Alert>
            </div>}

            <div className="row justify-content-center align-items-start g-4">

                <div className="col-lg-5 order-lg-1 order-1">
                    <div>
                        <Card className=" p-2  shadow shadow-lg rounded rounded-2">
                            <Card.Title><h2 className=" text-center mb-3"><FaFolder size={30} color="green" /> Add Employee</h2></Card.Title>

                            <Form noValidate onSubmit={handleSubmit(onSubmit)} className=" p-2">
                                <div className=" d-flex justify-content-between">
                                    <Form.Group className="mb-2">
                                        <Form.Label>First Name<small className=" text-danger fw-bold">*</small></Form.Label>
                                        <Form.Control
                                            className=" form-control"
                                            type="text"
                                            {...register("firstName")}
                                            readOnly={disabledValue}
                                            isInvalid={!!errors.firstName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.firstName?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <Form.Label>Middle Name <small className=" text-muted">(optinal)</small></Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("middleName")}
                                            isInvalid={!!errors.middleName}
                                            readOnly={disabledValue}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.middleName?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <div className=" d-flex justify-content-between">

                                    <Form.Group className="mb-2">
                                        <Form.Label>Last Name<small className=" text-danger fw-bold">*</small></Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("lastName")}
                                            isInvalid={!!errors.lastName}
                                            readOnly={disabledValue}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.lastName?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <Form.Label>Email<small className=" text-danger fw-bold">*</small></Form.Label>
                                        <Form.Control
                                            type="email"
                                            {...register("email")}
                                            isInvalid={!!errors.email}
                                            readOnly={disabledValue}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                </div>

                                <div className=" d-flex justify-content-between">
                                    <Form.Group className="mb-2">
                                        <Form.Label>Phone Number<small className=" text-danger fw-bold">*</small></Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("phoneNumber")}
                                            isInvalid={!!errors.phoneNumber}
                                            readOnly={disabledValue}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phoneNumber?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <Form.Label>Department<small className=" text-danger fw-bold">*</small></Form.Label>
                                        <Form.Select {...register("departmentId")} isInvalid={!!errors.departmentId}
                                            style={{ width: "210px" }}
                                            disabled={disabledValue}
                                            onChange={(e) => setGetRole(Number(e.target.value))}>
                                            <option value="">--Select Department--</option>
                                            {department?.map((map) =>
                                                <option key={map.id} value={map.id.toString()}>{map.departmentName}</option>
                                            )}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.departmentId?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                </div>

                                <div className=" d-flex justify-content-between">

                                    <Form.Group className="mb-2">
                                        <Form.Label>Role<small className=" text-danger fw-bold">*</small></Form.Label>
                                        <Form.Select {...register("roleId")} isInvalid={!!errors.roleId}
                                            disabled={disabledValue}
                                            style={{ width: "210px" }}>
                                            <option value="">--Select Role--</option>
                                            {roles?.map((map) =>
                                                <option key={map.id} value={map.id.toString()}>{map.roleName}</option>
                                            )}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.departmentId?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <Form.Label>Location<small className=" text-danger fw-bold">*</small></Form.Label>
                                        <Form.Select {...register("locationId")} isInvalid={!!errors.locationId}
                                            style={{ width: "210px" }}
                                            disabled={disabledValue} >
                                            <option value="">--Select Location--</option>
                                            {locations?.map((map) =>
                                                <option key={map.id} value={map.id.toString()}>{map.locationName}</option>
                                            )}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.departmentId?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <div className=" d-flex justify-content-between">

                                    <Form.Group className="mb-2">
                                        <Form.Label>Experience<small className=" text-danger fw-bold">*</small></Form.Label>
                                        <Form.Control
                                            type="number"

                                            disabled={disabledValue}
                                            {...register("experience", { valueAsNumber: true })}
                                            isInvalid={!!errors.experience}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.experience?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <Form.Label>Joining Date<small className=" text-danger fw-bold">*</small></Form.Label>
                                        <Form.Control
                                            type="date"
                                            style={{ width: "210px" }}
                                            disabled={disabledValue}
                                            {...register("joiningDate")}
                                            isInvalid={!!errors.joiningDate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.joiningDate?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <Form.Group className="mb-2">
                                    <Form.Label>Annul CTC<small className=" text-danger fw-bold">*</small></Form.Label>
                                    <Form.Control
                                        type="number"

                                        disabled={disabledValue}
                                        {...register("ctc", { valueAsNumber: true })}
                                        isInvalid={!!errors.ctc}
                                        onChange={(e) => setAnnulSalary(Number(e.target.value))}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.ctc?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className=" d-flex gap-2">
                                    <Button type="submit" variant="success" disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                    <Button variant="dark" type="button" onClick={() => formReset()} disabled={isSubmitted}>
                                        Reset
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </div>

                    <div className=" m-2">
                        <SalaryBreackDown salary={annulSalary} />
                    </div>

                </div>


                <div className="col-lg-5 order-lg-2 order-2">
                    <div className=" p-3 shadow shadow-lg rounded rounded-2" style={{ minHeight: "990px" }}>
                        <h4 className=" p-2"> <FaLock color="black" size={20} /> Processing Status:</h4>
                        {status ?
                            <Card>
                                <Alert variant="danger" className=" text-center fw-bold text-black"><h4>Form Locked</h4></Alert>
                                <div className=" m-3">
                                    <Button onClick={() => resetEntire()} className=" btn btn-sm btn-dark">Reset All</Button>
                                </div>
                                <div className=" m-2">
                                    <div><span className=" text-dark fw-bold mb-1">EMP ID: </span>{status.empId}</div>
                                    <div><span className=" text-dark fw-bold mb-1">Probation End Date: </span>{status.probagationEndDate}</div>
                                    <div><span className=" text-dark fw-bold mb-1">Status: </span>{status.Status}</div>
                                    {status.processDate.length === 0 ? "" : <div><span className=" text-dark fw-bold mb-1">Processed Date: </span>{status.processDate}</div>}
                                    <div className="  mb-1">{status.message}</div>
                                    <div><span className=" text-dark fw-bold mb-1">Remarks: </span><FaTicketAlt color="green" /> Verified</div>
                                    {status.metaId === 0 ? "" : <div><span className=" text-dark fw-bold mb-1">Metalog Refrerence ID: </span>{status.metaId}</div>}
                                </div>
                            </Card>
                            :
                            <div className=" d-flex justify-content-center flex-column align-items-center  m-5">
                                <h4 className=" text-muted fw-lighter">Please fill your Details for Onboarding</h4>
                                <FaArrowAltCircleLeft color="green" size={40} />
                            </div>}
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    )
}

export default React.memo(EmployeeOnBoard);