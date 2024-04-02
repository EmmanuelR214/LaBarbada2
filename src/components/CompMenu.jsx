import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

export const CustomSelect = ({ options, placeholder, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className="appearance-none border-red-600 border-2 rounded px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none pr-10 bg-white"
        onClick={toggleDropdown}
      >
        <div className="flex justify-between items-center">
          <span>{value ? value.label : placeholder}</span>
          <Icon
            icon="material-symbols:expand-more"
            className={`text-3xl text-red-600 absolute right-1 flex items-center ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full bg-white shadow-md mt-1 rounded border-red-600 border-2 text-black z-10"
          >
            <ul>
              {options.map((option, index) => (
                <li key={index} className="px-3 py-2 rounded hover:bg-gray-200">
                  <button
                    className="w-full text-left focus:outline-none"
                    onClick={() => {
                      onChange(option);
                      toggleDropdown();
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


















/******************************************** */
export const CustomSelectPlus = ({ options, placeholder, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    const selectedIndex = selectedOptions.findIndex((opt) => opt.value === option.value);
    if (selectedIndex > -1) {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions.splice(selectedIndex, 1);
      setSelectedOptions(newSelectedOptions);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const isSelected = (option) => {
    return selectedOptions.some((opt) => opt.value === option.value);
  };

  return (
    <div className="relative w-5/6">
      <div
        className="appearance-none px-3 py-2 w-full leading-tight focus:outline-none pr-10 border-b-2"
        onClick={toggleDropdown}
      >
        <div className="flex justify-between items-center">
          <span>{selectedOptions.length > 0 ? selectedOptions.map((opt) => opt.label).join(', ') : placeholder}</span>
          <Icon
            icon="material-symbols:expand-more"
            className={`text-3xl text-white mb-2 bg-red-600 rounded-full absolute right-1 flex items-center ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full bg-black shadow-md mt-1 border-b-2 text-white z-10 overflow-y-auto max-h-40" 
            style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none', overflow: '-webkit-overflow-scrolling' }} 
          >
            <ul>
              {options.map((option, index) => (
                <li key={index} className="px-3 py-2 hover:bg-zinc-800 border-b-2">
                  <label htmlFor={`option-${index}`} className="cursor-pointer flex items-center">
                    <div>
                      <span>{option.label}</span>
                      <span className="text-red-600 text-sm font-medium block">{option.extraText}</span>
                    </div>
                    <input
                      type="checkbox"
                      id={`option-${index}`}
                      className={`ml-auto size-4 ${isSelected(option) ? 'bg-black' : ''}`}
                      checked={isSelected(option)}
                      onChange={() => handleOptionClick(option)}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};