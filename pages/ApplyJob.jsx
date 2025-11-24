import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { jobs } from "../data/jobs"; // Assuming this exists
import DynamicField from "../components/DynamicField";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Save,
  Edit2,
  ArrowLeft,
  FileText,
  Loader2,
} from "lucide-react";
import { useJobs } from "../context/JobProvider";


const ApplyJob = () => {
  const { jobsList } = useJobs();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const topRef = useRef(null);

  // Schema & Job Data
  const [schema, setSchema] = useState(null); // Now holds the transformed "steps" structure
  const [job, setJob] = useState(null);

  // Form State
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- 2. Data Loading & Transformation ---
  useEffect(() => {
    if (!jobsList.length) return;
    
    const foundJob = jobsList.find(
      (j) => j.id === parseInt(jobId) || j.id === jobId
    );
    
    if (!foundJob) {
      // Handle job not found?
      return;
    }
    
    setJob(foundJob);

    console.log(foundJob);

    // Use real data from job object
    const rawData = {
      basicFormSchema: foundJob.basicFormSchema || [],
      schema: foundJob.applicationFormSchema?.Questions || [],
      steps: foundJob.applicationFormSchema?.steps || [],
    };

    // TRANSFORM RAW DATA INTO STEPS
    const steps = [];

    // Step 1: Always Personal Information (from basicFormSchema)
    steps.push({
      step: 1,
      title: "Personal Information",
      fields: rawData.basicFormSchema,
    });

    // Step 2+: Group Custom Questions by their 'stepId'
    const groupedQuestions = rawData.schema.reduce((acc, field) => {
      const sId = field.stepId || "step-default";
      if (!acc[sId]) acc[sId] = [];
      acc[sId].push(field);
      return acc;
    }, {});

    // Convert groups to steps
    // Use defined steps from DB if available to maintain order/titles
    if (rawData.steps.length > 0) {
      rawData.steps.forEach((s, index) => {
        if (groupedQuestions[s.id]) {
          steps.push({
            step: index + 2,
            title: s.title,
            fields: groupedQuestions[s.id],
          });
        }
      });
    } else {
      // Fallback if no steps defined but schema exists
      Object.keys(groupedQuestions).forEach((stepId, index) => {
        steps.push({
          step: index + 2,
          title: "Additional Questions",
          fields: groupedQuestions[stepId],
        });
      });
    }

    const transformedSchema = { steps };

    // Initialize default values
    const defaults = {};
    [...rawData.basicFormSchema, ...rawData.schema].forEach((field) => {
      if (field.defaultValue !== undefined)
        defaults[field.id] = field.defaultValue;
    });

    setSchema(transformedSchema);
    setFormData((prev) => ({ ...defaults, ...prev }));
  }, [jobId, jobsList]);

  // Scroll to top on step change
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [currentStep]);

  // --- 3. Validation Engine ---
  const validateField = (field, value) => {
    if (field.required) {
      if (value === null || value === undefined || value === "")
        return "This field is required";
      if (Array.isArray(value) && value.length === 0)
        return "Please select at least one option";
      if (field.type === "file" && !value) return "Please upload a file";
    }

    if (value) {
      if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Invalid email address";
      }
      if (
        field.type === "url" &&
        !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
          value
        )
      ) {
        return "Invalid URL (e.g., https://linkedin.com)";
      }
      if (field.type === "number" && isNaN(value)) {
        return "Must be a number";
      }
    }
    return null;
  };

  const validateStep = (stepIndex) => {
    if (!schema) return false;
    const currentStepFields = schema.steps[stepIndex].fields;
    const newErrors = {};
    let isValid = true;

    currentStepFields.forEach((field) => {
      const error = validateField(field, formData[field.id]);
      if (error) {
        newErrors[field.id] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // --- 4. Handlers ---
  const handleFieldChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[id];
        return newErr;
      });
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep - 1)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      console.log("=== FORM SUBMISSION DEBUG ===");
      console.log("Current formData:", formData);
      console.log("Schema:", schema);
      
      const formDataToSend = new FormData();
      formDataToSend.append("job_id", jobId);
      
      // Get the basic fields from step 1
      const basicFields = schema.steps[0]?.fields || [];
      console.log("Basic fields from schema:", basicFields);
      
      // Find fields by their properties rather than hardcoded IDs
      const findFieldValue = (type, label) => {
        const field = basicFields.find(f => 
          f.type === type || 
          f.label?.toLowerCase().includes(label.toLowerCase())
        );
        console.log(`Looking for ${type}/${label}, found field:`, field);
        return field ? formData[field.id] : "";
      };
      
      // Map basic fields to backend columns
      const fullName = findFieldValue("text", "name") || formData["basic-fullname"] || "";
      const email = findFieldValue("email", "email") || formData["basic-email"] || "";
      const phone = findFieldValue("tel", "phone") || formData["basic-phone"] || "";
      
      console.log("Extracted values:", { fullName, email, phone });
      
      formDataToSend.append("full_name", fullName);
      formDataToSend.append("email", email);
      formDataToSend.append("phone", phone);

      // Attach Resume - look for file type field
      const resumeField = basicFields.find(f => f.type === "file");
      const resumeFile = resumeField ? formData[resumeField.id] : formData["basic-resume"];
      console.log("Resume file:", resumeFile);
      
      if (resumeFile instanceof File) {
        formDataToSend.append("resume", resumeFile);
      }

      // Snapshot of schema and answers
      formDataToSend.append("fields_json", JSON.stringify(formData));
      formDataToSend.append("steps_json", JSON.stringify(schema));
      
      // Log what we're sending
      console.log("FormData entries:");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
      }

      const response = await fetch("https://adminbackend-production-d381.up.railway.app/applicants", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("Submission Error:", err);
      alert(err.message || "Failed to submit application. Please try again.");
      setIsSubmitting(false);
    }
  };

  // --- 5. Renders ---

  if (!job || !schema) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 gap-2">
        <Loader2 className="animate-spin" /> Loading application...
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-100 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2 font-heading">
            Application Submitted!
          </h2>
          <p className="text-slate-600 mb-8">
            Thank you for applying to <strong>{job.title}</strong>. Your
            application has been successfully recorded.
          </p>
          <button
            onClick={() => navigate("/positions")}
            className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-lg transition-all"
          >
            Back to Positions
          </button>
        </div>
      </div>
    );
  }

  const totalSteps = schema.steps.length + 1; // +1 for Review step
  const isReviewStep = currentStep === totalSteps;

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-32" ref={topRef}>
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 font-heading">
                Apply: {job.title}
              </h1>
              <p className="text-sm text-slate-500">
                {job.location} • {job.type}
              </p>
            </div>
            <Link
              to={`/positions`}
              className="text-slate-400 hover:text-slate-600 text-sm font-medium flex items-center gap-1"
            >
              <ArrowLeft size={16} /> Exit
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="relative pt-2">
            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>
                {isReviewStep ? "Review" : schema.steps[currentStep - 1]?.title}
              </span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[400px]">
          {/* Dynamic Form Content */}
          <div className="p-6 md:p-10 flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!isReviewStep ? (
              // RENDER REGULAR STEPS
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 font-heading">
                  {schema.steps[currentStep - 1].title}
                </h2>
                <div className="space-y-4">
                  {schema.steps[currentStep - 1].fields.map((field) => (
                    <DynamicField
                      key={field.id}
                      field={field}
                      value={formData[field.id]}
                      onChange={handleFieldChange}
                      error={errors[field.id]}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // RENDER DYNAMIC REVIEW PAGE
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 font-heading">
                    Review Application
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Please review your answers before submitting.
                  </p>
                </div>

                {schema.steps.map((step, idx) => (
                  <div
                    key={step.step || idx}
                    className="bg-slate-50 rounded-xl p-6 border border-slate-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-brand-600">{step.title}</h3>
                      <button
                        onClick={() => setCurrentStep(idx + 1)}
                        className="text-slate-500 hover:text-brand-500 text-xs font-bold uppercase tracking-wide flex items-center gap-1"
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      {step.fields.map((field) => {
                        let displayValue = formData[field.id];

                        // Format display value based on type
                        if (field.type === "file" && displayValue) {
                          displayValue = (
                            <span className="flex items-center gap-1 text-brand-600 break-all">
                              <FileText size={14} className="shrink-0" />{" "}
                              {displayValue.name}
                            </span>
                          );
                        } else if (Array.isArray(displayValue)) {
                          displayValue = displayValue.join(", ");
                        } else if (typeof displayValue === "boolean") {
                          displayValue = displayValue ? "Yes" : "No";
                        } else if (!displayValue) {
                          displayValue = (
                            <span className="text-slate-400 italic">
                              Not answered
                            </span>
                          );
                        }

                        return (
                          <div
                            key={field.id}
                            className={
                              field.type === "textarea" || field.type === "file"
                                ? "sm:col-span-2"
                                : ""
                            }
                          >
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                              {field.label}
                            </p>
                            <div className="text-slate-900 font-medium text-sm break-words whitespace-pre-wrap">
                              {displayValue}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Nav */}
          <div className="hidden lg:flex p-6 bg-slate-50 border-t border-slate-200 justify-between items-center">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-slate-600 font-bold hover:text-slate-900 transition-colors px-4 py-2"
              >
                <ChevronLeft size={20} /> Back
              </button>
            ) : (
              <button
                onClick={() => alert("Progress saved locally.")}
                className="flex items-center gap-2 text-slate-500 hover:text-brand-500 font-medium text-sm px-4 py-2"
              >
                <Save size={16} />{" "}
                <span className="hidden sm:inline">Save Progress</span>
              </button>
            )}

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-brand-500/25 flex items-center gap-2"
              >
                Next Step <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-green-500/25 flex items-center gap-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}{" "}
                <CheckCircle size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 lg:hidden z-40 flex justify-between gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button
          onClick={currentStep === 1 ? () => alert("Saved") : handleBack}
          className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 rounded-lg"
        >
          {currentStep === 1 ? "Save" : "Back"}
        </button>
        {currentStep < totalSteps ? (
          <button
            onClick={handleNext}
            className="flex-[2] bg-brand-500 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2"
          >
            Next <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-[2] bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2"
          >
            {isSubmitting ? "..." : "Submit"} <CheckCircle size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplyJob;
