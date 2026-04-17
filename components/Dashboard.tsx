"use client";

import { useExpense } from "@/context/ExpenseContext";
import { BrokeCountdown } from "./BrokeCountdown";
import { BrokeMeter } from "./BrokeMeter";
import { ExpenseForm } from "./ExpenseForm";
import { RecentExpenses } from "./RecentExpenses";
import { AffordabilityTool } from "./AffordabilityTool";
import { BalanceSetup } from "./BalanceSetup";
import { MonthlyBurnRate } from "./MonthlyBurnRate";
import { MonthlyOverview } from "./MonthlyOverview";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function Dashboard() {
  const { isReady, monthlyAllowance, totalSpent, spendableBudget, setMonthlyAllowance, setFixedBills } = useExpense();

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Calculating survival parameters...</p>
        </div>
      </div>
    );
  }

  // The starting page requires at least a Monthly Allowance to un-block
  if (monthlyAllowance <= 0) {
    return <BalanceSetup />;
  }

  // Dynamic Header Feedback Logic
  const actualBurn = spendableBudget > 0 ? (totalSpent / spendableBudget) * 100 : 0;
  let headerFeedback = "Surviving one day at a time. Keep it steady.";
  if (actualBurn > 80) headerFeedback = "Dangerously close to zero. Lock your wallet!";
  else if (actualBurn > 50) headerFeedback = "Halfway through the pain. Stay vigilant.";
  else if (actualBurn === 0) headerFeedback = "Fresh slate. Let's make smart choices!";

  return (
    <div className="max-w-[1400px] mx-auto p-4 sm:p-8 lg:p-12 space-y-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
            BrokeMeter
          </h1>
          <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            {headerFeedback}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            onClick={() => { setMonthlyAllowance(0); setFixedBills(0); }}
          >
            Reset Setup
          </Button>
        </div>
      </header>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Macro Block (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Days Until Broke (Hero) 2x2 style */}
          <div className="h-full">
            <BrokeCountdown />
          </div>
          
          {/* BrokeMeter Status 1x2 Horizontal bar */}
          <div>
            <BrokeMeter />
          </div>

          {/* Bottom Data Row: Utils & Burn Hook */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AffordabilityTool />
            <MonthlyBurnRate />
          </div>
        </div>

        {/* Right Vertical Block (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Monthly Budget Setup / Readout */}
          <div className="min-h-[200px]">
            <MonthlyOverview />
          </div>
          
          {/* Expense Logging form */}
          <div>
            <ExpenseForm />
          </div>
          
          {/* Recent history history slice */}
          <div className="flex-1 min-h-[300px]">
            <RecentExpenses />
          </div>
        </div>

      </div>
    </div>
  );
}
