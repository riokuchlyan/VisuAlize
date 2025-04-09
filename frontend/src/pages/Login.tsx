import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import ReturnHome from '../components/ReturnHome';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleAuth = async () => {
    setErrorMsg('');
    if (isSignUp) {

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setErrorMsg(error.message);
      } else {
        alert('Sign-up successful! Check your email for confirmation.');
      }
    } else {

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMsg(error.message);
      }
      window.location.href = "/";
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div style={{ maxWidth: '300px', width: '100%' }}>
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        <button onClick={handleAuth} style={{ width: '100%', marginBottom: '1rem' }}>
          {isSignUp ? 'Create Account' : 'Login'}
        </button>
        <p>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
        <ReturnHome />
      </div>
      
    </div>
  );
};

export default Login;