import React from 'react';
import '../css/components/Filter.css';
import { Select } from 'antd';

const { Option } = Select;

function Filter() {
  return (
    <div className="filter-container">
      <div className="productlist-filter sortby-product">
        <Select placeholder="Sort By">
          <Option value="Featured">Featured</Option>
          <Option value="Price Low-High">Price Low-High</Option>
          <Option value="Price High-Low">Price High-Low</Option>
        </Select>
      </div>
    </div>
  );
}

export default Filter;
