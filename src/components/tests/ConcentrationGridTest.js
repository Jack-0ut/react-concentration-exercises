import React, { useState, useEffect } from 'react';

const ConcentrationGridTest = ({ onScoreUpdate }) => {
  const gridSize = 5;
  const numbersCount = gridSize * gridSize;
  const initialNumbers = Array.from({ length: numbersCount }, (_, index) => index + 1).sort(() => Math.random() - 0.5);
  const initialGrid = Array.from({ length: gridSize }, (_, rowIndex) =>
    Array.from({ length: gridSize }, (_, colIndex) => initialNumbers[rowIndex * gridSize + colIndex])
  );
  const [grid, setGrid] = useState(initialGrid);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleNumberClick = (number) => {
    const nextExpectedNumber = selectedNumbers.length + 1;
    if (number === nextExpectedNumber) {
      setSelectedNumbers([...selectedNumbers, number]);
      if (number === numbersCount) {
        setEndTime(Date.now());
      }
    }
  };

  const getCellColor = (number) => {
    if (selectedNumbers.includes(number)) {
      return 'bg-cool-slate';
    }
    return 'bg-serene-blue';
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <div key={rowIndex} className="flex">
        {row.map((number, columnIndex) => (
          <div
            key={rowIndex * gridSize + columnIndex + 1}
            className={`w-14 h-14 m-1 flex items-center justify-center text-white rounded-md cursor-pointer ${getCellColor(
              number
            )}`}
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </div>
        ))}
      </div>
    ));
  };

  const getElapsedTime = () => {
    if (startTime && endTime) {
      const elapsedTime = (endTime - startTime) / 1000; // Convert to seconds
      return elapsedTime.toFixed(2);
    }
    return '';
  };

  useEffect(() => {
    if (endTime) {
      // Calculate accuracy
      const accuracy = selectedNumbers.length / numbersCount;
      
      // Calculate completion time penalty
      const completionTime = (endTime - startTime) / 1000;
      const completionTimePenalty = Math.max(0, (60 - completionTime) / 60);

      // Combine accuracy and completion time to calculate score
      const score = (accuracy * 0.5 + completionTimePenalty * 0.5) * 100;

      console.log("Score: ", score);
      // Pass the score to the parent component
      onScoreUpdate(score);
    }
  }, [endTime, selectedNumbers, numbersCount, startTime, onScoreUpdate]);

  return (
    <div className="text-center mt-10">
      <div className="mb-4">{renderGrid()}</div>
      {endTime && (
        <div className="text-lg">
          <p>Completion time: {getElapsedTime()} seconds</p>
          <p>Accuracy: {(selectedNumbers.length / numbersCount * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default ConcentrationGridTest;
