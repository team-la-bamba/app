import React from 'react';
import Select from 'react-select';

export default ({ label, onChange, options, placeholder, value }) => {
  const selected = options.filter((o) => o.value === value).pop();
  
  const customStyles = {
    option: (provided) => ({
      ...provided,
      padding: 10,
      color: "#333"
    }),
    control: (provided) => ({
        ...provided,
        borderColor: "#9fa6b2",
        padding: "0"
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: "0"
    }),
    singleValue: (provided) => ({
        ...provided,
        paddingLeft: "1em",
        marginLeft: "0"
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "#333"
    }),
    indicatorSeparator: () => ({}),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#333'
    }),
    placeholder: () => ({
        color: '#333',
        paddingLeft: '1rem'
    })
  } 

  return (
    <Select
      aria-label={label}
      placeholder={placeholder}
      value={selected}
      onChange={(selected) => onChange(selected ? selected.value : null)}
      isSearchable={true}
      isClearable={true}
      options={options}
      styles={customStyles}
    />
  );
};
