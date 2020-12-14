import React from 'react';
import { Row, Col, Container, Table } from 'react-bootstrap';
import { Layout } from 'antd';
import MainContainer from '../container/MainContainer';
import { storage } from '../../firebase/config';
import axios from 'axios';
import '../../css/components/Resources.css';

const { Content } = Layout;

const Resources = () => {
  const downloadFile = (file) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`design/${file}`);

    fileRef.getDownloadURL().then((url) => {
      axios
        .request({
          url,
          method: 'GET',
          responseType: 'blob',
        })
        .then(({ data }) => {
          const downloadUrl = window.URL.createObjectURL(new Blob([data]));
          console.log('Download file');
        });
    });
  };

  return (
    <MainContainer>
      <Content className='content-main'>
        <Container>
          <div className='resources-brochure-flyer'>
            <h2>Brochure & Flyers</h2>
            <Row className='my-4'>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>File name</th>
                    <th>Format</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>JA Goldmart Brochure</td>
                    <td>Brochure</td>

                    <td>
                      <button onClick={() => downloadFile('JA Brochure.pdf')}>
                        Download
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>JA Goldmart Flyers</td>
                    <td>Flyers</td>
                    <td>
                      <button
                        onClick={() => downloadFile('JA Goldmart Flyers.pdf')}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </div>

          <div className='resources-videos'>
            <h2>Videos</h2>
          </div>
        </Container>
      </Content>
    </MainContainer>
  );
};

export default Resources;
