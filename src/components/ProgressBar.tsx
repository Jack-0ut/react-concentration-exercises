interface ProgressBarProps {
  step: number; 
  totalSteps: number; 
}
const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
  const stepsArray = Array.from({ length: totalSteps }, (_, i) => i + 1); // Start numbers from 1

  return (
    <div className="flex justify-center items-center py-4">
      <div className="flex items-center space-x-2">
        {stepsArray.map((number) => ( 
          <div key={number} className="flex flex-col items-center"> {/* Use number as key for uniqueness */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300
              ${number <= step ? 'bg-soft-purple' : 'bg-gray-200'}`}
            >
              <span className="text-sm font-medium">{number}</span> {/* Display the number */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
