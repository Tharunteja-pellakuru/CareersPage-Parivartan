import React, { useState } from 'react';
import { X, Upload, Send } from 'lucide-react';

const ApplicationModal = ({ isOpen, onClose, positionTitle }) => {
  if (!isOpen) return null;

  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application Submitted! (This is a demo)");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/75 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-brand-500 font-semibold mb-1">
               <Send size={18} />
               <span>Apply for Position</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {positionTitle || "General Application"}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Readonly Position Input */}
          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Position</label>
             <input 
                type="text" 
                value={positionTitle || "General Application"} 
                readOnly 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-500 cursor-not-allowed"
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                <input required type="text" className="w-full px-4 py-2 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                <input required type="text" className="w-full px-4 py-2 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" />
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
            <input required type="email" className="w-full px-4 py-2 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
            <input required type="tel" className="w-full px-4 py-2 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience</label>
             <select className="w-full px-4 py-2 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all">
                <option>Select...</option>
                <option>Less than 1 year</option>
                <option>1-3 years</option>
                <option>3-5 years</option>
                <option>5+ years</option>
             </select>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Portfolio/LinkedIn URL</label>
             <input type="url" className="w-full px-4 py-2 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Resume/CV (PDF or DOC) *</label>
            <div className="relative">
                <input 
                  type="file" 
                  required 
                  className="hidden" 
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <label 
                  htmlFor="resume-upload" 
                  className="flex items-center w-full px-4 py-2 bg-white border border-slate-300 rounded-md cursor-pointer hover:bg-slate-50 transition-colors"
                >
                   <div className="px-3 py-1 bg-slate-200 rounded text-xs font-medium mr-3 text-slate-700">Choose File</div>
                   <span className="text-sm text-slate-500">{fileName || "No file chosen"}</span>
                </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Why do you want to join eParivartan? *</label>
            <textarea required rows={4} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none"></textarea>
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
               <Send size={18} />
               Submit Application
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;