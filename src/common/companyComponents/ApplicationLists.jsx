import React, { useEffect, useState } from 'react';
import AxiosService from '../../utils/AxiosService';
import toast from 'react-hot-toast';
import ApiRoutes from '../../utils/ApiRoutes';

const ApplicationLists = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await AxiosService.get(ApiRoutes.GET_ALL_APPLICATION.path,{authenticate: ApiRoutes.GET_ALL_APPLICATION.auth });
        setApplications(response.data);
      } catch (error) {
        toast.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <h2 className='application-title'>Application List</h2>
      <table className='application-listTable'>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>ApplicationId</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Posted Date</th>
            <th>Status</th>
            <th>Applied Date</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={app._id}>
              <td>{index + 1}</td> 
              <td>{app.applicationId}</td>
              <td>{app.studentId}</td>
              <td>{app.studentName}</td>
              <td>{app.jobPostingId.title}</td>
              <td>{app.jobPostingId.company}</td>
              <td>{new Date(app.jobPostingId.postedDate).toLocaleDateString()}</td>
              <td>{app.status}</td>
              <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationLists;
