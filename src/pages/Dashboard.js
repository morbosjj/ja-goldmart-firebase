import React, { useEffect } from 'react';
import Meta from '../component/Meta';
import { Row, Col } from 'react-bootstrap';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import AdminContainer from '../container/AdminContainer';
import { useDataContext } from '../Context';
import '../css/components/admin/Dashboard.css';

const Dashboard = () => {
  const { orders, products, getProducts, getOrders } = useDataContext();

  useEffect(() => {
    getOrders();
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminContainer>
      <Meta title='Dashboard | Admin' />

      <div className='dashboard-page'>
        <div className='dashboard-title'>
          <h2 className='dashboard-welcome'>Hi, welcome back</h2>
          {/* <p class='dashboard-text'>Your currently status</p> */}
        </div>

        <Row className='mb-3'>
          <Col>
            <div className='dashboard-card dashboard-content bg-radiant-yellow'>
              <div className='dashboard-content-wrapper'>
                <div className='dashboard-content-left'>
                  <div className='dashboard-card-heading'>Total Orders</div>
                </div>

                <div className='dashboard-content-right'>
                  <div className='dashboard-card-numbers'>
                    <CountUp end={orders.length} />
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className='dashboard-card dashboard-content bg-radiant-yellow'>
              <div className='dashboard-content-wrapper'>
                <div className='dashboard-content-left'>
                  <div className='dashboard-card-heading'>Total Products</div>
                </div>

                <div className='dashboard-content-right'>
                  <div className='dashboard-card-numbers'>
                    <CountUp end={products.length} />
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col>
            <div className='dashboard-card dashboard-content bg-radiant-yellow'>
              <div className='dashboard-content-wrapper'>
                <div className='dashboard-content-left'>
                  <div className='dashboard-card-heading'>Stock</div>
                </div>

                <div className='dashboard-content-right'>
                  <div className='dashboard-card-numbers'>
                    <span>200</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col>
            <div className='dashboard-card'>
              <div className='dashboard-card-header'>
                Orders
                {/* <div className='panel'>
                  <div className='btn-group-sm btn-group'>
                    <button className='active btn btn-focus'>Last Week</button>
                    <button className='btn btn-focus'>All Month</button>
                  </div>
                </div> */}
              </div>

              <div className='table-responsive'>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer Name</th>
                      <th className='text-center'>Date</th>
                      <th className='text-center'>Status</th>
                      <th className='text-center'>Actions</th>
                    </tr>
                  </thead>

                  {orders.map((order, index) => (
                    <tbody>
                      <tr key={index}>
                        <td>{order.orderID}</td>
                        <td>
                          {order.firstname} {order.lastname}
                        </td>
                        <td className='text-center'>{order.orderAt}</td>
                        <td className='text-center'>
                          {order.isPaid && order.isDelivered === true && (
                            <div className='badge badge-success'>Completed</div>
                          )}
                          {order.isPaid ||
                            (order.isDelivered === false && (
                              <div className='badge badge-danger'>Pending</div>
                            ))}

                          {order.isPaid === true &&
                            order.isDelivered === false && (
                              <div className='badge badge-paid'>Paid</div>
                            )}

                          {order.isPaid === false &&
                            order.isDelivered === true && (
                              <div className='badge badge-delivered'>
                                Delivered
                              </div>
                            )}
                        </td>
                        <td className='text-center'>
                          <Link to={`/admin/orders/${order.orderID}`}>
                            Details
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </AdminContainer>
  );
};

export default Dashboard;
