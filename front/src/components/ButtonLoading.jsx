import React from 'react';
import ReactLoading from 'react-loading';

const ButtonLoading = ({ disabled, loading, text, onClick = () => {}, color="indigo", value='' }) => {
  return (
    <button
      data-testid='button-loading'
      onClick={onClick}
      disabled={disabled}
      type='submit'
      value={value}
      className={`bg-${color}-700 text-white font-bold text-lg py-3 px-3  rounded-xl hover:bg-${color}-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700`}
    >
      {loading ? <ReactLoading type='spin' height={30} width={30} data-testid='loading-in-button' /> : text}
    </button>
  );
};

export default ButtonLoading;
