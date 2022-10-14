import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { Col, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { getProductList } from '../features/product/productSlice'

const ProductList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const {isLoading,isSuccess, isError, message, productList} = useSelector(state => state.product)

  const {userData} = useSelector(state => state.user)

  useEffect(() => {
    if(!userData){
    navigate('/')
    }
  }, [userData])


  useEffect(()=>{
    dispatch(getProductList())
  }, [])

  if(isLoading){
    return <h1>....Loading</h1>
  }

  if(isError){
    return <p>{message}</p>
  }

  return (
    <div className='content my-3'>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='mb-3'>Products</h1>
        <Button className='me-5' variant="primary" onClick={()=>navigate('/products/add')}>Add Product</Button>
      </div>
      <Row>
      {
        productList.map((product, i) => (
          <Col md={4} key={i}>
            <ProductCard data={product} />
          </Col>
        ))
      }
      </Row>
    </div>
  )
}

export default ProductList