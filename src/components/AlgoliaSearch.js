import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  connectStateResults,
  Snippet,
} from 'react-instantsearch-dom';
import { Card, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { replaceToDash } from './Helper';
import '../css/components/Product.css';

const algoliaClient = algoliasearch(
  'RKK6GIJLUG',
  '9f4da6133bd086b30b3cab41166dae33'
);

const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

// const Results = connectStateResults(
//   ({ searchState, searchResults, children }) =>
//     searchResults && searchResults.nbHits !== 0 ? (
//       children
//     ) : (
//       <div>No results have been found for "{searchState.query}"</div>
//     )
// );

const AlgoliaSearch = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName='firebase'>
      <SearchBox />

      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
};

function Hit({ hit }) {
  return (
    <Card className='my-3 p-1 rounded product-card'>
      <Link to={`/product/${replaceToDash(hit.full_product_name)}`}>
        {hit.images ? (
          <Card.Img
            src={hit.images[0].url}
            variant='top'
            title={hit.full_product_name}
          />
        ) : (
          'No Image'
        )}
      </Link>

      <Card.Body>
        <Link to={`/product/${replaceToDash(hit.full_product_name)}`}>
          <Card.Title as='div'>
            <h6>{hit.images.full_product_name}</h6>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default AlgoliaSearch;
