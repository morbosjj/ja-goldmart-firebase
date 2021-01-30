import React from 'react';
import { Button } from 'antd';

function SubmitForm({
  titleSubmit,
  handleSubmit,
  backPage,
  onSubmit,
  disable,
}) {
  return (
    <div className="product-result">
      <div className="result-bottom">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button type="primary" htmlType="submit" disabled={disable}>
            {titleSubmit}
          </Button>
        </form>
        <Button type="primary" htmlType="submit" onClick={backPage}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default SubmitForm;
