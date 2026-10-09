import React from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';

export function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar projectName="Build a complete production-grade full-stack web a" />
      <main className="flex-1">
        <Dashboard goal="Build a complete production-grade full-stack web application with React/TypeScript frontend UI, Node.js Express REST API backend, SQLite/PostgreSQL schema, Dockerfile, and README. Target GitHub Repository: krishrathi1/test" leadAgent="QA Review Engineer" />
      </main>
      <footer className="border-t border-slate-800/60 py-4 text-center text-xs text-slate-500">
        Engineered autonomously by Nexus AI Multi-Agent Flow · Production Build
      </footer>
    </div>
  );
}

export default App;
