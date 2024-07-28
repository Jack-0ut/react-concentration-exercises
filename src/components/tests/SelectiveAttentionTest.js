import React, { useState, useEffect } from 'react';

const SelectiveAttentionTest = () => {
  const getRandomPosition = () => ({
    top: `${Math.random() * 80 + 10}%`, // Keeping within the viewport with margin
    left: `${Math.random() * 80 + 10}%`,
  });

  const [distractors, setDistractors] = useState([]);
  const [target, setTarget] = useState({ symbol: '🟢', position: getRandomPosition(), id: 'target' });
  const [feedback, setFeedback] = useState('');

  // Symbols for distractors and potential targets, including the target symbol
  const symbols = ['🔵', '🔴', '🟡', '🟠', '🟣', '⚫', '🟢'];

  useEffect(() => {
    // Initial setup for distractors
    setupDistractors();
    // Movement interval for distractors
    const moveInterval = setInterval(setupDistractors, 1000); // Adjust distractors' position every second
    return () => clearInterval(moveInterval);
  }, []);

  useEffect(() => {
    // Interval to update only distractors' positions, not the target's
    const moveInterval = setInterval(setupDistractors, 1000);
    return () => clearInterval(moveInterval);
  }, [distractors]);

  const setupDistractors = () => {
    const newDistractors = symbols
      .filter(symbol => symbol !== target.symbol) // Exclude the target symbol from distractors
      .slice(0, 5) // Select only 5 distractors
      .map((symbol, index) => ({
        id: `distractor-${index}`,
        symbol,
        position: getRandomPosition(),
      }));

    setDistractors(newDistractors);
  };

  const handleStimulusClick = (id) => {
    if (id === 'target') {
      setFeedback('Correct! 🎉');
      // Only update the target upon correct click
      const newTargetIndex = Math.floor(Math.random() * symbols.length);
      const newTargetSymbol = symbols[newTargetIndex];
      setTarget({ symbol: newTargetSymbol, position: getRandomPosition(), id: 'target' });
    } else {
      setFeedback('Incorrect 😓');
    }
    setTimeout(() => setFeedback(''), 1500); // Clear feedback
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen overflow-hidden bg-transparent relative">
      <h2 className="text-xl font-semibold mb-4 absolute top-20 left-1/2 transform -translate-x-1/2 bg-opacity-50 px-4 py-2 rounded">
        Select {target.symbol}
      </h2>
      {[...distractors, target].map(({ id, symbol, position }) => (
        <button
          key={id}
          onClick={() => handleStimulusClick(id)}
          className="w-16 h-16 rounded-full flex items-center justify-center text-4xl focus:outline-none absolute"
          style={{ top: position.top, left: position.left }}
        >
          {symbol}
        </button>
      ))}
      {feedback && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-lg font-medium px-4 py-2 rounded" style={{ backgroundColor: feedback.startsWith('Correct') ? '#4ade80' : '#f87171' }}>
          {feedback}
        </div>
      )}
    </div>
  );
};

export default SelectiveAttentionTest;
