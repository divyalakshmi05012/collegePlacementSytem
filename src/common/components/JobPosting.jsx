import React, { useState, useEffect } from 'react';
import AxiosService from '../../utils/AxiosService';
import ApiRoutes from '../../utils/ApiRoutes';

import toast from 'react-hot-toast';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await AxiosService.get(
                    ApiRoutes.GET_JOB_LIST.path,
                    { authenticate: ApiRoutes.GET_JOB_LIST.auth }
                );
                
                setJobs(response); 
                toast.success("Data Fetch Successfully");
            } catch (error) {
                toast.error(error.message || 'Failed to load jobs');
            }
        };

        fetchJobs();
    }, []);
  
   
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
            <table>
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2">SerialNo</th>
                        <th className="py-2">Title</th>
                        <th className="py-2">JobId</th>
                        <th className="py-2">Company</th>
                        <th className="py-2">Description</th>
                        <th className="py-2">Requirements</th>
                        <th className="py-2">Salary</th>
                        <th className="py-2">Location</th>
                        <th className="py-2">Posted Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        jobs.map((job, index) => (
                            <tr key={job._id} className="text-center">
                                <td>{index + 1}</td> 
                                <td className="py-2 px-4 border">{job.title}</td>
                                <td className="py-2 px-4 border">{job.jobPostingId}</td>
                                <td className="py-2 px-4 border">{job.company}</td>
                                <td className="py-2 px-4 border">{job.description}</td>
                                <td className="py-2 px-4 border">
                                    <ul className="list-disc text-left">
                                        {job.requirements.map((requirement, i) => (
                                            <li key={i}>{requirement}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="py-2 px-4 border">{job.salary}</td>
                                <td className="py-2 px-4 border">{job.location}</td>
                                <td className="py-2 px-4 border">
                                    {new Date(job.postedDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default JobList;

