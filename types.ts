
import React from 'react';

export interface Job {
    id: string;
    title: string;
    category: 'Design' | 'Development' | 'Marketing';
    location: string;
    experience: string;
    type: string;
    description: string;
    tags: string[];
    aboutRole?: string;
    responsibilities?: string[];
    skills?: string[];
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface TimelineItem {
    year: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
}

// --- Dynamic Form Schema Types ---

export type FieldType = 
  | 'text' | 'number' | 'email' | 'phone' | 'textarea' 
  | 'dropdown' | 'radio' | 'checkbox' | 'yesno' 
  | 'date' | 'file' | 'multi-select' | 'range' 
  | 'rating' | 'toggle' | 'time' | 'url' | 'tags';

export interface FieldValidation {
  regex?: string;
  min?: number;
  max?: number; // For numbers or range
  minLength?: number;
  maxLength?: number;
  allowedFormats?: string[]; // For files (e.g., .pdf)
  maxSizeMB?: number; // For files
  message?: string; // Custom error message
}

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // For dropdown, radio, checkbox, multi-select
  validation?: FieldValidation;
  defaultValue?: any;
  helpText?: string;
}

export interface FormStep {
  step: number;
  title: string;
  description?: string;
  fields: FormField[];
}

export interface JobApplicationSchema {
  jobId: string | 'default'; // specific job ID or fallback
  steps: FormStep[];
}
