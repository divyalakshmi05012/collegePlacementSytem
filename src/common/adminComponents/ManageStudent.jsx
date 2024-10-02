import React, { useState, useEffect } from 'react';
import AxiosService from '../../utils/AxiosService';
import ApiRoutes from '../../utils/ApiRoutes';

const ManageStudents = () => {
  // const studentId = sessionStorage.getItem('studentId');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await AxiosService.get(ApiRoutes.GET_ALL_STUDENT.path,{ authenticate: ApiRoutes.GET_ALL_STUDENT.auth });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Students</h1>
      <table className="manage-student">
        <thead>
          <tr>
            <th>No</th>
            <th >Name</th>
            <th>StudentId</th>
            <th >Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student,index) => (
            <tr key={student._id}>
               <td className="py-2">{index + 1}</td>
              <td className="py-2">{student.name}</td>
              <td className="py-2">{student.studentId}</td>
              <td className="py-2">{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

 
};

export default ManageStudents;
