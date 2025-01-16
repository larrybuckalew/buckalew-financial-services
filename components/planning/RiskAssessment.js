import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

const questions = [
  {
    id: 1,
    text: 'What is your investment time horizon?',
    options: [
      { value: 1, text: '1-3 years' },
      { value: 2, text: '3-5 years' },
      { value: 3, text: '5-10 years' },
      { value: 4, text: '10+ years' }
    ]
  },
  {
    id: 2,
    text: 'How would you react to a 20% decline in your portfolio?',
    options: [
      { value: 1, text: 'Sell everything' },
      { value: 2, text: 'Sell some investments' },
      { value: 3, text: 'Do nothing' },
      { value: 4, text: 'Buy more investments' }
    ]
  },
  {
    id: 3,
    text: 'What is your primary investment goal?',
    options: [
      { value: 1, text: 'Preserve capital' },
      { value: 2, text: 'Generate income' },
      { value: 3, text: 'Balanced growth and income' },
      { value: 4, text: 'Maximize growth' }
    ]
  }
];

export default function RiskAssessment() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const calculateRiskScore = () => {
    const total = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const maxPossible = questions.length * 4;
    const score = Math.round((total / maxPossible) * 100);

    let profile;
    if (score < 25) profile = 'Conservative';
    else if (score < 50) profile = 'Moderate Conservative';
    else if (score < 75) profile = 'Moderate Aggressive';
    else profile = 'Aggressive';

    setResults({ score, profile });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Risk Assessment</h2>

      <div className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="space-y-2">
            <p className="font-medium">{question.text}</p>
            <div className="space-y-2">
              {question.options.map((option) => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.value}
                    onChange={(e) => setAnswers({ ...answers, [question.id]: Number(e.target.value) })}
                    className="form-radio"
                  />
                  <span>{option.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={calculateRiskScore}
          disabled={Object.keys(answers).length !== questions.length}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Calculate Risk Profile
        </button>

        {results && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Your Risk Profile</h3>
            <p className="text-lg">{results.profile}</p>
            <p className="text-sm text-gray-600">Risk Score: {results.score}/100</p>
          </div>
        )}
      </div>
    </Card>
  );
}
