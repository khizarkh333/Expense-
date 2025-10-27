
import React, { useState, useCallback } from 'react';
import { Expense } from '../types';
import { getSpendingInsights } from '../services/geminiService';
import SparklesIcon from './icons/SparklesIcon';

interface AiInsightsProps {
  expenses: Expense[];
}

const AiInsights: React.FC<AiInsightsProps> = ({ expenses }) => {
  const [insights, setInsights] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetInsights = useCallback(async () => {
    if (expenses.length < 3) {
      setError('Please add at least 3 expenses to get meaningful insights.');
      return;
    }
    setIsLoading(true);
    setError('');
    setInsights('');
    try {
      const result = await getSpendingInsights(expenses);
      setInsights(result);
    } catch (e) {
      setError('Failed to get insights. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [expenses]);

  const renderFormattedInsights = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('* ')) {
        return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
      }
      if (line.trim().length === 0) {
        return <br key={index} />;
      }
      return <p key={index} className="mb-2">{line}</p>;
    });
  };

  return (
    <div className="bg-gray-700/50 p-6 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
        <h3 className="text-lg font-bold text-gray-200">AI Financial Advisor</h3>
        <button
          onClick={handleGetInsights}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          <SparklesIcon />
          {isLoading ? 'Analyzing...' : 'Get Insights'}
        </button>
      </div>

      {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-md">{error}</p>}
      
      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        </div>
      )}

      {insights && (
        <div className="bg-gray-800/50 p-4 rounded-md mt-4 text-gray-300">
          {renderFormattedInsights(insights)}
        </div>
      )}
    </div>
  );
};

export default AiInsights;
