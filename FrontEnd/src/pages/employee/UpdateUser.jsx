import React, { useEffect } from 'react';
import "./UpdateUser.css";
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {

    const navigate = useNavigate ();

    const {id} = useParams ();

    const [formData, setFormData] = useState ({
        name: "",
        email: "",
        phone: "",
        department: ""
    });

    
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData ({
            ...formData,
            [name]: value
        });
    }

    useEffect ( () => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch (`https://employeemanagementsystem-backend-production.up.railway.app/api/employee/${id}`);
                const data = await response.json ();

                console.log (data);

                setFormData (data);
            }

            catch (error) {
                console.error ("Error while fetching  the employee with it's id", error.message);
            }
        }

        fetchEmployee ();
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault ();

        try {
            const response = await fetch (`https://employeemanagementsystem-backend-production.up.railway.app/api/update_employee/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify (formData)
            });

            const data = await response.json ();
            console.log ("Updated user: ", data);

            navigate ("/");
        }
        catch (error) {
            console.error ("Error while updating the employee", error.message);
        }
    }

    return (
        <div className='center-form'>
            <h1>Edit Employee</h1>
            <Form onSubmit={handleSubmit}>

                {/* for Name  */}
                <Form.Group controlId='formBasicName'>
                    <Form.Control 
                        type='text'
                        name='name'
                        placeholder='Enter name'
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {/* for Email  */}

                <Form.Group controlId='formBasicName'>
                    <Form.Control 
                        type='email'
                        name='email'
                        placeholder='Enter email'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {/* for Phone number  */}
                <Form.Group controlId='formBasicName'>
                    <Form.Control 
                        type='text'
                        name='phone'
                        placeholder='Enter Phone number'
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {/* for Department  */}
                <Form.Group controlId='formBasicName'>
                    <Form.Control 
                        type='text'
                        name='department'
                        placeholder='Enter department'
                        value={formData.department}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant='primary' type='submit' className='w-100'>
                    Edit Employee
                </Button>
            </Form>
        </div>
    )
}

export default UpdateUser