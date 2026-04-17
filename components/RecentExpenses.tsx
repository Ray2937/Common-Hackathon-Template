"use client"

import { useExpense } from "@/context/ExpenseContext"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

export function RecentExpenses() {
  const { expenses, removeExpense } = useExpense()

  return (
    <Card className="bento-card h-full flex flex-col">
      <CardHeader className="pb-4 px-0 pt-0">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Where's the money going?</CardTitle>
      </CardHeader>
      <CardContent>
        {expenses.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-8">
            No expenses logged yet. Living on air?
          </p>
        ) : (
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {expenses.slice(0, 10).map((exp) => (
              <div key={exp.id} className="flex justify-between items-center p-4 rounded-2xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 transition-colors">
                <div>
                  <p className="font-medium text-sm">{exp.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{exp.category} • {new Date(exp.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-destructive">
                    -₹{exp.amount.toFixed(2)}
                  </span>
                  <button 
                    onClick={() => removeExpense(exp.id)}
                    className="text-xs text-muted-foreground hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
