import React from 'react';

const Input = ({ label, name, defaultValue, type, required, readOnly }) => {
  return (
    <label htmlFor={name} className='flex flex-col my-3'>
      <span>{label}</span>
      <input
        required={required}
        type={type}
        name={name}
        className='input'
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
    </label>
  );
};

export default Input;
