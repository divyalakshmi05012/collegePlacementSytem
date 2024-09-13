import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import background from '../assets/back.jpg'

const Login = ({ role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let apiRoute;
      switch (role) {
        case 'admin':
          apiRoute = ApiRoutes.LOGIN_ADMIN.path;
          break;
        case 'company':
          apiRoute = ApiRoutes.LOGIN_COMPANY.path;
          break;
        default:
          apiRoute = ApiRoutes.LOGIN_STUDENT.path;
      }

      const { message, token, role: responseRole, studentId } = await AxiosService.post(apiRoute, { email, password }, { authenticate: ApiRoutes.auth });
      if (!responseRole) {
        throw new Error('Role not returned from server');
      }

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', responseRole);
      sessionStorage.setItem('studentId', studentId);
      
      switch (responseRole) {
        case 'Admin':
          navigate('/admin-dashboard');
          break;
        case 'Company':
          navigate('/company-dashboard');
          break;
        default:
          navigate('/student-dashboard');
      }
    } catch (err) {
      console.error('Login error:', err); // Debugging
      setError(err.message || 'Login failed. Please try again.');
    }
  };
  
  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <>
    <div className='container' style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
      <div className='title-container'>
         <h1>Welcome To Placement Cell</h1>
      </div>
      <div className='empty-container'></div>
    <div className="login-conatainer ">
      <h2 className="title">Login</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Form  className='form-controller'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
        <p>If you don't have account please signup</p>
        <Button variant="primary"onClick={handleSignup} >
          signup
        </Button>
      </Form>
    </div>
    </div>
   
   </>
  );
};

export default Login;
