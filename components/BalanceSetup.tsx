"use client"

import { useState } from "react"
import { useExpense } from "@/context/ExpenseContext"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function BalanceSetup() {
  const { setMonthlyAllowance } = useExpense()
  const [allowance, setAllowance] = useState("")

  const handleSave = () => {
    if (allowance) {
      setMonthlyAllowance(parseFloat(allowance) || 0)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
      <Card className="w-full max-w-md bento-card animate-float shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold tracking-tight">Welcome to BrokeMeter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground text-sm">
            Let's plan your month. What is your total monthly allowance before bills?
          </p>
          
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-1">Total Monthly Allowance</label>
            <Input 
              type="number" 
              placeholder="e.g. 50000" 
              className="text-lg h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 border-none focus-visible:ring-brand-pink/50 text-center"
              value={allowance}
              onChange={(e) => setAllowance(e.target.value)}
            />
          </div>

          <Button onClick={handleSave} className="w-full h-14 text-lg rounded-2xl mt-4 font-bold tracking-wide bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all">
            Start Surviving
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
