"use client"

import { useState } from "react"
import { useExpense } from "@/context/ExpenseContext"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function AffordabilityTool() {
  const { remainingBalance, averageDailySpend, daysUntilBroke } = useExpense()
  const [price, setPrice] = useState("")
  const [result, setResult] = useState<{ afford: boolean, newDays: number, diffDays: number } | null>(null)

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault()
    if (!price) return

    const cost = parseFloat(price)
    const newRemaining = remainingBalance - cost

    if (newRemaining < 0) {
      setResult({ afford: false, newDays: 0, diffDays: daysUntilBroke })
      return
    }

    const newDays = averageDailySpend > 0 
      ? Math.max(0, Math.floor(newRemaining / averageDailySpend))
      : 999;
    
    setResult({
      afford: true,
      newDays,
      diffDays: daysUntilBroke - newDays
    })
  }

  return (
    <Card className="bento-card relative overflow-hidden h-full flex flex-col justify-center">
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-brand-pink/5 rounded-full blur-3xl pointer-events-none"></div>
      <CardHeader className="pb-4">
        <CardTitle className="text-sm tracking-wide uppercase text-slate-500 dark:text-slate-400 flex items-center gap-2">Can I Afford It? 🤔</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCheck} className="flex gap-3 items-center mb-6">
          <Input 
            type="number" 
            placeholder="Item price (₹)" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="1"
            className="rounded-2xl h-12 bg-slate-100 dark:bg-slate-900 border-none"
          />
          <Button type="submit" className="h-12 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors font-semibold shadow-md">
            Check
          </Button>
        </form>

        {result && (
          <div className={`p-5 rounded-2xl animate-in fade-in zoom-in duration-300 ${result.afford ? 'bg-brand-green/10 border border-brand-green/20' : 'bg-brand-red/10 border border-brand-red/20'}`}>
            {result.afford ? (
              <div className="space-y-1">
                <p className="font-bold text-brand-green text-lg tracking-tight">Yes, but...</p>
                <p className="text-sm text-foreground/90">It costs you <strong className="text-brand-green">—{result.diffDays} days</strong> of survival.</p>
                <div className="h-px w-full bg-brand-green/20 my-3"></div>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-80">New runway: {result.newDays} days</p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="font-bold text-brand-red text-lg tracking-tight">Hard No! 🛑</p>
                <p className="text-sm text-foreground/90">This immediately puts you in the red. Step away from the cart.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
