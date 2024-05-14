'use client'

import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const handleGoogleSignIn = () => {
    signIn('google');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Iniciar Sesión</h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleGoogleSignIn}
      >
        Iniciar Sesión con Google
      </button>
    </div>
  );
};

export default LoginPage;
