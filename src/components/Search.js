import React, { useState } from 'react';
import { AutoComplete } from 'antd';

const Option = AutoComplete.Option;

const AutocompleteData = [
  {
    id: 1,
    product_name: 'Die Cutting',
  },

  {
    id: 2,
    product_name: 'Chain Feeding',
  },

  {
    id: 3,
    product_name: 'Flat Bed Die Cutting',
  },
  {
    id: 4,
    product_name: 'Eccentric Sloter',
  },
  {
    id: 5,
    product_name: 'Manual Stitcher',
  },
];

const SearchQuery = (query) => {
  return new Array.map((item) => ({
    query,
    product_name: `${query}`,
  }));
};

const SearchList = (item) => {
  return (
    <Option>
      <p>{item.product_name}</p>
    </Option>
  );
};

const Search = () => {
  const [items, setItems] = useState(AutocompleteData);

  const onSelect = () => {
    console.log('Searched');
  };

  const handleSearch = (value) => {
    setItems(value ? SearchQuery(value) : []);
  };

  return (
    <div className='search-form'>
      <AutoComplete
        options={items.map(SearchList)}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={handleSearch}
        placeholder='Search Products'
      ></AutoComplete>
    </div>
  );
};

export default Search;
