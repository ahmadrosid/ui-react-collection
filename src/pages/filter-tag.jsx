import React, { useState } from 'react';

const cuisines = [
  'Italian', 'Chinese', 'Indian', 'American', 'Mexican',
  'Japanese', 'Thai', 'Turkish', 'Greek', 'Spanish',
  'Mediterranean', 'British', 'Korean', 'Vietnamese',
  'French', 'Caribbean', 'Lebanese', 'Brazilian', 'Ethiopian',
  'German', 'Cuban', 'Moroccan', 'Russian', 'Argentinian',
  'Peruvian', 'Filipino'
];

const CuisineSelector = () => {
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  const toggleCuisine = (cuisine) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  return (
      <div className="relative z-10 p-8 max-w-6xl mx-auto">
        <h2 className="text-white text-2xl font-bold mb-6">What are your favorite cuisines?</h2>
        <div className="flex flex-wrap gap-3">
          {cuisines.map((cuisine) => (
            <label
              key={cuisine}
              className="relative inline-flex items-center"
            >
              <input
                type="checkbox"
                className="absolute opacity-0 w-full h-full cursor-pointer"
                checked={selectedCuisines.includes(cuisine)}
                onChange={() => toggleCuisine(cuisine)}
              />
              <span
                className={`
                  py-1.5 px-4 rounded-full text-sm font-medium
                  transition-all duration-300 ease-in-out
                  flex items-center justify-center border-2
                  ${selectedCuisines.includes(cuisine)
                    ? 'bg-orange-600/35 text-white border-orange-600'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-transparent'}
                `}
                style={{
                  paddingRight: selectedCuisines.includes(cuisine) ? '2.5rem' : '1rem',
                }}
              >
                {cuisine}
                <span 
                  className={`
                    absolute right-2 w-5 h-5 rounded-full bg-white 
                    flex items-center justify-center
                    transition-all duration-300 ease-in-out
                    ${selectedCuisines.includes(cuisine)
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-0'}
                  `}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-orange-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>
  );
};

export default CuisineSelector;