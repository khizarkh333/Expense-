
import React from 'react';
import { Expense } from '../types';
import TrashIcon from './icons/TrashIcon';

interface ExpenseListProps {
  expenses: Expense[];
  deleteExpense: (id: string) => void;
}

const ExpenseItem: React.FC<{ expense: Expense; deleteExpense: (id: string) => void }> = ({ expense, deleteExpense }) => (
  <li className="flex items-center justify-between bg-gray-700 p-3 rounded-md hover:bg-gray-600 transition-colors duration-200">
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <span className="font-semibold text-gray-100">{expense.name}</span>
        <span className="text-sm text-gray-400">{expense.date} | {expense.category}</span>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className="font-bold text-cyan-400 text-lg">${expense.amount.toFixed(2)}</span>
      <button
        onClick={() => deleteExpense(expense.id)}
        className="text-gray-500 hover:text-red-500 p-1 rounded-full transition-colors duration-200"
        aria-label="Delete expense"
      >
        <TrashIcon />
      </button>
    </div>
  </li>
);

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, deleteExpense }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col h-[calc(100vh-420px)] min-h-[300px]">
      <h2 className="text-xl font-bold mb-4 text-gray-200">Recent Expenses</h2>
      {expenses.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500">No expenses added yet.</p>
        </div>
      ) : (
        <ul className="space-y-3 overflow-y-auto pr-2">
          {expenses.map(expense => (
            <ExpenseItem key={expense.id} expense={expense} deleteExpense={deleteExpense} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
