import React, { useState, useEffect } from 'react';

const ContinuousPerformanceTest = () => {
  const [currentLetter, setCurrentLetter] = useState('');
  const [score, setScore] = useState(0);
  const [testActive, setTestActive] = useState(true);
  const [correctClick, setCorrectClick] = useState(false); 

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  const targetLetter = 'X';
  const letterInterval = 1000; // Interval between letters in milliseconds (1 second)

  useEffect(() => {
    let intervalId;
    if (testActive) {
      intervalId = setInterval(() => {
        const newLetter = letters[Math.floor(Math.random() * letters.length)];
        setCurrentLetter(newLetter);
      }, letterInterval);
    }

    return () => clearInterval(intervalId);
  }, [testActive]);

  const handleLetterClick = () => {
    if (!testActive) return;

    if (currentLetter === targetLetter) {
      setScore(score + 1);
      setCorrectClick(true);
      setTimeout(() => setCorrectClick(false), 1000); 
    }
  };

  const stopTest = () => {
    setTestActive(false);
    alert(`Test over! You clicked ${score} times correctly.`);
  };

  return (
    <div className="cpt-test" style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
      {testActive ? (
        <>
          <div className="letter-display" style={{ fontSize: '60px', margin: '20px auto', width: '100px', height: '100px', lineHeight: '100px', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {currentLetter}
          </div>
          <button
            onClick={handleLetterClick}
            style={{
              background: correctClick ? 'green' : 'black', // Change color to green if correctClick is true
              color: 'white',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '9999px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out', // Add transition for background-color
              cursor: 'pointer',
              margin: '10px'
            }}
            className="focus:outline-none hover:scale-105"
          >
            Click if "{targetLetter}"
          </button>
        </>
      ) : (
        <div style={{ fontSize: '24px', marginTop: '20px' }}>
          Test over! Your score: {score}
        </div>
      )}
    </div>
  );
};

export default ContinuousPerformanceTest;
