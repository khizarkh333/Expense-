
import React, { useState, useEffect, useCallback } from 'react';
import { Expense } from './types';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    try {
      const storedExpenses = localStorage.getItem('expenses');
      if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error("Failed to load expenses from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error("Failed to save expenses to localStorage:", error);
    }
  }, [expenses]);

  const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    setExpenses(prevExpenses => [
      { ...expense, id: Date.now().toString() },
      ...prevExpenses
    ]);
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-8">
            <ExpenseForm addExpense={addExpense} />
            <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
          </div>
          <div className="lg:col-span-2">
            <Dashboard expenses={expenses} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
