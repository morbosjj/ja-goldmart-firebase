import React, { useEffect } from 'react';
import Meta from '../component/Meta';
import { Layout, Table, Skeleton, Popconfirm, Button, message } from 'antd';
import AdminContainer from '../container/AdminContainer';
import { firestore } from '../firebase/config';
import { Link } from 'react-router-dom';
import { useDataContext } from '../Context';

const { Content } = Layout;

function Inquiries() {
  const { inquiries, loading, getInquiries } = useDataContext();

  useEffect(() => {
    getInquiries();

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
    {
      title: 'Inquiry ID',
      dataIndex: 'inquiryID',
      key: 'inquiryID',
      width: 100,
      fixed: 'left',
    },
    {
      title: 'Customer',
      width: 100,
      render: (record) => (
        <div>
          {record.firstname} {record.lastname}
        </div>
      ),
    },

    { title: 'Date', dataIndex: 'inquiryAt', key: 'inquiryAt', width: 350 },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 100,
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
      <Meta title='Inquiries | Admin' />

      <Content className='layout-content'>
        {loading ? (
          <Skeleton active />
        ) : (
          <Table
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={inquiries}
            scroll={{ x: 1300 }}
          />
        )}
      </Content>
    </AdminContainer>
  );
}

export default Inquiries;
