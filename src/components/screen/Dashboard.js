import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AdminContainer from '../container/AdminContainer';
import '../../css/components/admin/Dashboard.css';

const Dashboard = () => {
  return (
    <AdminContainer>
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
                    <span>400</span>
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
                    <span>80</span>
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
                <div className='panel'>
                  <div className='btn-group-sm btn-group'>
                    <button className='active btn btn-focus'>Last Week</button>
                    <button className='btn btn-focus'>All Month</button>
                  </div>
                </div>
              </div>

              <div className='table-responsive'>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th className='text-center'>#</th>
                      <th>Name</th>
                      <th className='text-center'>City</th>
                      <th className='text-center'>Status</th>
                      <th className='text-center'>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className='text-center text-muted'>#345</td>
                      <td>Red Name</td>
                      <td className='text-center'>Test</td>
                      <td className='text-center'>
                        <div className='badge badge-warning'>Pending</div>
                      </td>
                      <td className='text-center'>Details</td>
                    </tr>

                    <tr>
                      <td className='text-center text-muted'>#345</td>
                      <td>Red Name</td>
                      <td className='text-center'>Test</td>
                      <td className='text-center'>
                        {' '}
                        <div className='badge badge-success'>Completed</div>
                      </td>
                      <td className='text-center'>Details</td>
                    </tr>
                    <tr>
                      <td className='text-center text-muted'>#345</td>
                      <td>Red Name</td>
                      <td className='text-center'>Test</td>
                      <td className='text-center'>
                        <div className='badge badge-success'>Completed</div>
                      </td>
                      <td className='text-center'>Details</td>
                    </tr>
                    <tr>
                      <td className='text-center text-muted'>#345</td>
                      <td>Red Name</td>
                      <td className='text-center'>Test</td>
                      <td className='text-center'>
                        <div className='badge badge-warning'>Pending</div>
                      </td>
                      <td className='text-center'>Details</td>
                    </tr>
                  </tbody>
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
