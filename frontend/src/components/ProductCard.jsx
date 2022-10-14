import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';

const ProductCard = ({data}) => {
  const navigate = useNavigate()
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={data.product_img ? data.product_img:"https://www.bandg.com/assets/img/default-product-img.png?w=400&h=225&scale=both&mode=max"} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
          Rs. {data.price}
        </Card.Text>
        <Button variant="primary" onClick={() => navigate(`/products/${data._id}`)}>View</Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard