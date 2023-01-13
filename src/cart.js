import React, { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Col, Row, Container, ListGroup, Image, Button } from 'react-bootstrap';
import Axios from 'axios';

const reviews = { href: '#', average: 4, totalCount: 117 }

function Cart() {
    const [products, setProducts] = useState({});
    const [cartProducts, setCartProducts] = useState([]);
    let { id } = useParams();

    let navigate = useNavigate();
    const getAllProducts = async () => {
        if (id) {
            await Axios.get(`http://localhost:5000/products`)
                .then(async (res) => {
                    let newproducts = await res.data;
                    setCartProducts(newproducts)
                    //update products state
                    let specificProduct
                    newproducts.filter((v) => v.id == id).map(v => specificProduct = v)

                    setProducts(specificProduct)

                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }


    // Delete products
    const deleteProducts = async (productId) => {

        let updateProducts
        await cartProducts.filter(product => product.id === productId).map(product => updateProducts = product)

        updateProducts.addtocart = false
        setProducts(updateProducts)
        const res = await Axios.put(`http://localhost:5000/products/${productId}`, updateProducts)
            .then(async (res) => {

                const data = await res.data

                setCartProducts(
                    cartProducts.map((product) =>
                        product.id === productId ? { product: updateProducts } : product
                    )
                )

            }).catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getAllProducts();

    }, [])
    const addtoCart = (e) => {
        navigate(`/cart/${id}`)
    }
    return (
        <div className="bg-white">
            <Container className="mt-5 ">
                <h1>Shopping Carts</h1>
                {cartProducts && cartProducts.filter(product => product.addtocart === true).map((product, index) =>

                    <div className='product_cart_container p-3 mb-4' key={index}>


                        <Row>
                            <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                                <div className='text-center'>
                                    <Image src={product.imageSrc}
                                        alt={product.imageAlt} className='product-cart-image' />
                                </div>
                            </Col>
                            <Col xs={12} md={12} lg={12} xl={6} xxl={6} className=" d-flex flex-column justify-content-between">
                                <Row>

                                    <Col xs={12} md={12} lg={12} xl={12} xxl={12} className="">
                                        <div >
                                            <h2 className="">{product.name}</h2>
                                            <div className='product-price f25 '>{product.price}</div>
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
                                                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                    {reviews.totalCount} reviews
                                                </a>
                                            </div>
                                        </div>
                                        <div>{product.description !== '' ? product.description : ''}</div>


                                        <div>
                                            <div>details:</div>

                                            <ListGroup >
                                                <ListGroup.Item style={{ border: '0px' }}>{product.details}</ListGroup.Item>
                                            </ListGroup>


                                        </div>
                                        <Row className="d-flex align-items-center justify-content-center mt-5">
                                            <Button as={Col} size="lg" xs={11} md={5} lg={5} xl={5} xxl={5} className="m-1 cart-btn" >Proceed to Buy</Button>

                                            <Button as={Col} size="lg" xs={11} md={5} lg={5} xl={5} xxl={5} onClick={(e) => deleteProducts(product.id)} className="m-1 buy-btn text-black ">Delete</Button>
                                        </Row>
                                    </Col>
                                </Row>


                            </Col>
                        </Row>

                    </div>

                )}

            </Container>
        </div>
    );
}

export default Cart;