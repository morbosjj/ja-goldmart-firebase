import React from 'react';
import { Row, Col, Container, Table, Card } from 'react-bootstrap';
import { Layout } from 'antd';
import MainContainer from '../container/MainContainer';
import { storage } from '../../firebase/config';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Panel,
  RefinementList,
  Pagination,
  SearchBox,
  connectStateResults,
} from 'react-instantsearch-dom';
import Iframe from 'react-iframe';
import axios from 'axios';
import '../../css/components/Resources.css';

const { Content } = Layout;

const Resources = () => {
  const algoliaClient = algoliasearch(
    'RKK6GIJLUG',
    '9f4da6133bd086b30b3cab41166dae33'
  );

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

  const Results = connectStateResults(
    ({ searchState, searchResults, children }) =>
      searchResults && searchResults.nbHits !== 0 ? (
        children
      ) : !searchState.query ? (
        <div></div>
      ) : (
        <div className='resources-algolia-result'>
          No results found{' '}
          <span className='query-output'>"{searchState.query}"</span>
        </div>
      )
  );

  const Hit = ({ hit }) => {
    return (
      <Card className='resources-video-card'>
        <Iframe
          url={hit.video}
          width='100%'
          height='200px'
          display='initial'
          position='relative'
        />

        <Card.Body>
          <Card.Title as='div'>
            <strong>{hit.full_product_name}</strong>
          </Card.Title>
        </Card.Body>
      </Card>
    );
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

            <InstantSearch searchClient={algoliaClient} indexName='firebase'>
              <Row>
                <Col md={3}>
                  <SearchBox
                    showLoadingIndicator={true}
                    searchAsYouType={false}
                    translations={{ placeholder: 'Search by Product Name' }}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={3}>
                  <Panel header='Categories'>
                    <RefinementList attribute='categories' />
                  </Panel>
                </Col>

                <Col className='my-3'>
                  <Results>
                    <Hits hitComponent={Hit} />
                  </Results>
                </Col>
              </Row>

              <Pagination />
            </InstantSearch>
          </div>
        </Container>
      </Content>
    </MainContainer>
  );
};

export default Resources;
