"use client"

import { useState } from "react"
import { useExpense, ExpenseCategory } from "@/context/ExpenseContext"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function ExpenseForm() {
  const { addExpense } = useExpense()
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState<ExpenseCategory>("Food")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !amount) return
    
    addExpense({
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString()
    })

    setTitle("")
    setAmount("")
  }

  return (
    <Card className="bento-card relative">
      <CardHeader className="pb-4 pt-0 px-0">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Log an Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">What did you buy?</Label>
            <Input 
              id="title" 
              placeholder="e.g., Spicy Ramen" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 rounded-xl bg-slate-100 dark:bg-slate-900 border-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input 
                id="amount" 
                type="number" 
                min="0" 
                step="0.01"
                placeholder="Enter" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 rounded-xl bg-slate-100 dark:bg-slate-900 border-none"
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as ExpenseCategory)}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food 🍔</SelectItem>
                  <SelectItem value="Transport">Transport 🚌</SelectItem>
                  <SelectItem value="Academic">Academic 📚</SelectItem>
                  <SelectItem value="Fun">Fun 🎉</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md transition-colors">
            Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
