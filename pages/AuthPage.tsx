
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../components/Icon';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

interface AuthPageProps {
  onLogin: () => void;
  onNavigateToLanding: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onNavigateToLanding }) => {
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
            <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 -right-40 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="w-full max-w-md z-10">
             <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
             >
                <button onClick={onNavigateToLanding} className="inline-block">
                    <Icon name="logo" className="h-12 w-48" />
                </button>
             </motion.div>

            <motion.div
                layout
                className="bg-primary/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-border-color"
            >
                <div className="flex justify-center border-b border-border-color mb-6">
                    <button onClick={() => setAuthType('login')} className={`pb-3 px-6 font-semibold transition-colors ${authType === 'login' ? 'text-accent border-b-2 border-accent' : 'text-text-secondary hover:text-text-primary'}`}>
                        Login
                    </button>
                    <button onClick={() => setAuthType('register')} className={`pb-3 px-6 font-semibold transition-colors ${authType === 'register' ? 'text-accent border-b-2 border-accent' : 'text-text-primary'}`}>
                        Register
                    </button>
                </div>
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={authType}
                        initial={{ opacity: 0, x: authType === 'login' ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: authType === 'login' ? 50 : -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        {authType === 'login' ? <LoginForm onSuccess={onLogin} /> : <RegisterForm onSuccess={onLogin} />}
                    </motion.div>
                </AnimatePresence>

            </motion.div>
        </div>
    </div>
  );
};

export default AuthPage;
