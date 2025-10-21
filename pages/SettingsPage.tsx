import React, { useState } from 'react';
import Icon from '../components/Icon.tsx';
import { currentUser, loginActivity } from '../constants.ts';
import Avatar from '../components/Avatar.tsx';
import { LoginActivity } from '../types.ts';

type SettingsTab = 'account' | 'security' | 'notifications' | 'appearance';

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('account');

    const renderContent = () => {
        switch(activeTab) {
            case 'account': return <AccountSettings />;
            case 'security': return <SecuritySettings />;
            case 'notifications': return <NotificationSettings />;
            case 'appearance': return <AppearanceSettings />;
            default: return null;
        }
    }

    return (
        <div className="bg-primary shadow-md rounded-xl overflow-hidden min-h-[calc(100vh-10rem)]">
            <header className="p-4 border-b border-border-color">
                <h1 className="text-xl font-bold text-text-primary">Settings</h1>
            </header>
            <div className="grid grid-cols-12">
                <div className="col-span-12 md:col-span-3 border-r border-border-color p-2">
                    <SettingsTabButton icon="UserCircle" label="Account" tabName="account" activeTab={activeTab} onClick={setActiveTab} />
                    <SettingsTabButton icon="ShieldCheck" label="Security" tabName="security" activeTab={activeTab} onClick={setActiveTab} />
                    <SettingsTabButton icon="Bell" label="Notifications" tabName="notifications" activeTab={activeTab} onClick={setActiveTab} />
                    <SettingsTabButton icon="Sun" label="Appearance" tabName="appearance" activeTab={activeTab} onClick={setActiveTab} />
                </div>
                <div className="col-span-12 md:col-span-9 p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

const SettingsTabButton: React.FC<{icon: string, label: string, tabName: SettingsTab, activeTab: SettingsTab, onClick: (tab: SettingsTab) => void}> = ({ icon, label, tabName, activeTab, onClick}) => {
    const isActive = activeTab === tabName;
    return (
        <button 
            onClick={() => onClick(tabName)} 
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${isActive ? 'bg-secondary text-text-primary' : 'hover:bg-secondary text-text-secondary'}`}
        >
            <Icon name={icon} className="w-6 h-6" />
            <span>{label}</span>
        </button>
    )
}

const AccountSettings = () => (
    <div>
        <h2 className="text-lg font-bold mb-6">Account Information</h2>
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <Avatar src={currentUser.avatarUrl} alt={currentUser.name} size="lg"/>
                <button className="px-4 py-2 border border-border-color rounded-full font-semibold hover:bg-secondary">Change Photo</button>
            </div>
            <SettingsField label="Name" value={currentUser.name} />
            <SettingsField label="Handle" value={`@${currentUser.handle}`} />
            <SettingsField label="Email" value="alex.johnson@example.com" />
            <SettingsField label="Bio" value={currentUser.bio || ''} type="textarea" />
        </div>
    </div>
);

const SecuritySettings = () => (
     <div>
        <h2 className="text-lg font-bold mb-6">Security & Login</h2>
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold mb-2">Change Password</h3>
                <div className="space-y-2 max-w-sm">
                    <input type="password" placeholder="Current Password" className="w-full bg-secondary p-2 rounded-md" />
                    <input type="password" placeholder="New Password" className="w-full bg-secondary p-2 rounded-md" />
                    <input type="password" placeholder="Confirm New Password" className="w-full bg-secondary p-2 rounded-md" />
                    <button className="px-4 py-2 bg-accent text-white rounded-md font-semibold">Update Password</button>
                </div>
            </div>
             <div>
                <h3 className="font-semibold mb-2">Login Activity</h3>
                <div className="space-y-3">
                    {loginActivity.map((activity: LoginActivity) => (
                        <div key={activity.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                            <div>
                                <p className="font-semibold">{activity.device}</p>
                                <p className="text-sm text-text-secondary">{activity.location} - {activity.ipAddress}</p>
                                {activity.isCurrent && <span className="text-xs text-green-500 font-bold">Active Now</span>}
                            </div>
                            {!activity.isCurrent && <button className="text-sm font-semibold text-text-secondary hover:text-red-500">Log out</button>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const NotificationSettings = () => (
    <div>
        <h2 className="text-lg font-bold mb-6">Notification Settings</h2>
        <div className="space-y-4">
            <ToggleSetting label="Push Notifications" description="Receive notifications on your device."/>
            <ToggleSetting label="Email Notifications" description="Get important updates via email."/>
            <ToggleSetting label="In-App Sounds" description="Play sounds for notifications inside the app."/>
        </div>
    </div>
);
const AppearanceSettings = () => (
    <div>
        <h2 className="text-lg font-bold mb-6">Appearance</h2>
         <div>
            <h3 className="font-semibold mb-2">Theme</h3>
            <div className="flex space-x-4">
                <ThemeOption label="Light" />
                <ThemeOption label="Dim" />
                <ThemeOption label="Dark" isActive={true} />
            </div>
        </div>
    </div>
);

const SettingsField: React.FC<{label: string, value: string, type?: 'text' | 'textarea'}> = ({ label, value, type='text' }) => (
    <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
        {type === 'text' ? (
             <input type="text" readOnly value={value} className="w-full bg-secondary p-2 rounded-md" />
        ) : (
             <textarea readOnly value={value} rows={3} className="w-full bg-secondary p-2 rounded-md resize-none" />
        )}
    </div>
)

const ToggleSetting: React.FC<{label: string, description: string}> = ({label, description}) => (
    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
        <div>
            <p className="font-semibold">{label}</p>
            <p className="text-sm text-text-secondary">{description}</p>
        </div>
        <div className="w-12 h-6 bg-border-color rounded-full p-1 flex items-center cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
        </div>
    </div>
)

const ThemeOption: React.FC<{label: string, isActive?: boolean}> = ({ label, isActive }) => (
    <button className={`p-4 border-2 rounded-lg text-center ${isActive ? 'border-accent' : 'border-border-color'}`}>
        <div className={`w-16 h-10 rounded-md ${label === 'Light' ? 'bg-gray-100' : label === 'Dim' ? 'bg-gray-700' : 'bg-black'}`}></div>
        <p className="mt-2 font-semibold">{label}</p>
    </button>
)

export default SettingsPage;
