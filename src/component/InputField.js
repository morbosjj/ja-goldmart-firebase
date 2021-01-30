import React from 'react';
import { Input } from 'antd';
import { Controller } from 'react-hook-form';

function InputField({ control, name, rules, defaultValue, maxLength }) {
  return (
    <Controller
      as={Input}
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      maxLength={maxLength}
    />
  );
}

export default InputField;
