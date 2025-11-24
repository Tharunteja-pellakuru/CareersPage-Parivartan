// This file simulates the JSON response you would get from GET /api/schema/:jobId

export const defaultSchema = {
  jobId: 'default',
  steps: [
    {
      step: 1,
      title: "Personal Details",
      fields: [
        { id: "fullName", label: "Full Name", type: "text", required: true, placeholder: "John Doe" },
        { id: "email", label: "Email Address", type: "email", required: true, placeholder: "john@example.com" },
        { id: "phone", label: "Phone Number", type: "phone", required: true, placeholder: "+91 98765 43210" },
        { id: "resume", label: "Resume/CV", type: "file", required: true, validation: { allowedFormats: ['.pdf'], maxSizeMB: 5 }, helpText: "PDF only, Max 5MB" }
      ]
    },
    {
      step: 2,
      title: "Experience",
      fields: [
        { id: "experienceYears", label: "Years of Experience", type: "range", validation: { min: 0, max: 20 }, defaultValue: 0 },
        { id: "currentCtc", label: "Current CTC", type: "text", required: true },
        { id: "expectedCtc", label: "Expected CTC", type: "text", required: true }
      ]
    },
    {
      step: 3,
      title: "Review",
      fields: [] // The review step is handled dynamically by the renderer
    }
  ]
};

export const performanceMarketingSchema = {
  jobId: 'performance-marketing-manager',
  steps: [
    {
      step: 1,
      title: "Contact Info",
      fields: [
        { id: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Enter your full name" },
        { id: "email", label: "Email", type: "email", required: true, placeholder: "name@company.com" },
        { id: "phone", label: "Phone", type: "phone", required: true, placeholder: "+91..." },
        { id: "linkedin", label: "LinkedIn Profile", type: "url", required: true, placeholder: "https://linkedin.com/in/..." },
        { id: "resume", label: "Upload Resume", type: "file", required: true, validation: { allowedFormats: ['.pdf'], maxSizeMB: 5 } }
      ]
    },
    {
      step: 2,
      title: "Expertise",
      fields: [
        { id: "platforms", label: "Ad Platforms Managed", type: "multi-select", options: ["Meta Ads", "Google Ads", "LinkedIn Ads", "Twitter Ads", "TikTok Ads"], required: true },
        { id: "budgetManaged", label: "Highest Monthly Budget Managed", type: "dropdown", options: ["< ₹1 Lakh", "₹1L - ₹5L", "₹5L - ₹20L", "₹20L+"], required: true },
        { id: "experienceYears", label: "Total Experience (Years)", type: "range", validation: { min: 0, max: 15 }, defaultValue: 2 },
        { id: "skills", label: "Add Your Top Skills", type: "tags", placeholder: "Type and press Enter...", required: true }
      ]
    },
    {
      step: 3,
      title: "Screening",
      fields: [
        { id: "relocate", label: "Are you willing to relocate to Hyderabad?", type: "yesno", required: true },
        { id: "startDate", label: "Earliest Start Date", type: "date", required: true },
        { id: "workMode", label: "Preferred Work Mode", type: "radio", options: ["In-Office", "Hybrid", "Remote"], required: true },
        { id: "whyHire", label: "Why are you a good fit?", type: "textarea", required: true, placeholder: "Tell us about your biggest win..." }
      ]
    }
  ]
};

export const developerSchema = {
  jobId: 'mobile-app-developer',
  steps: [
    {
      step: 1,
      title: "Personal Info",
      fields: [
        { id: "fullName", label: "Full Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "github", label: "GitHub URL", type: "url", required: true },
        { id: "portfolio", label: "Portfolio URL", type: "url" },
        { id: "resume", label: "Upload Resume", type: "file", required: true, validation: { allowedFormats: ['.pdf', '.docx'], maxSizeMB: 5 } }
      ]
    },
    {
      step: 2,
      title: "Tech Stack",
      fields: [
        { id: "techStack", label: "Primary Tech Stack", type: "checkbox", options: ["React Native", "Flutter", "Swift (iOS)", "Kotlin (Android)"], required: true },
        { id: "experience", label: "Years of Experience", type: "number", required: true, validation: { min: 0, max: 30 } },
        { id: "rating", label: "Rate your proficiency in React Native", type: "rating", validation: { max: 5 } },
        { id: "hasLaptop", label: "Do you have your own MacBook?", type: "toggle", required: false }
      ]
    },
    {
      step: 3,
      title: "Logistics",
      fields: [
        { id: "interviewTime", label: "Preferred Interview Time", type: "time", required: true },
        { id: "noticePeriod", label: "Notice Period", type: "dropdown", options: ["Immediate", "15 Days", "30 Days", "60 Days"], required: true },
        { id: "expectedCtc", label: "Expected CTC (LPA)", type: "text", required: true }
      ]
    }
  ]
};

// Helper to get schema by ID
export const getSchemaForJob = (jobId) => {
  if (jobId === 'performance-marketing-manager') return performanceMarketingSchema;
  if (jobId === 'mobile-app-developer') return developerSchema;
  return defaultSchema;
};