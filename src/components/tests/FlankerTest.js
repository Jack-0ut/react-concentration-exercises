import React, { useEffect, useState } from 'react';

const FlankerTask = ({ onScoreUpdate }) => {
  const [currentConfig, setCurrentConfig] = useState({ arrows: '', direction: '' });
  const [responses, setResponses] = useState([]);

  const generateConfiguration = () => {
    const lengths = [3, 5, 7, 9,11,13];
    const directions = ['<', '>'];

    const length = lengths[Math.floor(Math.random() * lengths.length)];
    const centralDirection = directions[Math.floor(Math.random() * directions.length)];

    const sideArrowsCount = (length - 1) / 2;
    let leftSideArrows = '';
    let rightSideArrows = '';

    for (let i = 0; i < sideArrowsCount; i++) {
      const matchDirection = Math.random() > 0.5;
      leftSideArrows += matchDirection ? centralDirection : directions.filter(d => d !== centralDirection)[0];
      rightSideArrows += matchDirection ? centralDirection : directions.filter(d => d !== centralDirection)[0];
    }

    const arrows = `${leftSideArrows}${centralDirection}${rightSideArrows}`;
    const direction = centralDirection === '<' ? 'right' : 'left';

    setCurrentConfig({ arrows, direction });
  };

  useEffect(() => {
    generateConfiguration();
  }, []);

  const handleResponse = (direction) => {
    const isCorrect = direction === currentConfig.direction;
    setResponses(prevResponses => [...prevResponses, { direction, isCorrect }]);
    generateConfiguration();
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

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="mb-4 text-xl font-semibold">Press the corresponding arrow key:</h2>
        <p className="text-4xl font-bold">{currentConfig.arrows}</p>
        <div className="mt-4">
          <button
            className="mx-2 px-4 py-2 bg-serene-blue text-white font-bold rounded hover:bg-cool-slate focus:outline-none shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleResponse('left')}
          >
            Left
          </button>
          <button
            className="mx-2 px-4 py-2 bg-gentle-coral text-white font-bold rounded hover:bg-cool-slate focus:outline-none shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleResponse('right')}
          >
            Right
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlankerTask;
