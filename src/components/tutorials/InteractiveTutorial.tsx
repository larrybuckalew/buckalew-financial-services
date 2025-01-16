import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  target?: string; // CSS selector for highlighting
}

const tutorials = {
  dashboard: [
    {
      id: 'welcome',
      title: 'Welcome to Your Financial Dashboard',
      content: 'Get an overview of your financial health at a glance.',
      target: '#dashboard-overview'
    },
    {
      id: 'investments',
      title: 'Track Your Investments',
      content: 'Monitor your portfolio performance in real-time.',
      target: '#investment-section'
    },
    {
      id: 'transactions',
      title: 'Detailed Transaction History',
      content: 'Dive deep into your spending and earning patterns.',
      target: '#transactions-table'
    }
  ],
  portfolio: [
    {
      id: 'portfolio-intro',
      title: 'Portfolio Management',
      content: 'Learn how to manage and optimize your investments.',
      target: '#portfolio-overview'
    }
  ]
};

interface InteractiveTutorialProps {
  tutorialType: keyof typeof tutorials;
  onComplete?: () => void;
}

const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({ 
  tutorialType, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = tutorials[tutorialType];

  useEffect(() => {
    // Highlight target element
    const currentTarget = steps[currentStep].target;
    if (currentTarget) {
      const targetElement = document.querySelector(currentTarget);
      if (targetElement) {
        targetElement.classList.add('tutorial-highlight');
      }
    }

    return () => {
      // Remove highlight when unmounting
      if (currentTarget) {
        const targetElement = document.querySelector(currentTarget);
        if (targetElement) {
          targetElement.classList.remove('tutorial-highlight');
        }
      }
    };
  }, [currentStep, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4">{currentStepData.title}</h2>
        <p className="mb-6">{currentStepData.content}</p>
        
        <div className="flex justify-between">
          {currentStep > 0 && (
            <button 
              onClick={handlePrevious}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Previous
            </button>
          )}
          
          <button 
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
        
        <div className="mt-4 flex justify-center">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`h-2 w-2 mx-1 rounded-full ${
                index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveTutorial;
