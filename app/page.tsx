import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 dark:bg-black text-foreground selection:bg-indigo-500/30 transition-colors">
      <Dashboard />
    </main>
  );
}
