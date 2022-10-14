import React, { useState, useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import {Container, Form, Button, Alert} from 'react-bootstrap'
import { productDetails, reset, updateProductData } from '../features/product/productSlice'

const EditProduct = () => {
    const {id} = useParams()
    const dispatch= useDispatch()
    const navigate = useNavigate()

  const [inputData, setInputData] = useState({})

  const {isLoading, isSuccess, isError, message, productData} = useSelector(state => state.product)

  const {userData} = useSelector(state => state.user)

  useEffect(() => {
    if(!userData){
    navigate('/')
    }
  }, [userData])

  useEffect(()=>{
    if(productData && productData.name){
        setInputData(productData)
    }else{
    dispatch(productDetails(id))
    }
  }, [productData])

  useEffect(()=>{
    if(isSuccess){
      reset()
        navigate('/products')
    }
  }, [isSuccess])

  const inputHandler = (e) =>{
    setInputData(prev => ({...prev, [e.target.name] : e.target.value}))
}

  const updateProductHandler = (e) => {
    e.preventDefault()
    dispatch(updateProductData(inputData))
  }

  if(isLoading){
    return <h1>....Loading</h1>
  }

  if(isError){
    return <p>{message}</p>
  }

  return (
    <Container>
        <div className='form-container'>
        <div className="heading">
            <h1>Edit Product Form</h1>
        </div>
        
        <Form onSubmit={updateProductHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>ProductName</Form.Label>
                <Form.Control type="text" placeholder="Product Name" value={inputData.name} name="name" onChange={(e) => inputHandler(e)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword" >
                <Form.Label>Product image</Form.Label>
                <div>
                  <img src={inputData.product_img} width={"200px"} />
                </div>
                <Form.Control type="text" placeholder="Product image" name="product_img" value={inputData.product_img} onChange={(e) => inputHandler(e)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Category" name="category" value={inputData.category} onChange={(e) => inputHandler(e)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBirthDate">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Price" name="price" value={inputData.price} onChange={(e) => inputHandler(e)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword" >
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} value={inputData.description} name={"description"} onChange={(e) => inputHandler(e)} required/>
            </Form.Group>

            {
            isError && (
                <Alert variant="danger">
                    {message}
                </Alert>
            )
            }
            
            <Button variant="primary" type="submit" className='mt-3'>
                Update Product
            </Button>
        </Form>
        </div>
       
    </Container>
  )
}

export default EditProduct