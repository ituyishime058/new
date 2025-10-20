
import React, { useState } from 'react';
import Icon from './Icon';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate a successful login
        console.log("Logging in with", { email, password });
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-secondary rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
                <div className="relative">
                     <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-secondary rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-accent pr-10"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-text-secondary">
                        <Icon name={showPassword ? "EyeSlash" : "Eye"} className="w-5 h-5"/>
                    </button>
                </div>
                <a href="#" className="text-xs text-accent hover:underline mt-2 block text-right">Forgot password?</a>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-accent-start to-accent-end text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
