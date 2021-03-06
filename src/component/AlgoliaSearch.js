import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  connectStateResults,
} from 'react-instantsearch-dom';
import { Image } from 'react-bootstrap';
import { replaceToDash } from '../Helper';
import '../css/components/Algolia.css';

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

const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : !searchState.query ? (
      <div></div>
    ) : (
      <div className='algolia-result'>
        No results found{' '}
        <span className='query-output'>"{searchState.query}"</span>
      </div>
    )
);

const AlgoliaSearch = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName='firebase'>
      <SearchBox translations={{ placeholder: 'Search all products' }} />

      <Results>
        <Hits hitComponent={Hit} />
      </Results>
    </InstantSearch>
  );
};

const Hit = ({ hit }) => {
  return (
    <a href={`/product/${replaceToDash(hit.full_product_name)}`}>
      <article className='hit'>
        <header className='hit-image-container'>
          {hit.images ? (
            <Image
              src={hit.images[0].url}
              title={hit.full_product_name}
              className='hit-image'
              fluid
            />
          ) : (
            ''
          )}
        </header>

        <div className='hit-info-container'>
          <p className='hit-category'>{hit.categories[0]}</p>
          <h1>{hit.full_product_name}</h1>
        </div>
      </article>
    </a>
  );
};

export default AlgoliaSearch;
