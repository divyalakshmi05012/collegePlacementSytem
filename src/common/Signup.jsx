import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import background from '../assets/back2.jpg'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student',
    studentId: '',
    course: '',
    companyId: '',
    companyName: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let apiRoute;
      switch (formData.role) {
        case 'Company':
          apiRoute = ApiRoutes.SIGNUP_COMPANY.path;
          break;
        default:
          apiRoute = ApiRoutes.SIGNUP_STUDENT.path;
      }

      const { message } = await AxiosService.post(apiRoute, formData);
      alert(message); // Replace with toast if preferred
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="signin-wrapper" >
      <h2 className="title">Signup</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="name">
          <label >Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}required/>
        </div>
        <div className="label">
          <label>Email:</label>
          <input type="email" name="email"  value={formData.email} onChange={handleChange} required/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input type="password"  name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="role">
          <label >Role:</label>
          <select  name="role" value={formData.role} onChange={handleChange}>
            <option value="Student">Student</option>
            <option value="Company">Company</option>
          </select>
        </div>
        {formData.role === 'Student' && (
          <>
            <div className="studentid">
              <label >Student ID:</label>
              <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} />
            </div>
            <div className="course">
              <label>Course:</label>
              <input type="text" name="course" value={formData.course} onChange={handleChange} />
            </div>
          </>
        )}
        {formData.role === 'Company' && (
          <>
            <div className="companyid">
              <label >Company ID:</label>
              <input type="text" name="companyId" value={formData.companyId}  onChange={handleChange} />
            </div>
            <div className="company-name">
              <label >Company Name:</label>
              <input type="text" name="companyName" value={formData.companyName}  onChange={handleChange}/>
            </div>
          </>
        )}
        <button type="submit" className="submit">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
