import React from 'react';

const Input = ({ label, name, defaultValue, type, required }) => {
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
      />
    </label>
  );
};

export default Input;
