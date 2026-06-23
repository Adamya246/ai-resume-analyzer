import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">

      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-8 py-4 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-sm">
        <span className="font-bold text-white">AI Resume Analyzer</span>
        <button
          onClick={() => navigate('/history')}
          className="text-sm text-gray-400 hover:text-white transition"
        >
          History →
        </button>
      </div>

      {/* Badge */}
      <div className="mb-6 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
        Powered by AI
      </div>

      {/* Heading */}
      <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        AI Resume Analyzer
      </h1>

      <p className="text-gray-400 text-center text-lg max-w-xl mb-10 leading-relaxed">
        Upload your resume and get instant AI-powered feedback — skills analysis,
        resume score, career recommendations, and interview questions.
      </p>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {['Skill Analysis', 'Resume Score', 'Career Recommendations', 'Interview Questions', 'Improvement Tips'].map(f => (
          <span key={f} className="px-4 py-1.5 bg-gray-800 border border-gray-700 rounded-full text-gray-300 text-sm">
            ✦ {f}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/analyze')}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-lg transition-all duration-200 shadow-lg shadow-blue-500/20"
        >
          Upload Resume →
        </button>
        <button
          onClick={() => navigate('/history')}
          className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl text-lg transition-all duration-200"
        >
          View History
        </button>
      </div>

      <p className="mt-4 text-gray-600 text-sm">PDF only · Max 5MB · Free to use</p>
    </div>
  );
}
