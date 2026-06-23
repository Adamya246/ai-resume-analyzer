import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Analyze() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | uploading | analyzing | done | error
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (selected) => {
    if (!selected) return;
    if (selected.type !== 'application/pdf') { setError('Please upload a PDF file.'); return; }
    if (selected.size > 5 * 1024 * 1024) { setError('File must be under 5MB.'); return; }
    setFile(selected);
    setError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setStatus('uploading');
    setError(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      setStatus('analyzing');
      const res = await fetch('/api/resume/analyze', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed.');
      navigate(`/results/${data.id}`);
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  const isLoading = status === 'uploading' || status === 'analyzing';

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-2 text-center">Upload Your Resume</h1>
        <p className="text-gray-400 text-center mb-8">PDF only · Max 5MB</p>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !isLoading && document.getElementById('file-input').click()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200
            ${dragOver ? 'border-blue-400 bg-blue-500/10' : 'border-gray-700 hover:border-gray-500 bg-gray-900'}`}
        >
          <input id="file-input" type="file" accept=".pdf" className="hidden"
            onChange={(e) => handleFile(e.target.files[0])} />

          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-blue-400 font-medium">
                {status === 'uploading' ? 'Uploading...' : 'Analyzing with AI...'}
              </p>
              <p className="text-gray-500 text-sm">This may take 15-30 seconds</p>
            </div>
          ) : file ? (
            <div className="flex flex-col items-center gap-3">
              <div className="text-4xl">📄</div>
              <p className="text-green-400 font-medium">{file.name}</p>
              <p className="text-gray-500 text-sm">{(file.size / 1024).toFixed(1)} KB · Click to change</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="text-5xl">📁</div>
              <p className="text-gray-300 font-medium">Drop your resume here</p>
              <p className="text-gray-500 text-sm">or click to browse</p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
            ⚠ {error}
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={!file || isLoading}
          className={`mt-6 w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200
            ${file && !isLoading
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Resume →'}
        </button>
      </div>
    </div>
  );
}
