import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import {Container, Form, Button, Alert} from 'react-bootstrap'
import { addProduct, reset } from '../features/product/productSlice'

const AddProduct = () => {
    const dispatch= useDispatch()
    const navigate = useNavigate()

  const [inputData, setInputData] = useState({})

  const {isSuccess, isError, message} = useSelector(state => state.product)

  const {userData} = useSelector(state => state.user)

  useEffect(() => {
    if(!userData){
    navigate('/')
    }
  }, [userData])

  useEffect(()=>{
    if(isSuccess){
      reset()
        navigate('/products')
    }
  }, [isSuccess])

  const inputHandler = (e) =>{
    setInputData(prev => ({...prev, [e.target.name] : e.target.value}))
}

  const addProductHandler = (e) => {
    e.preventDefault()
    dispatch(addProduct(inputData))
  }

  return (
    <Container className="content">
        <div className='form-container'>
        <div className="heading">
            <h1>Add Product Form</h1>
        </div>
        
        <Form onSubmit={addProductHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>ProductName</Form.Label>
                <Form.Control type="text" placeholder="Product Name" name="name" onChange={(e) => inputHandler(e)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword" >
                <Form.Label>Product image</Form.Label>
                <Form.Control type="text" placeholder="Product image" name="product_img" onChange={(e) => inputHandler(e)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Category" name="category" onChange={(e) => inputHandler(e)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBirthDate">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Price" name="price" onChange={(e) => inputHandler(e)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword" >
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} name={"description"} onChange={(e) => inputHandler(e)} required/>
            </Form.Group>

            {
            isError && (
                <Alert variant="danger">
                    {message}
                </Alert>
            )
            }
            
            <Button variant="primary" type="submit" className='mt-3'>
                Add Product
            </Button>
        </Form>
        </div>
       
    </Container>
  )
}

export default AddProduct