import React from 'react';

const Input = ({ label, name, defaultValue, type, required, readOnly, disabled=false }) => {
  return (
    <label htmlFor={name} className='flex flex-col my-3'>
      <span class='font-bold text-gray-500'>{label}</span>
      <input
        required={required}
        type={type}
        name={name}
        placeholder={name}
        className='input'
        defaultValue={defaultValue}
        readOnly={readOnly}
        disabled={disabled}
      />
    </label>
  );
};

export default Input;
