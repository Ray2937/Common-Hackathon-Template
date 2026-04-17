"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type ExpenseCategory = "Food" | "Transport" | "Academic" | "Fun";

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  title: string;
}

interface ExpenseContextType {
  monthlyAllowance: number;
  setMonthlyAllowance: (val: number) => void;
  fixedBills: number;
  setFixedBills: (val: number) => void;
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  removeExpense: (id: string) => void;
  totalSpent: number;
  spendableBudget: number;
  remainingBalance: number;
  averageDailySpend: number;
  daysUntilBroke: number;
  brokeLevel: "Living Large" | "Comfortable" | "Getting Tight" | "Noodle Mode";
  isReady: boolean;
  now: Date;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [monthlyAllowance, setMonthlyAllowance, isClientAllowance] = useLocalStorage<number>("brokemeter_allowance", 0);
  const [fixedBills, setFixedBills, isClientBills] = useLocalStorage<number>("brokemeter_bills", 0);
  const [expenses, setExpenses, isClientExpenses] = useLocalStorage<Expense[]>("brokemeter_expenses", []);
  const [isReady, setIsReady] = useState(false);

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (isClientAllowance && isClientBills && isClientExpenses) {
      setIsReady(true);
    }
  }, [isClientAllowance, isClientBills, isClientExpenses]);

  // Keep 'now' relatively fresh for burn rate and longevity
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // All-time aggregate (for history/stats)
  const totalSpentAllTime = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Current Month derived state (The heart of BrokeMeter survival)
  const currentMonthExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
  });
  
  const totalSpent = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const spendableBudget = Math.max(0, monthlyAllowance - fixedBills);
  const remainingBalance = spendableBudget - totalSpent;
  
  // Calculate Avg Daily Spend (Current Month only)
  const calculateAverageDailySpend = () => {
    if (currentMonthExpenses.length === 0) return 0;
    
    // Calculate days passed in current month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const msDiff = now.getTime() - startOfMonth.getTime();
    const daysPassed = Math.max(1, Math.ceil(msDiff / (1000 * 3600 * 24)));
    
    return Number((totalSpent / daysPassed).toFixed(2));
  };
  
  const averageDailySpend = calculateAverageDailySpend();
  
  // Predict Days Until Broke
  const daysUntilBroke = averageDailySpend > 0 
    ? Math.max(0, Math.floor(remainingBalance / averageDailySpend))
    : remainingBalance > 0 ? 999 : 0; 

  // Broke Level Logic based on daily budget pacing
  let brokeLevel: "Living Large" | "Comfortable" | "Getting Tight" | "Noodle Mode" = "Noodle Mode";
  
  // How many days actually REMAIN in this month?
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysRemaining = Math.max(1, daysInMonth - now.getDate());
  
  // Real Daily Pacing: Balance divided by days left
  const dailyPacing = remainingBalance / daysRemaining;

  if (dailyPacing > 500) {
    brokeLevel = "Living Large";
  } else if (dailyPacing > 250) {
    brokeLevel = "Comfortable";
  } else if (dailyPacing > 100) {
    brokeLevel = "Getting Tight";
  } else {
    brokeLevel = "Noodle Mode";
  }

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = { ...expense, id: crypto.randomUUID() };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <ExpenseContext.Provider
      value={{
        monthlyAllowance,
        setMonthlyAllowance,
        fixedBills,
        setFixedBills,
        expenses,
        addExpense,
        removeExpense,
        totalSpent,
        spendableBudget,
        remainingBalance,
        averageDailySpend,
        daysUntilBroke,
        brokeLevel,
        isReady,
        now
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
}
