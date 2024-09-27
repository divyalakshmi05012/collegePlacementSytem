import React, { useState, useEffect } from 'react';
import AxiosService from '../../utils/AxiosService';
import ApiRoutes from '../../utils/ApiRoutes';
import toast from 'react-hot-toast'; 

const ManageApplication = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await AxiosService.get(ApiRoutes.GET_ALL_APPLICATION.path, { authenticate: ApiRoutes.GET_ALL_STUDENT.auth });
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const handleUpdateStatus = async (status, applicationId) => {
    try {
      const { message } = await AxiosService.patch(`${ApiRoutes.UPDATE_APPLICATION_STATUS.path}/${applicationId}`, { status }, { authenticate: ApiRoutes.UPDATE_APPLICATION_STATUS.auth });
      toast.success(message);

      // Update application status in the frontend without refetching the whole list
      setApplications(applications.map((application) => 
        application._id === applicationId ? { ...application, status } : application
      ));
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
    }
  };

  const statusButtons = [
    { label: 'Approve', status: 'Approved', variant: 'success', allowedStatuses: ['Pending', 'Rejected'] },
    { label: 'Reject', status: 'Rejected', variant: 'danger', allowedStatuses: ['Pending', 'Approved'] }
  ];

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
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application, index) => (
            <tr key={application._id}>
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{application.applicationId}</td>
              <td className="py-2">{application.studentName}</td>
              <td className="py-2">{application.jobPostingId.title}</td>
              <td className="py-2">{application.jobPostingId.requirements.join(', ')}</td>
              <td className="py-2">{application.jobPostingId.salary}</td>
              <td className="py-2">{application.jobPostingId.company}</td>
              <td className="py-2">{new Date(application.jobPostingId.postedDate).toLocaleDateString()}</td>
              <td className="py-2">{application.status}</td>
              <td className="py-2">
                {statusButtons.map(
                  (button, i) =>
                    button.allowedStatuses.includes(application.status) && (
                      <Button
                        key={i}
                        className={`btn btn-${button.variant} mr-2`}
                        onClick={() => handleUpdateStatus(button.status, application._id)}
                      >
                        {button.label}
                      </Button>
                    )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageApplication;
