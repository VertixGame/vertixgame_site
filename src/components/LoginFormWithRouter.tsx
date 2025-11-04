import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

export default function LoginFormWithRouter() {
  const navigate = useNavigate();

  return (
    <LoginForm
      onBack={() => navigate('/')}
      initialEmail=""
      onCreateAccount={() => navigate('/')}
    />
  );
}
