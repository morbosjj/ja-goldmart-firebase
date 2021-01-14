import React, { useEffect } from 'react';
import { Layout, Table, Skeleton, Button, Popconfirm, message } from 'antd';
import AdminContainer from '../container/AdminContainer';
import AddCategory from '../modals/AddCategory';
import { firestore } from '../../firebase/config';
import EditCategory from '../modals/EditCategory';
import ModalToggle from '../component/ModalToggle';
import { useDataContext } from '../Context';
import '../../css/components/admin/Categories.css';
import { handleData } from '../Helper';

const { Content } = Layout;

const Categories = () => {
  const { categories, loading, getCategories } = useDataContext();

  useEffect(() => {
    getCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteCategory = (id) => {
    if (id) {
      firestore.collection('categories').doc(id).delete();
    } else {
      message.error('Error delete category');
    }
  };

  const columns = [
    {
      title: 'Category ID',
      dataIndex: 'category_id',
      key: 'category_id',
      fixed: 'left',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <div className='category-action'>
          <ModalToggle
            label='Edit Category'
            icon="<i class='fas fa-edit'></i>"
            modal={EditCategory}
            data={() => handleData(record)}
          />
          <Popconfirm
            title='Are you sure to delete?'
            onConfirm={() => {
              deleteCategory(record.id);
              message.success(`Delete ${record.name} category sucessfully`, 2);
            }}
          >
            <Button danger>
              <i class='far fa-trash-alt'></i>
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <AdminContainer title='Categories'>
      <Content className='layout-content'>
        <ModalToggle label='Add Category' modal={AddCategory} />

        {loading ? (
          <Skeleton active />
        ) : (
          <Table
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={categories}
          />
        )}
      </Content>
    </AdminContainer>
  );
};

export default Categories;
