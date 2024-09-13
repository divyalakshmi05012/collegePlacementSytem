import React, { useState, useEffect } from 'react';
import AxiosService from '../../utils/AxiosService';
import toast from 'react-hot-toast';
import ApiRoutes from '../../utils/ApiRoutes';

const ApplicationList = () => {
   const studentId = sessionStorage.getItem('studentId');
   const [applications, setApplications] = useState([]);
   const [error, setError] = useState('');

   useEffect(() => {
       const fetchApplications = async () => {
           try {
               const response = await AxiosService.get(
                   ApiRoutes.GET_APPLICATIONS_BY_STUDENT_ID.path.replace(':studentId', studentId),
                   { authenticate: ApiRoutes.GET_APPLICATIONS_BY_STUDENT_ID.auth }
               );
               const data = Array.isArray(response.data) ? response.data : [response.data];
               setApplications(data);
               toast.success("Data fetched successfully")
           } catch (err) {
               toast.error(err.message || 'Failed to load applications');
           }
       };

       if (studentId) {
           fetchApplications();
       }
   }, [studentId]);

   return (
       <div className="student-application">
           <h2 className="student-applicationtitle">My Applications</h2>
           {error && <p className="text-red-500 text-center">{error}</p>}
           {applications.length > 0 ? (
               <table className="student-application-table">
                   <thead>
                       <tr>
                            <th className="py-2">No</th>
                           <th className="py-2">StudentName</th>
                           <th className="py-2">StudentId</th>
                           <th className="py-2">JobId</th>
                           <th className="py-2">Job Title</th>
                           <th className="py-2">Company</th>
                           <th className="py-2">Requirements</th>
                           <th className="py-2">Status</th>
                           <th className="py-2">Applied Date</th>
                       </tr>
                   </thead>
                   <tbody>
                       {applications.map((application,index) => (
                           <tr key={application._id}>
                               <td>{index + 1}</td> 
                                <td className="py-2">{application.studentName}</td>
                                <td className="py-2">{application.studentId}</td>
                                <td className="py-2">{application.jobPostingId.jobId}</td>
                               <td className="py-2">{application.jobPostingId.title}</td>
                               <td className="py-2">{application.jobPostingId.company}</td>
                               <td className="py-2">{application.jobPostingId.requirements.join(', ')}</td>
                               <td className="py-2">{application.status}</td>
                               <td className="py-2">{new Date(application.appliedDate).toLocaleDateString()}</td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           ) : (
               <p className="text-center">No applications found.</p>
           )}
       </div>
   );
};

export default ApplicationList;
