import React, { useState, useEffect } from 'react';
import AxiosService from '../../utils/AxiosService';
import ApiRoutes from '../../utils/ApiRoutes';

const ManageDrives = () => {
  const [drives, setDrives] = useState([]);
  const [newDrive, setNewDrive] = useState({
    name: '',
    startDate: '',
    endDate: '',
    companies: [], 
    participants: [], 
    interviews: [], 
  });

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const response = await AxiosService.get(ApiRoutes.GET_ALL_DRIVE.path,{ authenticate: ApiRoutes.GET_ALL_DRIVE.auth });
        setDrives(response.data); 
      } catch (error) {
        console.error('Error fetching drives:', error);
      }
    };

    fetchDrives();
  }, []);

  const handleCreateDrive = async () => {
    try {
      await AxiosService.post(ApiRoutes.CREATE_DRIVE.path,{authenticate:ApiRoutes.CREATE_DRIVE.auth}, newDrive);
      setDrives([...drives, newDrive]); 
      setNewDrive({
        name: '',
        startDate: '',
        endDate: '',
        companies: [],
        participants: [],
        interviews: [],
      }); 
    } catch (error) {
      console.error('Error creating new drive:', error);
    }
  };

  return (
    <div>
      <h1 className="manage-drive">Manage Placement Drives</h1>
      <table className="manage-drivetable">
        <thead>
          <tr>
            <th className='py-2'>No</th>
            <th className="py-2">Name</th>
            <th className="py-2">Start Date</th>
            <th className="py-2">End Date</th>
            <th className="py-2">Company Name</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drives.map((drive,index) => (
            <tr key={drive._id}>
               <td className="py-2">{index + 1}</td>
              <td className="py-2">{drive.name}</td>
              <td className="py-2">{new Date(drive.startDate).toLocaleDateString()}</td>
              <td className="py-2">{new Date(drive.endDate).toLocaleDateString()}</td>
              <td className="py-2">
                {drive.companies.map((company) => company.companyName).join(', ')}
              </td>
              <td className="py-2">
                <button className="drive-edit" onClick={() => handleEdit(drive._id)} >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-6">
        <h2 className="create-drivetitle">Create New Placement Drive</h2>
        <form>
          <label className="block mb-2">
            Name:
            <input type="text" value={newDrive.name} onChange={(e) => setNewDrive({ ...newDrive, name: e.target.value })}/>
          </label>
          <label className="block mb-2">
            Start Date:
            <input type="date" value={newDrive.startDate} onChange={(e) => setNewDrive({ ...newDrive, startDate: e.target.value })}/>
          </label>
          <label className="block mb-2">
            End Date:
            <input type="date" value={newDrive.endDate} onChange={(e) => setNewDrive({ ...newDrive, endDate: e.target.value })}/>
          </label>
          <label className="block mb-2">
            CompanyName
            <input type="text" value={newDrive.companyname} onChange={(e) => setNewDrive({ ...newDrive, companyname: e.target.value })}/>
          </label>
          <button type="button" onClick={handleCreateDrive} className="create-drive">
            Create Drive
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageDrives;
