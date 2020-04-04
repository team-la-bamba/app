import React from 'react';

function Input({ _id, onClick, selected, text }) {
  const fakeEvent = {
    persist: () => {},
    target: {
      name: 'answer',
      value: _id,
    },
  };

  return (
    <div
      className="flex content-center border rounded-lg border-black border-2 py-4 .my-3 my-3"
      onClick={() => onClick(fakeEvent)}
      style={{ backgroundColor: selected ? '#f5f2ed' : '' }}
    >
      <div className="flex ml-3 items-start">
        <input
          onChange={onClick}
          id={fakeEvent.target.name}
          name={fakeEvent.target.name}
          type="radio"
          value={fakeEvent.target.value}
          checked={selected}
          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out __web-inspector-hide-shortcut__"
        />
        <label htmlFor={fakeEvent.target.name} className="-mt-1 ml-3">
          {text}
        </label>
      </div>
    </div>
  );
}

export default Input;
