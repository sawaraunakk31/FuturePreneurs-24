import React, { useState } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

const Dropdownlogo = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onClick();
  };
  
  return (
    <button onClick={handleClick}>
      {isOpen ? <AiOutlineMinusCircle size={28} /> : <AiOutlinePlusCircle size={28} />}
    </button>
  );
};

export default Dropdownlogo;