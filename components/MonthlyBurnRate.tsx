"use client"

import { useExpense } from "@/context/ExpenseContext"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { useEffect, useState } from "react"

export function MonthlyBurnRate() {
  const { totalSpent, spendableBudget, monthlyAllowance, fixedBills, now } = useExpense()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Date Math
  const currentDay = now.getDate()
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  
  // Burn Rates
  const expectedBurnPercent = (currentDay / daysInMonth) * 100
  const actualBurnPercent = spendableBudget > 0 ? (totalSpent / spendableBudget) * 100 : 0
  
  // Discrepancy (if actual is way higher than expected, it's bad)
  const diff = actualBurnPercent - expectedBurnPercent
  
  let statusColor = "bg-brand-green"
  let feedbackText = "You're doing great! Keep it up."
  
  if (diff > 25) {
    statusColor = "bg-brand-red"
    feedbackText = "Whoa, slow down tiger. You're burning through cash too fast."
  } else if (diff > 10) {
    statusColor = "bg-brand-orange"
    feedbackText = "Careful now, you're spending a bit faster than you should."
  } else if (diff < -10) {
    statusColor = "bg-brand-blue"
    feedbackText = "Super saver mode! You're spending less than expected."
  }

  return (
    <Card className="bento-card h-full flex flex-col justify-center">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm tracking-wide uppercase text-slate-500 dark:text-slate-400">Monthly Burn Rate</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Human Feedback Bubble */}
        <div className={`p-4 rounded-2xl border bg-slate-100 dark:bg-slate-700 ${statusColor.replace('bg-', 'border-')} animate-in slide-in-from-top-2`}>
          <p className="text-sm font-medium tracking-wide flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${statusColor} animate-pulse`}></span>
            {feedbackText}
          </p>
        </div>

        {/* Visualization */}
        <div className="space-y-6 pt-2">
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span>Time Passed (Day {currentDay}/{daysInMonth})</span>
              <span>{Math.round(expectedBurnPercent)}%</span>
            </div>
            <Progress 
              value={expectedBurnPercent} 
              indicatorColor="bg-slate-300 dark:bg-slate-600"
              className="h-3 bg-slate-100 dark:bg-slate-900 border-none" 
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span>Budget Spent</span>
              <span>{Math.round(actualBurnPercent)}%</span>
            </div>
            <Progress 
              value={actualBurnPercent} 
              indicatorColor={statusColor}
              className="h-3 bg-slate-100 dark:bg-slate-900 border-none" 
            />
          </div>

        </div>

        {/* Reduced Breakdown (Since it's in a separate cell now) */}

      </CardContent>
    </Card>
  )
}
