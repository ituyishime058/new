
import React, { useState, useEffect } from 'react';
import Icon from '../components/Icon';

interface SettingsPageProps {
    onLogout: () => void;
}

const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-xl font-bold text-text-primary mb-4 pb-2 border-b border-border-color">{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);

const SettingsItem: React.FC<{ icon: string; title: string; description: string; children: React.ReactNode; }> = ({ icon, title, description, children }) => (
    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary transition-colors">
        <div className="flex items-start">
            <Icon name={icon} className="w-6 h-6 text-accent mt-1" />
            <div className="ml-4">
                <h3 className="font-semibold text-text-primary">{title}</h3>
                <p className="text-sm text-text-secondary">{description}</p>
            </div>
        </div>
        <div className="flex-shrink-0">{children}</div>
    </div>
);

const Toggle: React.FC<{ enabled: boolean; setEnabled: (enabled: boolean) => void }> = ({ enabled, setEnabled }) => (
    <button onClick={() => setEnabled(!enabled)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-accent' : 'bg-gray-400 dark:bg-gray-600'}`}>
        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);


const SettingsPage: React.FC<SettingsPageProps> = ({ onLogout }) => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <div className="bg-primary shadow-md rounded-xl p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
            </header>

            <SettingsSection title="Account">
                <SettingsItem icon="UserCircle" title="Profile Information" description="Update your name, bio, and other personal details.">
                    <button className="text-sm text-accent font-semibold px-4 py-1.5 rounded-md hover:bg-secondary">Edit</button>
                </SettingsItem>
                <SettingsItem icon="Key" title="Change Password" description="It's a good idea to use a strong password that you're not using elsewhere.">
                    <button className="text-sm text-accent font-semibold px-4 py-1.5 rounded-md hover:bg-secondary">Change</button>
                </SettingsItem>
                <SettingsItem icon="ArrowLeftOnRectangle" title="Logout" description="Log out of your Nexus account on this device.">
                    <button onClick={onLogout} className="text-sm text-red-500 font-semibold px-4 py-1.5 rounded-md hover:bg-red-500/10">Logout</button>
                </SettingsItem>
            </SettingsSection>

            <SettingsSection title="Notifications">
                 <SettingsItem icon="Envelope" title="Email Notifications" description="Receive emails about your account activity and updates.">
                    <Toggle enabled={emailNotifications} setEnabled={setEmailNotifications} />
                </SettingsItem>
                 <SettingsItem icon="Bell" title="Push Notifications" description="Get notified in-app about likes, comments, and follows.">
                     <Toggle enabled={true} setEnabled={() => {}} />
                </SettingsItem>
            </SettingsSection>

            <SettingsSection title="Display">
                 <SettingsItem icon="Moon" title="Dark Mode" description="Reduce eye strain and save battery life.">
                    <Toggle enabled={darkMode} setEnabled={setDarkMode} />
                </SettingsItem>
            </SettingsSection>
        </div>
    );
};

export default SettingsPage;
