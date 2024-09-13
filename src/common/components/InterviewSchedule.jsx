import React, { useState, useEffect } from 'react'; 
import AxiosService from '../../utils/AxiosService';
import toast from 'react-hot-toast';
import ApiRoutes from '../../utils/ApiRoutes';

const InterviewSchedule = () => {
    const studentId = sessionStorage.getItem('studentId')
    const [interviews, setInterviews] = useState([]); 
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const response = await AxiosService.get(
                    ApiRoutes.GET_INTERVIEW_BY_STUDENT_ID.path.replace(':studentId', studentId),
                    { authenticate: ApiRoutes.GET_INTERVIEW_BY_STUDENT_ID.auth }
                );
                setInterviews(response); 
                toast.success("Data fetched successfully")
            } catch (error) {
                toast.error('Error fetching interviews:', error);
                setError('Failed to load interviews');
            }
        };

        fetchInterviews();
    }, [studentId]);

    return (
        <div className='interiview-student'>
            <h2 className="interview-title">Upcoming Interviews</h2>
            {error && <p className="error-message">{error}</p>}
            <table>
                <thead>
                    <tr className="bg-gray-200">
                        <th>SerialNo</th>
                        <th>ApplicationId</th>
                        <th>StudentId</th>
                        <th>CompanyName</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Format</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {interviews && interviews.length > 0 ? (
                        interviews.map((interview, index, i) => {
                            if (!interview || !interview.companyName) {
                                return null; 
                            }
                            return (
                                <tr key={i}>
                                    <td>{index + 1}</td> 
                                    <td>{interview.applicationId}</td>
                                    <td>{interview.studentId}</td>
                                    <td>{interview.companyName}</td>
                                    <td>{new Date(interview.date).toLocaleDateString()}</td>
                                    <td>{new Date(interview.date).toLocaleTimeString()}</td>
                                    <td>{interview.mode}</td>
                                    <td>{interview.status}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="5">No interviews found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InterviewSchedule;
