import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function GoalProgress({ goals }) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Financial Goals</h2>
      
      <div className="space-y-6">
        {goals.map((goal, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{goal.name}</h3>
              <span className="text-sm text-gray-600">
                ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
              </span>
            </div>
            
            <Progress
              value={(goal.current / goal.target) * 100}
              className="h-2"
            />
            
            <div className="flex justify-between text-sm text-gray-600">
              <span>{((goal.current / goal.target) * 100).toFixed(1)}% Complete</span>
              <span>{goal.targetDate}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Add New Goal
      </button>
    </Card>
  );
}
