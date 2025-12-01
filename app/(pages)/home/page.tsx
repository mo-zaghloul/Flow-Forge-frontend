"use client";
import HomeCard from '@/components/HomeCard';
import { Plus } from 'lucide-react';
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200 p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <HomeCard 
          title="Data Enrichment"
          description="Pull together data to answer user questions"
          author="Archive"
        />
        
        <HomeCard 
          title="Planning helper"
          description="Simple multi-turn workflow for creating work plans"
          author="Archive"
        />
        
        <HomeCard 
          title="Documents comparison"
          description="Analyze and highlight differences across uploaded documents"
          author="Archive"
        />
        
        <HomeCard 
          title="Internal knowledge assistant"
          description="Triage and answer questions from employees"
          author="Created by you"
        />
        
        <HomeCard 
          title="Structured Data Q/A"
          description="Query databases using natural language"
          author="Created by you"
        />
        
        <HomeCard 
          title="Customer service"
          description="Resolve customer queries with correct policies"
          author="Created by you"
        />
      </div>

      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Create a workflow</h2>
        <p className="text-gray-700 mb-6 text-base">
          Build a chat agent workflow with custom logic and tools
        </p>
        <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors inline-flex items-center gap-2 font-medium">
          <span><Plus/> </span>
          <span>Create</span>
        </button>
      </div>
    </div>
  );
}