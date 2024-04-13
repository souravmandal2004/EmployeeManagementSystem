import React from 'react';
import "./PostUser.css";
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const PostUser = () => {

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
        })
    }
    
    const navigate = useNavigate ();
    
    const handleSubmit = async (event) => {
        event.preventDefault ();


        console.log (formData);

        try {
            const response = await fetch ("https://employeemanagementsystem-backend-production.up.railway.app/api/employee", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify (formData)
            });

            const data = await response.json ();
            console.log ("Employee created: ", data);

            // redirect the user to the dashboard
            navigate ("/");
        }
        catch (error) {
            console.log ("Error while creating the Employee");
        }
    }

    return (
        <div className='center-form'>
            <h1>Post New Employee</h1>
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
                    Post Employee
                </Button>
            </Form>
        </div>
    );
}

export default PostUser;