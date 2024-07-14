import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Plus } from 'lucide-react';

const TagSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([
    { id: 'bug', name: 'Bug', },
    { id: 'feature', name: 'Feature', },
    { id: 'improvement', name: 'Improvement', },
  ]);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current.focus(), 0);
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const createNewTag = () => {
    const newTag = {
      id: inputValue.toLowerCase().replace(/\s+/g, '-'),
      name: inputValue,
    };
    setTags(prev => [...prev, newTag]);
    toggleTag(newTag);
    setInputValue('');
  };

  const renderTagContent = () => {
    if (selectedTags.length === 0) {
      return (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add label..."
          className="bg-transparent outline-none flex-grow min-w-0"
        />
      );
    } else {
        return (
            <>
              {selectedTags.map(tag => (
                <span key={tag.id} className="flex items-center bg-gray-700 text-sm px-2 py-1 rounded mr-1">
                  {tag.name}
                  <X 
                    size={14} 
                    className="ml-1 cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTag(tag);
                    }} 
                  />
                </span>
              ))}
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="bg-transparent outline-none flex-grow min-w-0"
              />
            </>
          );
    }
  };

  return (
    <div className="relative m-12 mx-auto w-64" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="w-full px-2 py-2 bg-gray-800 text-white rounded-md flex items-center justify-between cursor-pointer"
      >
        <div className="flex-grow flex items-center space-x-2 overflow-hidden">
          {renderTagContent()}
        </div>
        <ChevronDown size={20} />
      </div>
      {isOpen && (
        <div className="absolute w-full mt-1 bg-gray-800 rounded-md shadow-lg overflow-hidden">
          <div className="max-h-60 overflow-y-auto">
            {filteredTags.map((tag) => (
              <div
                key={tag.id}
                onClick={() => toggleTag(tag)}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700"
              >
                <span className="text-white">{tag.name}</span>
              </div>
            ))}
            {inputValue && !filteredTags.length && (
              <div
                onClick={createNewTag}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700"
              >
                <Plus size={16} className="mr-2 text-white" />
                <span className="text-white">Create "{inputValue}"</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSelector;