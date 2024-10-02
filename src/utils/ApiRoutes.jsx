const ApiRoutes = {
    LOGIN_STUDENT: {
      path: '/student/login',
      auth: false
    },
    LOGIN_ADMIN: {
      path: '/admin/login-admin',
      auth: false
    },
    LOGIN_COMPANY: {
      path: '/employee/login-employee',
      auth: false
    },
    SIGNUP_STUDENT: {
      path: '/student/register',
      auth: false
    },
    SIGNUP_ADMIN: {
      path: '/admin/create-admin',
      auth: false
    },
    SIGNUP_COMPANY: {
      path: '/employee/create-employee',
      auth: false
    },
    GET_APPLICATIONS_BY_STUDENT_ID: {
      path: '/application/getApplication/:studentId',
      auth: true
    },
    APPLICATION_APPLY: {
      path: '/application/apply',
      auth: false
    },
    GET_ALL_APPLICATION:{
      path:'/application/getAllApplication',
      auth:false
    },
    GET_INTERVIEW_BY_STUDENT_ID:{
        path:'/interview/getPlacement/:studentId',
        auth: true
    },
    GET_JOB_LIST:{
        path:'/job/getJobList',
        auth:false
    },
    GET_ALL_DRIVE:{
      path:'/placement/drive',
      auth:true
    },
    GET_APPLICATION_BY_COMAPNY:{
      path:'/application/getAllApplication',
      auth:false
    },
    CREATE_DRIVE:{
      path:'/placement/create',
      auth:true
    },
    GET_ALL_STUDENT:{
      path:'/student/getAllStudent',
      auth:true
    },
    GET_ALL_INTERVIEW:{
      path:'/interview/getAllInterview',
      auth:false
    },
    CREATE_INTERVIEW:{
      path:'/interview/schedule',
      auth:false
    },
    CREATE_JOBPOST:{
      path:'/job/createjob',
      auth:false
    }
  };
  
  export default ApiRoutes;
  