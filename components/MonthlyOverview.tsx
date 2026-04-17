"use client"

import { useState } from "react"
import { useExpense } from "@/context/ExpenseContext"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"

export function MonthlyOverview() {
  const { monthlyAllowance, fixedBills, setMonthlyAllowance, setFixedBills } = useExpense()
  
  const [editMode, setEditMode] = useState(false)
  const [valAllowance, setValAllowance] = useState(monthlyAllowance.toString())
  const [valBills, setValBills] = useState(fixedBills.toString())

  const handleSave = () => {
    setMonthlyAllowance(parseFloat(valAllowance) || 0)
    setFixedBills(parseFloat(valBills) || 0)
    setEditMode(false)
  }

  return (
    <Card className="bento-card h-full flex flex-col justify-center relative group">
      <CardContent className="p-0">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Monthly Budgeting</h3>
           {!editMode && (
             <Button variant="ghost" size="sm" onClick={() => setEditMode(true)} className="h-8 text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
               Edit
             </Button>
           )}
        </div>

        {editMode ? (
          <div className="space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="space-y-1">
              <Label className="text-xs">Gross Allowance</Label>
              <Input 
                value={valAllowance} 
                onChange={e => setValAllowance(e.target.value)} 
                type="number"
                className="rounded-xl h-10 bg-slate-100 dark:bg-slate-900 border-none"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Fixed Bills</Label>
              <Input 
                value={valBills} 
                onChange={e => setValBills(e.target.value)} 
                type="number"
                className="rounded-xl h-10 bg-slate-100 dark:bg-slate-900 border-none"
              />
            </div>
            <div className="flex gap-2 justify-end mt-2">
              <Button size="sm" variant="outline" onClick={() => setEditMode(false)} className="rounded-lg h-8">Cancel</Button>
              <Button size="sm" onClick={handleSave} className="rounded-lg h-8 border-brand-blue bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white">Save</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Gross Allowance</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white">₹{monthlyAllowance.toFixed(0)}</p>
            </div>
            <div className="h-px bg-slate-200 dark:bg-slate-800 w-full" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Fixed Bills</p>
              <p className="text-3xl font-black text-brand-orange">-₹{fixedBills.toFixed(0)}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
