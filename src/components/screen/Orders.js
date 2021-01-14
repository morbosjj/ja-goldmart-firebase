import React, { useEffect } from 'react';
import { Layout, Table, Skeleton, Button } from 'antd';
import AdminContainer from '../container/AdminContainer';
import { useDataContext } from '../Context';
import '../../css/components/admin/Orders.css';

const { Content } = Layout;

const Orders = () => {
  const { orders, loading, getOrders } = useDataContext();

  useEffect(() => {
    getOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderID',
      key: 'orderID',
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
      render: () => (
        <div>
          <Button>Details</Button>
        </div>
      ),
    },
  ];

  return (
    <AdminContainer title='Orders'>
      <Content className='layout-content'>
        {loading ? (
          <Skeleton active />
        ) : (
          <Table
            rowKey={(record) => record.orderID}
            columns={columns}
            dataSource={orders}
          />
        )}
      </Content>
    </AdminContainer>
  );
};

export default Orders;
