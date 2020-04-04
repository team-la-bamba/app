import React from 'react';

function Error({ text = '' }) {
  return <p className="rounded bg-red-600 mb-2 p-2 text-white">{text}</p>;
}

export default Error;
