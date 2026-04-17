"use client"

import { useExpense } from "@/context/ExpenseContext"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { useEffect, useState } from "react"

export function BrokeMeter() {
  const { brokeLevel, remainingBalance, spendableBudget } = useExpense()
  const [percent, setPercent] = useState(0)
  
  const levels = {
    "Living Large": { color: "bg-brand-green", pct: 15 },
    "Comfortable": { color: "bg-brand-blue", pct: 35 },
    "Getting Tight": { color: "bg-brand-orange", pct: 70 },
    "Noodle Mode": { color: "bg-brand-red", pct: 90 },
  }

  useEffect(() => {
    const t = setTimeout(() => {
      setPercent(levels[brokeLevel].pct)
    }, 100)
    return () => clearTimeout(t)
  }, [brokeLevel])

  const maxPossible = spendableBudget > 0 ? spendableBudget : 1;

  return (
    <Card className="bento-card h-full flex flex-col justify-center">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm tracking-wide uppercase text-slate-500 dark:text-slate-400">Survival Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col mb-4">
          <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Status: {brokeLevel}</span>
        </div>
        <Progress 
          value={percent} 
          indicatorColor="bg-red-500"
          className="h-4 my-6 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" 
        />
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex justify-between">
          <span>Thriving</span>
          <span>Danger Zone</span>
        </div>
      </CardContent>
    </Card>
  )
}
