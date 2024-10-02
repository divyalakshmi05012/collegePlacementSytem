import React, { useState, useEffect } from 'react';
import AxiosService from '../../utils/AxiosService';
import ApiRoutes from '../../utils/ApiRoutes';
import toast from 'react-hot-toast'; 

const ManageApplication = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await AxiosService.get(ApiRoutes.GET_ALL_APPLICATION.path, { authenticate: ApiRoutes.GET_ALL_APPLICATION.auth });
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <h1 className="Manage-application">Manage Applications</h1>
      <table className="manage-application-table">
        <thead>
          <tr>
            <th className="py-2">No</th>
            <th className="py-2">ApplicationId</th>
            <th className="py-2">Student Name</th>
            <th className="py-2">Job Title</th>
            <th className="py-2">Requirements</th>
            <th className="py-2">Salary</th>
            <th className="py-2">Company</th>
            <th className="py-2">Posted Date</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application, index) => (
            <tr key={application._id}>
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{application.applicationId}</td>
              <td className="py-2">{application.studentName}</td>
              <td className="py-2">{application.jobPostId.title}</td>
              <td className="py-2">{application.jobPostId.requirements}</td>
              <td className="py-2">{application.jobPostId.salary}</td>
              <td className="py-2">{application.jobPostId.company}</td>
              <td className="py-2">{new Date(application.jobPostId.postedDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageApplication;
