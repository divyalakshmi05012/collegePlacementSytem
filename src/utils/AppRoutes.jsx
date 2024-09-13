import Login from '../common/Login'
import Signup from "../common/Signup";
import {Navigate} from 'react-router-dom'
import StudentDashboard from '../common/StudDashboard';
import ApplicationList from '../common/components/ApplicationList';
import InterviewSchedule from '../common/components/InterviewSchedule';
import Reports from '../common/components/Reports';
import JobPosting  from '../common/components/JobPosting'
import AdminDashboard from '../common/AdminDashboard';
import ManageApplications from '../common/adminComponents/ManageApplication';
import ManageDrives   from '../common/adminComponents/ManageDrives';
import ManageStudent    from '../common/adminComponents/ManageStudent';
import AdminReports from '../common/adminComponents/AdminReports'
import CompDashboard from '../common/CompDashboard';
import JobPostings from '../common/companyComponents/JobPostings';
import ApplicationLists from '../common/companyComponents/ApplicationLists';
import InterviewSchedules from '../common/companyComponents/InterviewSchedules';
import ApplicationForm from '../common/components/ApplicationForm';

export default[
    {
        path: '/', 
        element: <Navigate to="/login" />, 
    },
    {
        path: '/login', 
        element: <Login />
    },
    {
        path: '/login-admin', 
        element: <Login />
    },
    {
        path: '/login-company', 
        element: <Login />
    },
    {
        path: '/signup', 
        element: <Signup />
    },
    {
        path: '/signup-admin',
        element: <Signup />
    },
    {
        path: '/signup-company', 
        
        element: <Signup />
    },
    {
        path: '/student-dashboard',
        element: <StudentDashboard />,
        children: [
            {
                path: 'application', 
                element: <ApplicationList/>
            },
            {
                path: 'interviews', 
                element: <InterviewSchedule />
            },
            {
                path: 'jobs',
                element: <JobPosting />
            },
            {
                path: 'apply',
                element: <ApplicationForm />
            },
            {
                path: 'reports', 
                element: <Reports />
            }
        ]
    },
    {
        path:'/admin-dashboard',
        element:<AdminDashboard/>,
        children:[
            {
                path:'application',
                element:<ManageApplications/>
            },
            {
                path:'drives',
                element:<ManageDrives/>
            },
            {
                path:'student',
                element:<ManageStudent/>
            },
            {
                path:'report',
                element:<AdminReports/>
            }
            
        ]
    },{
        path:'/company-dashboard',
        element:<CompDashboard/>,
        children:[
            {
                path:'application',
                element:<ApplicationLists/>
            },
            {
                path:'interview',
                element:<InterviewSchedules/>
            },
            {
                path:'job',
                element:<JobPostings/>
            },

        ]
    },
    {
        path: '*',
        element: <div>404 Not Found</div>
    }
   

]
