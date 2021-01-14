import React, { useEffect } from 'react';
import '../css/components/Menu.css';
import { useDataContext } from './Context';

function Menu({ loading }) {
  const { categories, getCategories } = useDataContext();

  useEffect(() => {
    getCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        ''
      ) : (
        <div className='category-menu'>
          <div className='menu-header'>
            <h3>Categories</h3>
          </div>

          <div className='menu-item-list'>
            <ul>
              {categories &&
                categories.map((category) => {
                  return (
                    <li key={category.category_id}>
                      <a
                        href={`/category/${category.name}`}
                        className='menu-item'
                      >
                        {category.name}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
