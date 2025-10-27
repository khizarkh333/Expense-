
import React from 'react';
import { Expense } from '../types';
import CategoryPieChart from './CategoryPieChart';
import SpendingBarChart from './SpendingBarChart';
import AiInsights from './AiInsights';

interface DashboardProps {
  expenses: Expense[];
}

const Dashboard: React.FC<DashboardProps> = ({ expenses }) => {
  const totalSpending = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-200 mb-1">Dashboard</h2>
        <p className="text-gray-400">Your financial overview and AI-powered insights.</p>
      </div>

      <div className="bg-gray-700/50 p-6 rounded-lg">
        <p className="text-lg text-gray-400">Total Spending</p>
        <p className="text-4xl font-extrabold text-cyan-400">${totalSpending.toFixed(2)}</p>
      </div>
      
      {expenses.length > 0 ? (
        <>
         <AiInsights expenses={expenses} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CategoryPieChart expenses={expenses} />
            <SpendingBarChart expenses={expenses} />
          </div>
        </>
      ) : (
         <div className="text-center py-16">
            <p className="text-gray-500">Add some expenses to see your dashboard.</p>
         </div>
      )}

    </div>
  );
};

export default Dashboard;
