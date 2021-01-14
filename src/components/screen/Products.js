import React, { useEffect } from 'react';
import { Layout, Table, Skeleton, Button, message, Popconfirm } from 'antd';
import AdminContainer from '../container/AdminContainer';
import AddProduct from '../modals/AddProduct';
import ModalToggle from '../component/ModalToggle';
import EditProduct from '../modals/EditProduct';
import { useDataContext } from '../Context';
import { firestore } from '../../firebase/config';
import ReactHtmlParser from 'react-html-parser';
import { handleData, convertToString, convertStringToBoolean } from '../Helper';
import { Link } from 'react-router-dom';
// import { items, categories } from '../data';
import '../../css/components/admin/ProductList.css';

const { Content } = Layout;

const Products = () => {
  const { products, loading, getProducts } = useDataContext();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteProduct = (id) => {
    if (id) {
      firestore.collection('products').doc(id).delete();
    } else {
      message.error('Error delete product');
    }
  };

  const columns = [
    {
      title: 'Model Name',
      dataIndex: 'model_name',
      key: 'model_name',
      fixed: 'left',
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },

    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },

    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <img src={images[0].url} width='50px' alt={images[0].name} />
      ),
    },

    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },

    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },

    {
      title: 'Feature',
      dataIndex: 'feature',
      key: 'feature',
      render: (val) => <p>{convertToString(val)}</p>,
      filters: [
        {
          text: 'true',
          value: true,
        },

        {
          text: 'false',
          value: false,
        },
      ],
      onFilter: (value, record) => {
        return convertStringToBoolean(record.feature) === value;
      },
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <div className='product-action'>
          <ModalToggle
            label='Edit Product'
            icon="<i class='fas fa-edit'></i>"
            modal={EditProduct}
            data={() => handleData(record)}
          />

          <Popconfirm
            title='Are you sure to delete'
            onConfirm={() => {
              deleteProduct(record.id);
              message.success(
                `Delete ${record.model_name} product sucessfully`,
                2
              );
            }}
          >
            <Button danger>
              <i className='far fa-trash-alt'></i>
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <AdminContainer title='Products'>
      <Content className='layout-content'>
        <ModalToggle label='Add Product' modal={AddProduct} />

        {loading ? (
          <Skeleton active />
        ) : (
          <Table
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={products}
            scroll={{ x: 1300 }}
            expandable={{
              expandedRowRender: (record) => (
                <>
                  <p>
                    {record.description
                      ? ReactHtmlParser(record.description)
                      : 'No description'}
                  </p>

                  <Link to={record.video}>{record.video}</Link>
                </>
              ),
            }}
          />
        )}
      </Content>
    </AdminContainer>
  );
};

export default Products;
