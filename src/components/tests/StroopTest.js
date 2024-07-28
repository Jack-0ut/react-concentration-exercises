import React, { useState, useEffect } from 'react';

const colors = ['red', 'blue', 'green', 'yellow', 'purple'];

const colorMappings = {
  red: "#E53E3E",
  blue: "#3182CE",
  green: "#38A169",
  yellow: "#D69E2E",
  purple: "#805AD5",
};

const getUniqueCombinations = () => {
  let combinations = [];
  colors.forEach(text => {
    colors.filter(ink => ink !== text).forEach(ink => {
      combinations.push({ text, ink });
    });
  });
  return combinations;
};

const colorCombinations = getUniqueCombinations();

const getRandomCombination = () => {
  const randomIndex = Math.floor(Math.random() * colorCombinations.length);
  return colorCombinations[randomIndex];
};

const StroopTest = ({ onScoreUpdate }) => {
  const [currentCombination, setCurrentCombination] = useState(getRandomCombination());
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    setCurrentCombination(getRandomCombination());
  }, []);

  const handleResponse = (ink) => {
    const isCorrect = ink === currentCombination.ink;
    setResponses(prevResponses => [...prevResponses, { ...currentCombination, response: ink, isCorrect}]);
    setCurrentCombination(getRandomCombination());
  };

  const calculateScore = () => {
    const totalShown = responses.length;
    const correctResponses = responses.filter(response => response.isCorrect).length;
  
    // Calculate accuracy
    const accuracy = totalShown > 0 ? correctResponses / totalShown : 0;
  
    // Calculate score based on accuracy and total shown
    const score = ((accuracy * totalShown) / 60) * 100;
    return score;
  };
  
  useEffect(() => {
    const score = calculateScore();
    onScoreUpdate(score);
  }, [responses, onScoreUpdate]);

  const textColorStyle = (color) => ({ color: colorMappings[color] || color });

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden p-4">
      <div className="text-6xl font-bold mb-4 md:mb-12" style={textColorStyle(currentCombination.ink)}>
        {currentCombination.text}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleResponse(color)}
            className="bg-black text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-full focus:outline-none shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StroopTest;
