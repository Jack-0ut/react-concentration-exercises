import React, { useState, useEffect } from 'react';

const DigitInput = ({ value, onChange, maxLength, feedbackColor }) => {
  const handleFocus = () => {
    const input = document.getElementById("hidden-input");
    if (input) input.focus();
  };

  return (
    <div className="flex space-x-2 justify-center" onClick={handleFocus}>
      {Array.from({ length: maxLength }).map((_, index) => (
        <div key={index} className={`border-b-2 w-10 h-12 text-3xl text-center ${feedbackColor} ${index < value.length ? 'border-gray-400' : ''}`} style={{ minWidth: '2.5rem' }}>
          {value[index] || ''}
        </div>
      ))}
      <input
        id="hidden-input"
        type="text"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="absolute opacity-0 pointer-events-none"
        autoFocus
        autoComplete="off"
      />
    </div>
  );
};

const DigitSpanTask = () => {
  const [currentSequence, setCurrentSequence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [sequenceLength, setSequenceLength] = useState(3);
  const [showSequence, setShowSequence] = useState(true);
  const [feedbackColor, setFeedbackColor] = useState('');

  const generateNewSequence = () => {
    const newSequence = Array.from({ length: sequenceLength }, () => Math.floor(Math.random() * 10)).join('');
    setCurrentSequence(newSequence);
    setShowSequence(true);
    setTimeout(() => setShowSequence(false), sequenceLength * 1000); // Time to memorize based on sequence length
    setUserInput('');
    setFeedbackColor(''); // Reset feedback color
  };

  useEffect(() => {
    generateNewSequence();
  }, [sequenceLength]);

  useEffect(() => {
    if (!showSequence && userInput.length === sequenceLength) {
      if (userInput === currentSequence) {
        setFeedbackColor('border-green-500'); // Green for correct
        setTimeout(() => {
          generateNewSequence(); // Generate a new sequence after showing green
          setSequenceLength(prevLength => prevLength + 1); // Increase sequence length for correct input
        }, 1000); // Short pause to show feedback
      } else {
        setFeedbackColor('border-red-500'); // Red for incorrect
        setTimeout(() => {
          generateNewSequence(); // Reset with a new sequence after showing red
        }, 1000); // Short pause to show feedback
      }
    }
  }, [userInput, currentSequence, showSequence]);

  const handleChange = (e) => {
    if (!showSequence) {
      setUserInput(e.target.value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent p-4 overflow-hidden">
      {showSequence ? (
        <div className="text-4xl font-bold">{currentSequence}</div>
      ) : (
        <>
          <h2 className="text-xl mb-4 font-semibold">Enter the sequence:</h2>
          <DigitInput value={userInput} onChange={handleChange} maxLength={sequenceLength} feedbackColor={feedbackColor} />
        </>
      )}
    </div>
  );
};

export default DigitSpanTask;
