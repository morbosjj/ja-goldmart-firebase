import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Button } from 'antd';

const ModalToggle = ({ label, icon, modal, data }) => {
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState({});

  const Modal = modal;

  const toggleModal = () => {
    setItem(data);
    // setVisible((prevState) => ({ visible: !prevState.visible }));
    setVisible((prevState) => !prevState);
  };

  return (
    <div className='modal-toggle'>
      <Button onClick={toggleModal}>
        {icon ? ReactHtmlParser(icon) : label}
      </Button>
      <Modal
        title={label}
        visible={visible}
        setVisible={setVisible}
        onCancel={toggleModal}
        data={item}
      />
    </div>
  );
};

export default ModalToggle;
