import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'


const ProductScreen = ({ match }) => {

    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`)

            setProduct(data)
        }
        fetchProduct()
    })

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>GO BACK</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='product-item' >
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item className='product-item'>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews} Reviews`}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item className='product-item'>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item className='product-item'>
                            {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className='product-item'>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        {product.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className='product-item'>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item style={{backgroundColor: '#fff'}}>
                                <Button 
                                  disabled={product.countInStock === 0}
                                  className="btn-block" 
                                  type='button'>
                                    ADD TO CART
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
