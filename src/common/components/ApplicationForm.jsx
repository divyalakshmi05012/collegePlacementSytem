import React, { useState } from 'react';
import AxiosService from '../../utils/AxiosService'; // Assuming AxiosService is set up for HTTP requests
import ApiRoutes from '../../utils/ApiRoutes';
import toast from 'react-hot-toast';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    applicationId:'',
    studentId: '',
    studentName: '',
    jobPostingId: '',
    resume: null,
    coverLetter: null,
    status: 'pending'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const data = new FormData();
    for (const key in formData) {
      if (formData[key] instanceof File) {
        data.append(key, formData[key], formData[key].name);
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      await AxiosService.post(ApiRoutes.APPLICATION_APPLY.path, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        // Assuming authentication token is needed
        authenticate: ApiRoutes.APPLICATION_APPLY.auth
      });
      
      toast.success('Application submitted successfully!');
      setSuccess('Application submitted successfully!');
      setError('');
    } catch (err) {
      toast.error(err.message || 'Failed to submit application');
      setError(err.message || 'Failed to submit application');
      setSuccess('');
    }
  };

  return (
    <div className="application-form">
      <h2 className="text-2xl font-semibold text-center mb-6">Submit Your Application</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
          <label htmlFor="studentId">Application ID:</label>
          <input
            type="text"
            id="applicationId"
            name="applicationId"
            value={formData.applicationId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="studentId">studentId:</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="studentName">studentName:</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="jobPostingId">JobId:</label>
          <input
            type="text"
            id="jobPostingId"
            name="jobPostingId"
            value={formData.jobPostingId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="resume">resume (PDF only):</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label htmlFor="coverLetter">Cover Letter (Image):</label>
          <input
            type="file"
            id="coverLetter"
            name="coverLetter"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className='submit-student-application'>Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
