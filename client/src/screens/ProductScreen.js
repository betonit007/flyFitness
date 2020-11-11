import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [match])

    const addToCartHandler = () => {
       history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>GO BACK</Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3} >
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
                            <Col md={3} >
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
                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                        <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control
                                                            as='select'
                                                            value={qty}
                                                            onChange={e => setQty(e.target.value)}
                                                            style={{ padding: 0}}
                                                        >{
                                                                [...Array(product.countInStock).keys()].map(x => (  //creates an array based on qty, ie: [ 1, 2, 3, 4, 5] if qty is 5
                                                                    <option
                                                                        key={x + 1}
                                                                        value={x + 1}
                                                                        
                                                                    >
                                                                    {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                        <ListGroup.Item style={{ backgroundColor: '#fff' }}>
                                            <Button
                                                onClick={addToCartHandler}
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
                    )}
        </>
    )
}

export default ProductScreen
