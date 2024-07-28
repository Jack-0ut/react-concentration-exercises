// Import the necessary dependencies
import React, { useState, useEffect } from 'react';

// Define colors and shapes in lowercase
const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
const shapes = ["circle", "square", "triangle"]; // Lowercase shapes

// Define the ShapeComponents function to generate shape components
const ShapeComponents = (onScoreUpdate) => ({
  Circle: ({ color, onClick }) => <div onClick={() => {onClick(); onScoreUpdate();}} className={`w-8 h-8 rounded-full cursor-pointer`} style={{ backgroundColor: color }}></div>,
  Square: ({ color, onClick }) => <div onClick={() => {onClick(); onScoreUpdate();}} className={`w-8 h-8 cursor-pointer`} style={{ backgroundColor: color }}></div>,
  Triangle: ({ color, onClick }) => (
    <svg onClick={() => {onClick(); onScoreUpdate();}} width="40" height="35" viewBox="0 0 120 120" className="cursor-pointer">
      <polygon points="60,0 120,120 0,120" fill={color} />
    </svg>
  ),
});

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// Function to generate shapes with a unique target
const generateShapesWithUniqueTarget = (totalShapes, targetShape, targetColor, onScoreUpdate) => {
  let items = [];
  // Add the unique target
  const targetComponent = ShapeComponents(onScoreUpdate)[capitalizeFirstLetter(targetShape)]; // Capitalize to match component name
  items.push({ Component: targetComponent, color: targetColor, isTarget: true });

  // Fill the rest with a mix of items
  while (items.length < totalShapes) {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const Component = ShapeComponents(onScoreUpdate)[capitalizeFirstLetter(randomShape)]; // Capitalize to match component name
    if (!(randomShape === targetShape && randomColor === targetColor)) {
      items.push({ Component, color: randomColor, isTarget: false });
    }
  }

  // Shuffle the items to randomize their positions
  items.sort(() => Math.random() - 0.5);

  return items;
};

// Define the VisualSearchTask component
const VisualSearchTask = ({ onScoreUpdate }) => {
  // Define state variables
  const [items, setItems] = useState([]);
  const [target, setTarget] = useState({});
  const gridTotal = 36; // For a 6x6 grid
  const [correctCount, setCorrectCount] = useState(0);

  // Function to regenerate items with a new target
  const regenerateItems = () => {
    const targetColor = colors[Math.floor(Math.random() * colors.length)];
    const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
    setTarget({ color: targetColor, shape: targetShape });
    setItems(generateShapesWithUniqueTarget(gridTotal, targetShape, targetColor, onScoreUpdate));
  };

  // Effect hook to generate items when component mounts
  useEffect(() => {
    regenerateItems();
  }, []);

  // Function to handle item click events
  const handleItemClick = (isTarget) => {
    if (isTarget) {
      setCorrectCount(correctCount + 1); // Increment correct count
      regenerateItems(); // Regenerate with a new target
    }
  };

  // Function to calculate the score
  const calculateScore = () => {
    const totalShown = items.length;
    const accuracy = totalShown > 0 ? correctCount / totalShown : 0;
    const score = (accuracy * totalShown) / 60 * 100;
    return score;
  };

  // Effect hook to update the score when the correct count changes
  useEffect(() => {
    const score = calculateScore();
    onScoreUpdate(score);
  }, [correctCount, onScoreUpdate]);

  // JSX to render the VisualSearchTask component
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Find the {target.color} {target.shape}</h2>
      <div className="grid grid-cols-6 gap-4 p-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-center items-center">
            <item.Component color={item.color} onClick={() => handleItemClick(item.isTarget)} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the VisualSearchTask component
export default VisualSearchTask;
