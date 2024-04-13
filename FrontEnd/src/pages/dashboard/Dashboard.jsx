import React, { useEffect, useState} from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const [employees, setEmployees] = useState ([]);

    const navigate = useNavigate ();

    useEffect ( () => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch ("https://employeemanagementsystem-backend-production.up.railway.app/api/get_all_employees");
                const data = await response.json ();

                setEmployees (data);
            }   
            catch (error) {
                console.error (error);
            }
        }

        fetchEmployees ();
    }, []);

    const handleDelete = async (employeeID) => {
        try {
            const response = await fetch (`https://employeemanagementsystem-backend-production.up.railway.app/api/delete_employee/${employeeID}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setEmployees ( (prevEmployees) => (
                    prevEmployees.filter  ( (employee) => employee.id !== employeeID)
                ));
            }

            console.log (`Employee with ID  ${employeeID} deleted successfully`);
        }
        catch (error) {
            console.error ("Error while deleting the employee", error.message);
        }
    }

    const handleUpdate = (employeeID) => {
        navigate (`/employee/${employeeID}`);
    }


    return (
        <div>
            
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className='text-center'>Employees</h1>

                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone No.</th>
                                    <th>Department</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map ( (employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.phone}</td>
                                        <td>{employee.department}</td>
                                        
                                        <td>
                                            <Button onClick={ () => handleUpdate(employee.id)} variant='outline-secondary'>Update</Button>
                                            <Button onClick={ () => handleDelete (employee.id)} variant='outline-danger'>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Dashboard;