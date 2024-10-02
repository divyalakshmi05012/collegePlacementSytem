// import React, { useEffect, useState } from 'react';
// import AxiosService from '../../utils/AxiosService';
// import toast from 'react-hot-toast';
// import ApiRoutes from '../../utils/ApiRoutes';

// const ApplicationLists = () => { 
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const response = await AxiosService.get(ApiRoutes.GET_APPLICATION_BY_COMAPNY.path,
//           { authenticate: ApiRoutes.GET_APPLICATION_BY_COMAPNY.auth }
//         );
//         setApplications(response.data); 
//       } catch (error) {
//         toast.error('Error fetching applications: ' + error.message);
//       }
//     };

//   })

//   return (
//     <div>
//       <h2 className='application-title'>Application List</h2>
//       <table className='application-listTable'>
//         <thead>
//           <tr>
//             <th>Serial No</th>
//             <th>ApplicationId</th>
//             <th>Job Posting ID</th>
//             <th>Student ID</th>
//             <th>Student Name</th>
//             <th>Job Title</th>
//             <th>Company</th>
//             <th>Posted Date</th>
//             <th>Status</th>
//             <th>Applied Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {applications.map((app, index) => (
//             <tr key={app._id}>
//               <td>{index + 1}</td>
//               <td>{app.applicationId}</td>
//               <td>{app.jobPostingId.jobPostingId}</td>
//               <td>{app.studentId}</td>
//               <td>{app.studentName}</td>
//               <td>{app.jobPostingId.title}</td>
//               <td>{app.jobPostingId.company}</td>
//               <td>{new Date(app.jobPostingId.postedDate).toLocaleDateString()}</td>
//               <td>{app.status}</td>
//               <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ApplicationLists;
import React, { useState, useEffect } from 'react';
import AxiosService from '../../utils/AxiosService';
import ApiRoutes from '../../utils/ApiRoutes';
import toast from 'react-hot-toast'; 

const ManageApplication = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await AxiosService.get(ApiRoutes.GET_APPLICATION_BY_COMAPNY.path, { authenticate: ApiRoutes.GET_APPLICATION_BY_COMAPNY.auth });
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
