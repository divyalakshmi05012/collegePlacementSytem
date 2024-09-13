import React, { useState } from 'react';
import toast from 'react-hot-toast';
import AxiosService from '../../utils/AxiosService';
import ApiRoutes from '../../utils/ApiRoutes';

const JobPostings = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobId, setJobId] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newJob = {
        title,
        company,
        jobId,
        location,
        description,
        requirements: requirements.split(',').map((req) => req.trim()), 
        salary,
      };

      await AxiosService.post(ApiRoutes.CREATE_JOBPOST.path, newJob, { authenticate: ApiRoutes.CREATE_JOBPOST.auth });
      toast.success('Job posted successfully!');
      setTitle('');
      setCompany('');
      setJobId('');
      setLocation('');
      setDescription('');
      setRequirements('');
      setSalary('');
      
    } catch (error) {
      toast.error('Failed to post job:', error);
    }
  };

  return (
    <div>
      <h2 className="postjob-title">Post a Job</h2>
      <form onSubmit={handleSubmit} className="postjob-form">
        <div className="mb-4">
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label>Company</label>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label>JobId</label>
          <input type="text" value={jobId} onChange={(e) => setJobId(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label>Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label>Requirements</label>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Enter requirements separated by commas"
            required
          />
        </div>
        <div className="mb-4">
          <label>Salary</label>
          <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        </div>
        <button type="submit" className="postjob-submit">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobPostings;
