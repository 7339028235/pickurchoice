import React, { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Col, Row, Container, ListGroup, Image, Button } from 'react-bootstrap';
import Axios from 'axios';


const reviews = { href: '#', average: 4, totalCount: 117 }

function ProductDetails() {
    const [products, setProducts] = useState({})
    const [existProdcts, setExistProducts] = useState([]);
    let { id } = useParams();

    let navigate = useNavigate();
    const getAllProducts = async () => {
        if (id) {
            await Axios.get(`http://localhost:5000/products`)
                .then(async (res) => {
                    let newproducts = await res.data;
                    setExistProducts(newproducts);
                    //update products state
                    let specificProduct
                    newproducts.filter((v) => v.id == id).map(v => specificProduct = v)
                    setProducts(specificProduct);

                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }

    // ADD PRODUCT
    const addtoCart = async () => {

        const updateProducts = products
        updateProducts.addtocart = true
        setProducts(updateProducts)
        const res = await Axios.put(`http://localhost:5000/products/${id}`, updateProducts)
            .then(async (res) => {
                const data = await res.data
                navigate(`/cart/${id}`)
            }).catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getAllProducts();

    }, [])

    return (
        <div className="bg-white">
            <Container className="mt-5 ">
                <div className='product_container'>
                    <h2 className="">{products.name}</h2>

                    <Row>
                        <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                            <div className='text-center'>
                                <Image src={products.imageSrc}
                                    alt={products.imageAlt} className='product-image' />
                            </div>
                        </Col>
                        <Col xs={12} md={12} lg={12} xl={6} xxl={6} className=" d-flex flex-column justify-content-between">
                            <Row>

                                <Col xs={12} md={12} lg={12} xl={12} xxl={12} className="">
                                    <div >

                                        <div className='product-price f25 '>{products.price}</div>
                                        <div >
                                            <h3 className=''>Reviews</h3>
                                            <div className="d-flex align-items-center">

                                                {[0, 1, 2, 3, 4].map((rating) => (
                                                    <StarIcon
                                                        key={rating}
                                                        className={
                                                            ` ${reviews.average > rating ? 'text-black' : 'text-gray'
                                                            }`}
                                                        width={20}
                                                        height={20}
                                                        aria-hidden="true"
                                                    />
                                                ))}

                                            </div>
                                            <p className="sr-only">{reviews.average} out of 5 stars</p>
                                            <a href={reviews.href} className="">
                                                {reviews.totalCount} reviews
                                            </a>
                                        </div>
                                    </div>
                                    <div>{products.description !== '' ? products.description : ''}</div>


                                    <div>
                                        <div className='f16 fb'>Details:</div>

                                        <ListGroup >
                                            <ListGroup.Item style={{ border: '0px' }}>{products.details}</ListGroup.Item>
                                        </ListGroup>


                                    </div>
                                </Col>
                            </Row>

                            <Row className="d-flex align-items-center justify-content-center mt-5">
                                <Button as={Col} size="lg" xs={11} md={5} lg={5} xl={5} xxl={5} className="m-1 buy-btn text-black ">Buy</Button>
                                <Button as={Col} size="lg" xs={11} md={5} lg={5} xl={5} xxl={5} onClick={e => addtoCart(e)} className="m-1 cart-btn">Add Cart</Button>
                            </Row>
                        </Col>
                    </Row>

                </div>
            </Container>
        </div>
    );
}

export default ProductDetails;