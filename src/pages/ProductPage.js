import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import {
  Row,
  Col,
  ListGroup,
  Container,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Meta from '../component/Meta';
import ReactHtmlParser from 'react-html-parser';
import ImageGallery from 'react-image-gallery';
import { Link } from 'react-router-dom';
import Loader from '../component/Loader';
import Iframe from 'react-iframe';
import { useDataContext } from '../Context';
import { replaceToSpace } from '../Helper';
import MainContainer from '../container/MainContainer';
import '../css/components/ProductPage.css';

function ProductPage({ match }) {
  const [qty, setQty] = useState(1);
  const name = replaceToSpace(match.params.name);
  const {
    docs,
    loading,
    error,
    addtoInquire,
    getFirestoreQuery,
  } = useDataContext();
  // const product = products.find((value) => value.product_name === name);

  useEffect(() => {
    getFirestoreQuery('products', 'full_product_name', name);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainContainer>
      <Meta title={`${name} | JA Goldmart Enterprise`} />
      <div className='product-detail-container'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className='breadcrumb-container'>
              <div className='breadcrumb-link'>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to='/shop'>Shop</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{name}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>

            {docs.map((product, index) => (
              <Container key={index} className='py-4'>
                <Row className='my-3'>
                  <Col md={6}>
                    <ImageGallery
                      showPlayButton={false}
                      showNav={false}
                      thumbnailPosition={'left'}
                      items={product.images}
                    />
                  </Col>

                  <Col md={5}>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <h2>
                          {product.model_name} {product.product_name}
                        </h2>
                      </ListGroup.Item>

                      <Card>
                        <ListGroup variant='flush'>
                          <ListGroup.Item>
                            <Row>
                              <Col>Price:</Col>
                              <Col>
                                <strong>₱{product.price}</strong>
                              </Col>
                            </Row>
                          </ListGroup.Item>

                          <ListGroup.Item>
                            <Row>
                              <Col>Status:</Col>
                              <Col>
                                <strong>
                                  {product.stock > 0
                                    ? 'In Stock'
                                    : 'Out of Stock'}
                                </strong>
                              </Col>
                            </Row>
                          </ListGroup.Item>

                          {product.stock > 0 && (
                            <ListGroup.Item>
                              <Row>
                                <Col>Qty</Col>
                                <Col>
                                  <Form.Control
                                    as='select'
                                    value={qty}
                                    onChange={(e) =>
                                      setQty(Number(e.target.value))
                                    }
                                  >
                                    {[...Array(product.stock).keys()].map(
                                      (x) => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      )
                                    )}
                                  </Form.Control>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )}

                          <ListGroup.Item className='py-3'>
                            <Link to='/inquire'>
                              <Button
                                type='button'
                                variant='custom'
                                size='md'
                                disabled={product.stock === 0}
                                onClick={() => addtoInquire(product, qty)}
                                block
                              >
                                Inquire Now
                              </Button>
                            </Link>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </ListGroup>
                  </Col>
                </Row>

                <Row className='my-5'>
                  <Col md={7} className='mr-4'>
                    {ReactHtmlParser(product.description)}
                  </Col>
                  <Col>
                    {product.video ? (
                      <Iframe
                        url={product.video}
                        width='365'
                        height='200px'
                        display='initial'
                        position='relative'
                      />
                    ) : (
                      ''
                    )}
                  </Col>
                </Row>
              </Container>
            ))}
          </>
        )}

        {error && error}
      </div>
    </MainContainer>
  );
}

export default ProductPage;
