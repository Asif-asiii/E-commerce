import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const login = async () => {
    console.log('login function executed', formData);
    // Your login logic here
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle non-2xx HTTP responses
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      } else {
        console.error('Sign up failed', responseData.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Optionally, display an error message to the user
      
    }
  };

  const signup = async () => {
    console.log('sign up function executed', formData);
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle non-2xx HTTP responses
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      } else {
        console.error('Sign up failed', responseData.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Optionally, display an error message to the user
      
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    if (state === 'Login') {
      login();
    } else {
      signup();
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state === 'Sign Up' && (
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={changeHandler}
              placeholder='Your name'
            />
          )}
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={changeHandler}
            placeholder='Your email id'
          />
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={changeHandler}
            placeholder='Your password'
          />
        </div>
        <button onClick={handleContinue}>Continue</button>
        {state === 'Sign Up' ? (
          <p className='loginsignup-login'>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              style={{ cursor: 'pointer' }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className='loginsignup-login'>
            Create an account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              style={{ cursor: 'pointer' }}
            >
              Click here
            </span>
          </p>
        )}
        <div className='loginsignup-agree'>
          <input type='checkbox' />
          <p>
            By continuing, I agree to the Terms of Use & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
