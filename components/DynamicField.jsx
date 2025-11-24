import React, { useState, useEffect } from 'react';
import { Upload, X, Check, Calendar, Clock, Star, Link as LinkIcon, Plus } from 'lucide-react';

const DynamicField = ({ field, value, onChange, error }) => {
  const [tags, setTags] = useState(Array.isArray(value) ? value : []);
  const [tagInput, setTagInput] = useState('');

  // Sync tags internal state with parent value
  useEffect(() => {
    if (field.type === 'tags' && Array.isArray(value)) {
      setTags(value);
    }
  }, [value, field.type]);

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      onChange(field.id, newTags);
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    onChange(field.id, newTags);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(field.id, e.target.files[0]);
    }
  };

  const handleMultiSelectChange = (option) => {
    const current = Array.isArray(value) ? value : [];
    if (current.includes(option)) {
      onChange(field.id, current.filter(item => item !== option));
    } else {
      onChange(field.id, [...current, option]);
    }
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'number':
      case 'url':
        return (
          <div className="relative">
            <input
              type={field.type === 'phone' ? 'tel' : field.type}
              value={value || ''}
              onChange={(e) => onChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={`w-full px-4 py-3 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all ${error ? 'border-red-500' : 'border-slate-300'}`}
            />
            {field.type === 'url' && <LinkIcon size={18} className="absolute right-4 top-3.5 text-slate-400" />}
          </div>
        );

      case 'textarea':
        return (
          <textarea
            rows={5}
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={`w-full px-4 py-3 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none transition-all ${error ? 'border-red-500' : 'border-slate-300'}`}
          />
        );

      case 'dropdown':
        return (
          <div className="relative">
            <select
              value={value || ''}
              onChange={(e) => onChange(field.id, e.target.value)}
              className={`w-full px-4 py-3 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none appearance-none transition-all ${error ? 'border-red-500' : 'border-slate-300'}`}
            >
              <option value="">Select an option...</option>
              {field.options?.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="absolute right-4 top-4 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {field.options?.map(opt => (
              <label key={opt} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${value === opt ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                <input
                  type="radio"
                  name={field.id}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  className="w-5 h-5 text-brand-500 border-slate-300 focus:ring-brand-500 mr-3"
                />
                <span className="text-slate-700 font-medium">{opt}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        const selectedChecks = Array.isArray(value) ? value : [];
        const handleCheck = (opt) => {
            if (selectedChecks.includes(opt)) onChange(field.id, selectedChecks.filter(i => i !== opt));
            else onChange(field.id, [...selectedChecks, opt]);
        };
        return (
          <div className="space-y-3">
            {field.options?.map(opt => (
              <label key={opt} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedChecks.includes(opt) ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                <input
                  type="checkbox"
                  checked={selectedChecks.includes(opt)}
                  onChange={() => handleCheck(opt)}
                  className="w-5 h-5 text-brand-500 border-slate-300 rounded focus:ring-brand-500 mr-3"
                />
                <span className="text-slate-700 font-medium">{opt}</span>
              </label>
            ))}
          </div>
        );

      case 'yesno':
        return (
          <div className="flex gap-4">
            {['Yes', 'No'].map(opt => (
              <label key={opt} className={`flex-1 flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${value === opt ? 'border-brand-500 bg-brand-50 text-brand-700 font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                <input
                  type="radio"
                  name={field.id}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  className="hidden"
                />
                {opt}
              </label>
            ))}
          </div>
        );

      case 'toggle':
        return (
           <label className="flex items-center cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={!!value} onChange={(e) => onChange(field.id, e.target.checked)} />
                <div className={`block w-14 h-8 rounded-full transition-colors ${value ? 'bg-brand-500' : 'bg-slate-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${value ? 'translate-x-6' : ''}`}></div>
              </div>
              <span className="ml-3 text-slate-700 font-medium group-hover:text-brand-500 transition-colors">{value ? 'Yes' : 'No'}</span>
           </label>
        );

      case 'date':
        return (
           <div className="relative">
             <input 
               type="date"
               value={value || ''}
               onChange={(e) => onChange(field.id, e.target.value)}
               className={`w-full px-4 py-3 pl-12 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all ${error ? 'border-red-500' : 'border-slate-300'}`}
             />
             <Calendar size={20} className="absolute left-4 top-3.5 text-slate-400 pointer-events-none" />
           </div>
        );

      case 'time':
        return (
           <div className="relative">
             <input 
               type="time"
               value={value || ''}
               onChange={(e) => onChange(field.id, e.target.value)}
               className={`w-full px-4 py-3 pl-12 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all ${error ? 'border-red-500' : 'border-slate-300'}`}
             />
             <Clock size={20} className="absolute left-4 top-3.5 text-slate-400 pointer-events-none" />
           </div>
        );

      case 'range':
        return (
            <div className="px-2 py-4">
               <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-500 font-medium">{field.validation?.min || 0}</span>
                  <span className="text-brand-600 font-bold text-lg">{value ?? field.defaultValue ?? 0}</span>
                  <span className="text-sm text-slate-500 font-medium">{field.validation?.max || 100}</span>
               </div>
               <input 
                 type="range" 
                 min={field.validation?.min || 0}
                 max={field.validation?.max || 100}
                 step={1}
                 value={value ?? field.defaultValue ?? 0}
                 onChange={(e) => onChange(field.id, Number(e.target.value))}
                 className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
               />
            </div>
        );

      case 'rating':
         const maxStars = field.validation?.max || 5;
         return (
            <div className="flex gap-2">
                {Array.from({ length: maxStars }).map((_, idx) => {
                    const starValue = idx + 1;
                    return (
                        <button 
                          key={idx}
                          type="button"
                          onClick={() => onChange(field.id, starValue)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                           <Star 
                             size={32} 
                             className={`${(value || 0) >= starValue ? 'fill-brand-500 text-brand-500' : 'text-slate-300'}`} 
                           />
                        </button>
                    );
                })}
            </div>
         );

      case 'tags':
        return (
            <div className={`w-full px-4 py-3 bg-slate-50 border rounded-lg focus-within:ring-2 focus-within:ring-brand-500 transition-all ${error ? 'border-red-500' : 'border-slate-300'}`}>
                <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, idx) => (
                        <span key={idx} className="bg-brand-100 text-brand-700 px-2 py-1 rounded-md text-sm font-medium flex items-center gap-1">
                            {tag}
                            <button type="button" onClick={() => removeTag(idx)} className="hover:text-brand-900"><X size={14}/></button>
                        </span>
                    ))}
                </div>
                <input 
                  type="text" 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={tags.length === 0 ? (field.placeholder || "Type and press Enter") : ""}
                  className="bg-transparent outline-none w-full text-slate-900 placeholder:text-slate-400"
                />
            </div>
        );

      case 'multi-select':
         const selectedMulti = Array.isArray(value) ? value : [];
         return (
             <div className="flex flex-wrap gap-3">
                 {field.options?.map(opt => (
                     <button
                        key={opt}
                        type="button"
                        onClick={() => handleMultiSelectChange(opt)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2 ${selectedMulti.includes(opt) ? 'bg-brand-500 text-white border-brand-500 shadow-md' : 'bg-white text-slate-600 border-slate-300 hover:border-brand-500'}`}
                     >
                        {selectedMulti.includes(opt) ? <Check size={14}/> : <Plus size={14}/>} {opt}
                     </button>
                 ))}
             </div>
         );

      case 'file':
        return (
          <div className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all ${error ? 'border-red-500 bg-red-50' : 'border-slate-300 hover:border-brand-500 hover:bg-brand-50'}`}>
            <input
              type="file"
              id={field.id}
              className="hidden"
              accept={field.validation?.allowedFormats?.join(',')}
              onChange={handleFileChange}
            />
            {value ? (
              <div className="flex items-center gap-3 text-brand-600 w-full justify-between p-2 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-3 truncate">
                    <div className="p-2 bg-brand-100 rounded"><Upload size={18} /></div>
                    <div className="text-left truncate">
                        <p className="font-bold text-sm truncate max-w-[150px] md:max-w-xs">{value.name}</p>
                        <p className="text-xs opacity-70">{(value.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                </div>
                <button
                  type="button"
                  onClick={() => onChange(field.id, null)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <label htmlFor={field.id} className="cursor-pointer text-center w-full h-full flex flex-col items-center py-2">
                <Upload className="h-10 w-10 text-slate-400 mb-3" />
                <p className="text-slate-700 font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500 mt-1">{field.helpText || `Max ${field.validation?.maxSizeMB || 5}MB`}</p>
              </label>
            )}
          </div>
        );

      default:
        return <p className="text-red-500">Unsupported field type: {field.type}</p>;
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-bold text-slate-700 mb-2">
        {field.label} {field.required && <span className="text-brand-500">*</span>}
      </label>
      {renderField()}
      {error && <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium animate-in slide-in-from-top-1"><X size={12}/> {error}</p>}
    </div>
  );
};

export default DynamicField;