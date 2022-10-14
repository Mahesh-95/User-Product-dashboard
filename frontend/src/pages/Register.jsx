import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import {Container, Form, Button, Alert} from 'react-bootstrap'
import { addUser, reset } from '../features/user/userSlice'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [inputData, setInputData] = useState({})

  const {isSuccess, isError, message} = useSelector(state => state.user)

  useEffect(() => {
    if(isSuccess){
      reset()
      navigate('/')
    }
  }, [isSuccess])


  const inputHandler = (e) =>{
    setInputData(prev => ({...prev, [e.target.name] : e.target.value}))
}

  const registerHandler = (e) => {
    e.preventDefault()
    if(inputData.password === inputData.confirmPassword){
    dispatch(addUser(inputData))
    }else{
        alert('Password does not match')
    }
  }

  return (
    <Container>
        <div className='form-container'>
        <div className="heading">
            <h1>Register Form</h1>
        </div>
        
        <Form onSubmit={registerHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" name="name" onChange={(e) => inputHandler(e)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword" >
                <Form.Label>Profile Image</Form.Label>
                <Form.Control type="text" placeholder="Profile image" name="image" onChange={(e) => inputHandler(e)} required/>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => inputHandler(e)} required/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBirthDate">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control type="date" placeholder="Birthdate" name="birthDate" onChange={(e) => inputHandler(e)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => inputHandler(e)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword" >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="confirmPassword" onChange={(e) => inputHandler(e)} required/>
            </Form.Group>

            {
            isError && (
                <Alert variant="danger">
                    {message}
                </Alert>
            )
            }
            
            <Button variant="primary" type="submit" className='mt-3'>
                Register
            </Button>
        </Form>
        </div>
       
    </Container>
  )
}

export default Register