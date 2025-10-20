import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Icon from '../components/Icon';

interface AuthPageProps {
  onSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <Icon name="logo" className="h-12 w-auto mx-auto"/>
            <h1 className="text-3xl font-bold text-text-primary mt-4">Welcome to Nexus</h1>
            <p className="text-text-secondary mt-2">
              {isLogin ? 'Sign in to continue' : 'Create an account to get started'}
            </p>
        </div>

        <div className="bg-primary p-8 rounded-2xl shadow-xl">
          {isLogin ? <LoginForm onSuccess={onSuccess} /> : <RegisterForm onSuccess={onSuccess} />}
        </div>
        
        <div className="text-center mt-6">
            <p className="text-text-secondary">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-accent hover:underline ml-2">
                    {isLogin ? 'Sign up' : 'Sign in'}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
