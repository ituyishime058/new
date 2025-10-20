import React, { useState } from 'react';
import Icon from './Icon';
import PasswordStrengthMeter from './PasswordStrengthMeter';

interface RegisterFormProps {
  onSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Registering with", { name, email, password });
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-secondary rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>
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
                <PasswordStrengthMeter password={password} />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-accent-start to-accent-end text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                Create Account
            </button>
        </form>
    );
};

export default RegisterForm;
