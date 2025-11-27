"use client";
import { Workflow } from 'lucide-react';

interface HomeCardProps {
  title: string;
  description: string;
  author: string;
}

export default function HomeCard({ title, description, author }: HomeCardProps) {
  return (
    <div className="bg-gray-300 rounded-2xl p-6 shadow hover:shadow-md transition-shadow cursor-pointer relative">
      <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center mb-4">
        <Workflow className="w-6 h-6 text-black" />
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>

      <p className="text-xs text-gray-600 mt-6">
        {author}
      </p>
    </div>
  );
}