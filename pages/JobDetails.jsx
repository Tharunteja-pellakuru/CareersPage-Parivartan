import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Briefcase,
  ArrowLeft,
  CheckCircle,
  Share2,
  ChevronRight,
} from "lucide-react";

import { useJobs } from "../context/JobProvider";

const JobDetails = () => {
  const { jobsList } = useJobs();
  const { jobId } = useParams();
  const navigate = useNavigate();

  const job = jobsList.find((j) => String(j.uuid) === String(jobId));

  console.log(job);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [jobId]);

  if (!job) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Job Not Found
        </h2>
        <p className="text-slate-600 mb-8">
          The position you are looking for does not exist or has been filled.
        </p>
        <Link
          to="/positions"
          className="bg-brand-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-600 transition-colors"
        >
          Back to Positions
        </Link>
      </div>
    );
  }

  const handleApply = () => {
    navigate(`/apply/${job.id}`);
  };

  return (
    <div className="bg-white min-h-screen pt-28 pb-32 animate-in fade-in duration-500">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link
            to="/positions"
            className="hover:text-brand-500 transition-colors"
          >
            Open Positions
          </Link>
          <ChevronRight size={14} />
          <span className="text-brand-500 font-medium">{job.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Card */}
        <div className="bg-slate-50 rounded-3xl p-6 md:p-10 mb-10 border border-slate-100">
          <Link
            to="/positions"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-500 mb-6 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={16} /> Back to Jobs
          </Link>

          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 font-heading">
              {job.job_title}
            </h1>
            <div className="flex flex-wrap gap-3 md:gap-6 text-slate-600 font-medium">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-slate-200 text-sm md:text-base">
                <MapPin size={18} className="text-brand-500" />{" "}
                {job.details.location}
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-slate-200 text-sm md:text-base">
                <Briefcase size={18} className="text-brand-500" />{" "}
                {job.details.type}
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-slate-200 text-sm md:text-base">
                <Clock size={18} className="text-brand-500" />{" "}
                {job.details.experienceRange.min +
                  " - " +
                  job.details.experienceRange.max +
                  " Years     "}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-8 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">
                About the Role
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {job.description?.overview}
              </p>
            </section>

            {job.description.responsibilities && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 font-heading">
                  Key Responsibilities
                </h2>
                <ul className="space-y-4">
                  {job.description.responsibilities
                    .split("\n")
                    .map((item) => item.replace("- ", ""))
                    .map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-slate-600 text-lg leading-relaxed"
                      >
                        <CheckCircle className="h-6 w-6 text-brand-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              </section>
            )}

            {job.description.requiredSkills && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 font-heading">
                  Requirements & Skills
                </h2>
                <ul className="space-y-4">
                  {job.description.requiredSkills.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-600 text-lg leading-relaxed"
                    >
                      <div className="h-2 w-2 rounded-full bg-brand-500 mt-2.5 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right Sidebar - Hidden on Mobile/Tablet, Visible on Desktop (lg+) */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {/* Summary Box */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-6 font-heading border-b border-slate-200 pb-4">
                  Job Summary
                </h3>
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-sm text-slate-500">Department</p>
                    <p className="font-medium text-slate-900">
                      {job.details.department}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="font-medium text-slate-900">
                      {job.details.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Experience</p>
                    <p className="font-medium text-slate-900">
                      {job.details.experienceRange.min +
                        " - " +
                        job.details.experienceRange.max +
                        " Years     "}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Job Type</p>
                    <p className="font-medium text-slate-900">
                      {job.details.type}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleApply}
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-lg transition-all shadow-md hover:shadow-brand-500/20"
                  >
                    Apply for this Job
                  </button>
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center justify-center gap-2 text-slate-500 text-sm font-medium hover:text-brand-500 cursor-pointer transition-colors">
                <Share2 size={16} /> Share this position
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar - Visible on Mobile & Medium (Tablets), Hidden on Large (Desktop) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 lg:hidden z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button
          onClick={handleApply}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-lg shadow-lg"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
