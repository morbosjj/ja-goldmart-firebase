import React from 'react';
import AdminContainer from '../container/AdminContainer';
import Meta from '../component/Meta';
import { Layout, Table, Skeleton, Button } from 'antd';
import { Link } from 'react-router-dom';
import useGetOrdersStatus from '../hooks/useGetOrdersStatus';

const { Content } = Layout;

const OrdersStatus = ({ match }) => {
  const status = match.params.status;
  const { orders } = useGetOrdersStatus(status);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderID',
      key: 'orderID',
      fixed: 'left',
    },
    {
      title: 'Customer',
      render: (record) => (
        <div>
          {record.firstname} {record.lastname}
        </div>
      ),
    },
    {
      title: 'Status',
      render: (record) => (
        <div>
          {record.isPaid && record.isDelivered === true && (
            <div className='badge badge-success'>Completed</div>
          )}
          {record.isPaid ||
            (record.isDelivered === false && (
              <div className='badge badge-danger'>Pending</div>
            ))}

          {record.isPaid === true && record.isDelivered === false && (
            <div className='badge badge-paid'>Paid</div>
          )}

          {record.isPaid === false && record.isDelivered === true && (
            <div className='badge badge-delivered'>Delivered</div>
          )}
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'orderAt',
      key: 'orderAt',
    },

    {
      title: '',
      render: (record) => (
        <div>
          <Link to={`/admin/orders/${record.orderID}`}>
            <Button>Details</Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <AdminContainer>
      <Meta />

      <Content className='layout-content'>
        <Table
          rowKey={(record) => record.orderID}
          columns={columns}
          dataSource={orders}
        />
      </Content>
    </AdminContainer>
  );
};

export default OrdersStatus;
