// src/components/InterviewSchedule.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import AxiosService from '../../utils/AxiosService';
import ApiRoutes from '../../utils/ApiRoutes';

const InterviewSchedules = () => {
    const[applicationId,setApplicationId]= useState('');
    const [studentId, setStudentId] = useState('');
    const [jobPostingId, setJobPostingId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [mode, setMode] = useState('in-person'); 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let response = await AxiosService.post(ApiRoutes.CREATE_INTERVIEW.path, {
          applicationId,
          studentId, 
          jobPostingId, 
          companyName, 
          companyId, 
          date, 
          time, 
          mode 
        }, {
          authenticate: ApiRoutes.CREATE_INTERVIEW.auth
        });
        toast.success('Interview scheduled successfully!');
      } catch (error) {
        console.error(error);
        toast.error('Failed to schedule interview.');
      }
    };
  
    return (
      <div className="company-interview">
        <h2 className="company-interviewtitle">Schedule an Interview</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label>Application ID</label>
            <input type="text" value={applicationId} onChange={(e) => setApplicationId(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label>Student ID</label>
            <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label>JobPostingID</label>
            <input type="text" value={jobPostingId} onChange={(e) => setJobPostingId(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label>Company Name</label>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label>Company ID</label>
            <input type="text" value={companyId} onChange={(e) => setCompanyId(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label>Time</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label>Mode</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)} required>
              <option value="in-person">In-Person</option>
              <option value="virtual">Virtual</option>
            </select>
          </div>
          <button type="submit" className='interview-companyButton'>
            Schedule Interview
          </button>
        </form>
      </div>
    );
  };
  

export default InterviewSchedules;
