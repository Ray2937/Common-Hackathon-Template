"use client"

import { useExpense } from "@/context/ExpenseContext"
import { Card, CardContent } from "./ui/card"

export function BrokeCountdown() {
  const { daysUntilBroke, averageDailySpend, remainingBalance } = useExpense()
  
  return (
    <Card className="bento-hero overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <CardContent className="p-8 flex flex-col items-center text-center">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-slate-50 mb-4 transition-colors">Days Until Broke</h2>
        <div className="text-6xl lg:text-8xl font-black text-indigo-600 dark:text-indigo-400 mb-6 p-2 rounded-xl">
          {(daysUntilBroke === 999 || isNaN(daysUntilBroke) || !isFinite(daysUntilBroke)) ? "Enter Expenses" : daysUntilBroke}
        </div>
        
        <div className="flex w-full justify-between mt-4 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Spendable Balance</p>
            <p className="text-2xl font-bold tracking-tight">₹{remainingBalance.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Avg Daily Spend</p>
            <p className="text-2xl font-bold tracking-tight">₹{averageDailySpend.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
