import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDataContext } from './Context';
import { replaceToDash } from './Helper';
import '../css/components/Product.css';

export default function Product({ item }) {
  const { getInquiryProduct } = useDataContext();

  return (
    <Card className='my-3 p-1 rounded product-card'>
      <a href={`/product/${replaceToDash(item.full_product_name)}`}>
        {item.images ? (
          <Card.Img
            src={item.images[0].url}
            variant='top'
            title={`${item.model_name} ${item.product_name}`}
          />
        ) : (
          'No Available Image'
        )}
      </a>

      <Card.Body>
        <a href={`/product/${replaceToDash(item.full_product_name)}`}>
          <Card.Title as='div'>
            <h6>
              {item.model_name} {item.product_name}
            </h6>
          </Card.Title>
        </a>

        <Link to='/inquire'>
          <Button
            className='my-2'
            type='button'
            variant='custom'
            size='md'
            onClick={() => getInquiryProduct(item)}
            block
          >
            Inquire now
          </Button>
        </Link>

        <Link to={`/product/${replaceToDash(item.full_product_name)}`}>
          <Button type='button' variant='light' size='md' block>
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}