import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  connectStateResults,
} from 'react-instantsearch-dom';
import { Image } from 'react-bootstrap';
import { replaceToDash } from './Helper';
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
      <SearchBox translations={{ placeholder: 'Search all products' }} />

      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
};

function Hit({ hit }) {
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
          <p className='hit-category'>{hit.category}</p>
          <h1>{hit.full_product_name}</h1>
        </div>
      </article>
    </a>
  );
}

export default AlgoliaSearch;
