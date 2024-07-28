'use client'
import React, { useState, useEffect } from 'react';

const ReactionTimeTest = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [showObject, setShowObject] = useState(false);
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [reactionTimes, setReactionTimes] = useState([]);

  // Function to show the object at random position after a random delay
  const triggerObject = () => {
    setShowObject(false);
    setStartTime(null);
    setEndTime(null);

    const delay = Math.random() * 2000 + 1000; // Random delay between 1-3 seconds
    setTimeout(() => {
      const top = Math.random() * 80 + 10; 
      const left = Math.random() * 80 + 10; 
      setPosition({ top: `${top}%`, left: `${left}%` });

      setShowObject(true);
      setStartTime(performance.now());
    }, delay);
  };

  // Function to handle object click
  const handleObjectClick = () => {
    if (!startTime) return; // Prevents clicks before the object is shown

    setEndTime(performance.now());
    const reactionTime = performance.now() - startTime;
    setReactionTimes([...reactionTimes, reactionTime]);
    triggerObject(); 
  };

  useEffect(() => {
    triggerObject();
    return () => {
      setShowObject(false);
      clearTimeout();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {showObject && (
        <button
          className="absolute w-20 h-20 bg-red-500 rounded-full focus:outline-none"
          style={{ top: position.top, left: position.left }}
          onClick={handleObjectClick}
        >
        </button>
      )}
    </div>
  );
};

export default ReactionTimeTest;
