'use client';
import React, { useState, lazy, Suspense, useEffect } from 'react';
import ProgressBar from './ProgressBar';

const ReactionTimeTest = lazy(() => import('./tests/ReactionTimeTest'));
const StroopTest = lazy(() => import('./tests/StroopTest'));
const FlankerTest = lazy(() => import("./tests/FlankerTest"));
const VisualSearchTest = lazy(() => import("./tests/VisualSearchTest"));
const ContinuousPerformanceTest = lazy(() => import("./tests/ContinuousPerformanceTest"));
const DigitSpanTest = lazy(() => import("./tests/DigitSpanTest"));
const SelectiveAttentionTest = lazy(() => import("./tests/SelectiveAttentionTest"));
const ConcentrationGridTest = lazy(() => import("./tests/ConcentrationGridTest"));
const NBackTest = lazy(() => import("./tests/NBackTest"));

const testSpecifications = [
  {
    id: 5,
    name: "Visual Search",
    component: ConcentrationGridTest,
    description: "Respond as quickly as possible to a stimulus.",
    getScore: (score:number) => score 
  },
  /*{
    id: 5,
    name: "Visual Search",
    component: VisualSearchTest,
    description: "Respond as quickly as possible to a stimulus.",
    getScore: (score:number) => score 
  },
  {
    id: 5,
    name: "Reaction Time Test (RTT)",
    component: StroopTest,
    description: "Respond as quickly as possible to a stimulus.",
    getScore: (score:number) => score 
  },
  {
    id: 6,
    name: "New Test",
    component: FlankerTest,
    description: "Description of the new test.",
    getScore: (score:number) => score // Implement the getScore function for the new test
  }*/
];

export default function TestComponent({ onSeeResultsClick }) {
  const [currentTestIndex, setCurrentTestIndex] = useState<number | null>(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [timer, setTimer] = useState<number>(30);
  const [scores, setScores] = useState<number[]>([]);
  const [showResultsButton, setShowResultsButton] = useState(false);

  const totalTests = testSpecifications.length;

  useEffect(() => {
    if (testStarted && timer === 0) {
      const nextIndex =
        currentTestIndex !== null && currentTestIndex < totalTests - 1 ? currentTestIndex + 1 : null;
      setCurrentTestIndex(nextIndex);
      setTimer(30);
      setShowInstructions(true);
      setTestStarted(false);

      const score = testSpecifications[currentTestIndex]?.getScore();
      if (score !== undefined && score !== null) {
        setScores(prevScores => [...prevScores, score]);
      }

      if (nextIndex === null) {
        setShowResultsButton(true);
      }
    } else if (testStarted) {
      const countdownInterval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdownInterval);
    }
  }, [timer, testStarted, currentTestIndex, totalTests]);

  const startTest = () => {
    setShowInstructions(false);
    setTestStarted(true);
    setTimer(30);
  };

  const handleScoreUpdate = (score: number) => {
    // Update scores array with the score for the current test
    setScores(prevScores => {
      const updatedScores = [...prevScores];
      updatedScores[currentTestIndex!] = score; // Store the score for the current test
      console.log('New score added:', score); // Log the new score
      return updatedScores;
    });
  };
  

  // Calculate the sum of scores
  const totalScore = scores.reduce((acc, score) => acc + score, 0);

  const CurrentTestComponent =
    currentTestIndex !== null ? React.createElement(testSpecifications[currentTestIndex].component, {
      key: currentTestIndex,
      onScoreUpdate: handleScoreUpdate,
    }) : null;

  return (
    <div className="flex flex-col mx-auto" style={{
      height: '100vh',
      overflow: 'hidden',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '1rem',
    }}>
      <ProgressBar step={currentTestIndex ?? 0} totalSteps={testSpecifications.length} />

      {currentTestIndex !== null && (
        <div className="text-center mt-4">
          <span className="text-lg font-semibold">Time left: {timer}s</span>
        </div>
      )}

      <div className="flex-grow flex justify-center items-center" style={{ minHeight: '0' }}>
        {currentTestIndex !== null && currentTestIndex >= 0 && currentTestIndex < testSpecifications.length ? (
          showInstructions ? (
            <div className="flex flex-col items-center justify-center w-full" style={{ height: '100%' }}>
              <div
                className="instruction-panel p-4 rounded-lg shadow-md text-center max-w-xl bg-opacity-85 backdrop-blur-lg border border-opacity-20 text-cool-slate bg-white text-black hover:shadow-xl"
              >
                <h2 className="text-xl font-bold">{testSpecifications[currentTestIndex]?.name}</h2>
                <p className="mt-2">{testSpecifications[currentTestIndex]?.description}</p>
                <button
                  onClick={startTest}
                  disabled={testStarted} 
                  className="mt-4 bg-gradient-to-r from-gentle-coral to-soothing-green hover:from-soothing-green hover:to-gentle-coral text-white font-bold py-2 px-4 rounded transform transition duration-500 hover:scale-105"
                >
                  GO
                </button>
              </div>
            </div>
          ) : (
            <Suspense fallback={<div className="text-center"></div>}>
              {CurrentTestComponent}
            </Suspense>
          )
        ) : null}
      </div>

      {showResultsButton && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={onSeeResultsClick(totalScore)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            See Your Results
          </button>
        </div>
      )}
    </div>
  );
}
