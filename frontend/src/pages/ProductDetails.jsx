import React , {useEffect}from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { productDetails } from '../features/product/productSlice'

const ProductDetails = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isLoading, isError, message, productData} = useSelector(state => state.product)

  const {userData} = useSelector(state => state.user)

  useEffect(() => {
    if(!userData){
    navigate('/')
    }
  }, [userData])


  useEffect(()=>{
    dispatch(productDetails(id))
  }, [])

  if(isLoading){
    return <h1>....Loading</h1>
  }

  if(isError){
    return <p>{message}</p>
  }

  return (
    <div className ="content my-3">
      <Container>
        <div className="d-flex justify-content-between">
          <Button className="btn btn-primary mb-5" onClick = { () => navigate(-1)}>Back</Button>
          <Button className="btn btn-primary mb-5" onClick = { () => navigate(`/products/edit/${id}`)}>Edit</Button>
        </div>
        <Row>
          <Col>
            <img src={productData.product_img} alt={productData.name} className="product-img"/> 
          </Col>
          <Col>
            <h1>{productData.name}</h1>
            <p> <span style={{fontWeight:"600"}}>Rs.</span> {productData.price}</p>
            <p> <span style={{fontWeight:"600"}}>Category: </span> {productData.category}</p>
            <p> <span style={{fontWeight:"600"}}>Description: </span> {productData.description}</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProductDetails