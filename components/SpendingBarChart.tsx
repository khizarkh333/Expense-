
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Expense } from '../types';

interface SpendingBarChartProps {
  expenses: Expense[];
}

const SpendingBarChart: React.FC<SpendingBarChartProps> = ({ expenses }) => {
  const data = useMemo(() => {
    const dailyTotals: { [key: string]: number } = {};
    expenses.forEach(expense => {
      dailyTotals[expense.date] = (dailyTotals[expense.date] || 0) + expense.amount;
    });
    return Object.entries(dailyTotals)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [expenses]);

  return (
    <div className="bg-gray-700/50 p-6 rounded-lg">
      <h3 className="text-lg font-bold mb-4 text-gray-200">Daily Spending</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
            <XAxis dataKey="date" tick={{ fill: '#a0a0a0' }} />
            <YAxis tick={{ fill: '#a0a0a0' }} />
            <Tooltip
              cursor={{ fill: 'rgba(100,116,139,0.2)' }}
              contentStyle={{ backgroundColor: '#2d2d2d', border: '1px solid #444' }}
              itemStyle={{ color: '#a0a0a0' }}
            />
            <Legend />
            <Bar dataKey="amount" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingBarChart;
