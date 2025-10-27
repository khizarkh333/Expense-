
export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Housing',
  'Bills',
  'Entertainment',
  'Health',
  'Shopping',
  'Other',
];
