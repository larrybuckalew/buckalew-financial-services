import React, { useState } from 'react';
import { Alert } from '@/components/ui/alert';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    rating: 5,
    comment: '',
    category: 'general'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        setSubmitted(true);
        // Track feedback submission
        analytics.trackEvent('Feedback Submitted', {
          rating: feedback.rating,
          category: feedback.category
        });
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Feedback</h2>
      {submitted ? (
        <Alert>
          <AlertTitle>Thank you for your feedback!</AlertTitle>
          <AlertDescription>
            We appreciate your input and will use it to improve our services.
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Rating</label>
            <select
              value={feedback.rating}
              onChange={(e) => setFeedback({ ...feedback, rating: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-2">Category</label>
            <select
              value={feedback.category}
              onChange={(e) => setFeedback({ ...feedback, category: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="general">General</option>
              <option value="platform">Platform</option>
              <option value="services">Financial Services</option>
              <option value="support">Customer Support</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Comments</label>
            <textarea
              value={feedback.comment}
              onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Please share your thoughts..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;