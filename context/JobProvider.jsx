import { createContext, useContext, useEffect, useState } from "react";
import { jobs as staticJobs } from "../data/jobs"; // Ensure you import your fallback data

const JobContext = createContext();

const BASE_URL = "https://adminbackend-production-d381.up.railway.app"


export const JobProvider = ({ children }) => {
  const [jobsList, setJobsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${BASE_URL}/jobs`);
      const data = await response.json();
      console.log(data)

      // FIXED: Check if data is an Array. If not, check if it has a .jobs property.
      const validJobs = Array.isArray(data) ? data : data.jobs || [];
      console.log(validJobs)

      setJobsList(validJobs);
      setError(null);
    } catch (err) {
      setJobsList([]);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const value = {
    jobsList,
    isLoading,
    error,
    refreshJobs: fetchJobs,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
