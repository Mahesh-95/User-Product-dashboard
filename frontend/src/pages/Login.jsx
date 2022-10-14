import React, {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import {Container, Form, Button} from 'react-bootstrap'
import { userLogin, reset } from '../features/user/userSlice'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [inputData, setInputData] = useState({})

    const {isSuccess, isError, message, userData} = useSelector(state => state.user)

    useEffect(() => {
      if(isSuccess || userData){
        reset()
        navigate('/dashboard')
      }
    }, [isSuccess])
    


    const inputHandler = (e) =>{
        setInputData(prev => ({...prev, [e.target.name] : e.target.value}))
    }

    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(userLogin(inputData))
    }

    if(isError){
        return <p>{message}</p>
    }


  return (
    <Container>
        <div className='form-container'>
        <div className="heading">
            <h1>Login Form</h1>
        </div>
        
        <Form onSubmit={loginHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => inputHandler(e)} required/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password' onChange={(e) => inputHandler(e)} required/>
            </Form.Group>
            
            <Button variant="primary" type="submit" className='mt-3'>
                Login
            </Button>
        </Form>
        <div className='mt-3'>
            <span>Don't have an account? <Link to='/register'>Create new account</Link></span>
        </div>
        </div>
    </Container>
  )
}

export default Login