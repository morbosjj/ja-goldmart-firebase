import React, { useEffect } from 'react';
import { Layout, Table, Skeleton, Popconfirm, Button, message } from 'antd';
import AdminContainer from '../container/AdminContainer';
import { firestore } from '../../firebase/config';
import { Link } from 'react-router-dom';
import { useDataContext } from '../Context';

const { Content } = Layout;

function Inquiries() {
  const { docs, loading, getFirestoreCollection } = useDataContext();

  useEffect(() => {
    getFirestoreCollection('inquiries', 'inquiryAt');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function deleteInquiry(id) {
    if (id) {
      firestore.collection('inquiries').doc(id).delete();
    } else {
      message.error('Error delete product');
    }
  }

  const columns = [
    { title: 'Inquiry ID', dataIndex: 'inquiryID', key: 'inquiryID' },
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
    },

    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Contact Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },

    { title: 'Date', dataIndex: 'inquiryAt', key: 'inquiryAt' },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <div className='inquiries-action'>
          <Link to={`/admin/inquiries/${record.inquiryID}`}>
            <Button>Details</Button>
          </Link>

          <Popconfirm
            title='Are you sure to delete'
            onConfirm={() => {
              deleteInquiry(record.id);
              message.success(`Delete inquiry successfully`);
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
    <AdminContainer title='Inquiries'>
      <Content className='layout-content'>
        {loading ? (
          <Skeleton active />
        ) : (
          <Table
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={docs}
            scroll={{ x: 1300 }}
          />
        )}
      </Content>
    </AdminContainer>
  );
}

export default Inquiries;
