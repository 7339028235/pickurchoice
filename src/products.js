import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";
import { Image, Container, CardGroup, Card, Row, Col } from 'react-bootstrap';
import { StarIcon } from '@heroicons/react/20/solid';

const reviews = { href: '#', average: 4, totalCount: 117 }
function Products() {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    await Axios.get(`http://localhost:5000/products`)
      .then(async (res) => {
        let products = await res.data;
        //update products state
        setProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllProducts();

  }, [])
  return (
    <div className="bg-white">
      <Container className="">
        <h2 className="">Products</h2>


        <Row className="">
          {products.map((product) => (

            <Col as={Link} to={`/productdetails/${product.id}`} style={{ textDecoration: 'none' }} xs={6} md={6} lg={6} xl={3} xxl={3} key={product.id} href={product.href}>
              <Card  className="product-card m-2">
                <Card.Img variant="top" weight={150} height={220}
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="" />

              
                <Card.Body>
                  <Card.Title className='text-black'>{product.name}</Card.Title>
                
                   <div className='f18 text-black'> {product.price}</div>
                    <div >
                
                
                      <div className="d-flex align-items-center">

                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={
                              ` ${reviews.average > rating ? 'text-orange' : 'text-gray'
                              }`}
                            width={20}
                            height={20}
                            aria-hidden="true"
                          />
                        ))}

                      </div>
                      <p className="text-pink">{reviews.average} out of 5 stars</p>
                      <a href={reviews.href} className="">
                        {reviews.totalCount} reviews
                      </a>
                    </div>
                  
                </Card.Body>
              </Card>
            
            </Col>

          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Products;