
"use client";
import { useState } from 'react';
import styles from '@/app/frontend/login/login.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const predefinedEmail = 'admin@example';
  const predefinedPassword = 'admin@password';

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === predefinedEmail && password === predefinedPassword) {
      // Store authentication status
      localStorage.setItem('isAuthenticated', 'true');
      window.location.href = '/dashboard';
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>LOGIN</h1>
        {error && <p>{error}</p>}
        <input
          type="text"
          className="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
