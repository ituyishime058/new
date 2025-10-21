
import React, { useState, useEffect } from 'react';
import Icon from '../components/Icon';
// FIX: Add file extension to imports.
import { loginActivity, currentUser } from '../constants.ts';
import { LoginActivity } from '../types.ts';
import { format } from 'date-fns';

interface ThemeSettings {
    accentHue: number;
    fontSize: 'sm' | 'base' | 'lg';
    reduceMotion: boolean;
}

interface SettingsPageProps {
    onLogout: () => void;
    settings: ThemeSettings;
    onSettingsChange: (settings: ThemeSettings) => void;
}

const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-xl font-bold text-text-primary mb-4 pb-2 border-b border-border-color">{title}</h2>
        <div className="space-y-1">{children}</div>
    </div>
);

const SettingsItem: React.FC<{ icon: string; title: string; description: string; children: React.ReactNode; }> = ({ icon, title, description, children }) => (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors">
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

const AccentColorPicker: React.FC<{ currentHue: number; onHueChange: (hue: number) => void }> = ({ currentHue, onHueChange }) => {
    const colors = [
        { name: 'Default', hue: 231 }, { name: 'Rose', hue: 340 }, { name: 'Orange', hue: 24 },
        { name: 'Lime', hue: 100 }, { name: 'Sky', hue: 195 }, { name: 'Violet', hue: 260 }
    ];
    return (
        <div className="flex space-x-2">
            {colors.map(color => (
                <button
                    key={color.hue}
                    title={color.name}
                    onClick={() => onHueChange(color.hue)}
                    className={`w-8 h-8 rounded-full transition-all ring-offset-2 ring-offset-primary ${currentHue === color.hue ? 'ring-2 ring-accent' : 'hover:scale-110'}`}
                    style={{ backgroundColor: `hsl(${color.hue}, 60%, 65%)` }}
                />
            ))}
        </div>
    );
};

const FontSizeSelector: React.FC<{ currentSize: string; onSizeChange: (size: 'sm' | 'base' | 'lg') => void }> = ({ currentSize, onSizeChange }) => {
    const sizes = [
        { label: 'Small', value: 'sm', class: 'text-sm' },
        { label: 'Default', value: 'base', class: 'text-base' },
        { label: 'Large', value: 'lg', class: 'text-lg' }
    ];
    return (
        <div className="bg-secondary p-1 rounded-full flex space-x-1">
            {sizes.map(size => (
                <button
                    key={size.value}
                    onClick={() => onSizeChange(size.value as any)}
                    className={`px-4 py-1 rounded-full font-semibold transition-colors ${currentSize === size.value ? 'bg-primary shadow-sm' : 'hover:bg-primary/50'} ${size.class}`}
                >
                    {size.label}
                </button>
            ))}
        </div>
    );
};

const SettingsPage: React.FC<SettingsPageProps> = ({ onLogout, settings, onSettingsChange }) => {
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

    const handleSettingChange = (key: keyof ThemeSettings, value: any) => {
        onSettingsChange({ ...settings, [key]: value });
    };

    return (
        <div className="bg-primary shadow-md rounded-xl p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
            </header>

            <SettingsSection title="Appearance">
                 <SettingsItem icon="Moon" title="Dark Mode" description="Reduce eye strain and save battery life.">
                    <Toggle enabled={darkMode} setEnabled={setDarkMode} />
                </SettingsItem>
                <SettingsItem icon="PaintBrush" title="Accent Color" description="Customize the main color of the user interface.">
                    <AccentColorPicker currentHue={settings.accentHue} onHueChange={(hue) => handleSettingChange('accentHue', hue)} />
                </SettingsItem>
            </SettingsSection>
            
            <SettingsSection title="Accessibility">
                <SettingsItem icon="Bars3BottomLeft" title="Font Size" description="Adjust the text size for better readability.">
                    <FontSizeSelector currentSize={settings.fontSize} onSizeChange={(size) => handleSettingChange('fontSize', size)} />
                </SettingsItem>
                <SettingsItem icon="BoltSlash" title="Reduced Motion" description="Disables animations and motion effects.">
                    <Toggle enabled={settings.reduceMotion} setEnabled={(val) => handleSettingChange('reduceMotion', val)} />
                </SettingsItem>
            </SettingsSection>

            <SettingsSection title="Security & Login">
                <SettingsItem icon="ShieldCheck" title="Two-Factor Authentication" description="Add an extra layer of security to your account.">
                    <button className="text-sm font-semibold px-4 py-1.5 rounded-full border border-border-color hover:bg-secondary">Set Up</button>
                </SettingsItem>
                <div>
                    <h3 className="font-semibold text-text-primary px-3 pt-4">Login Activity</h3>
                    <p className="text-sm text-text-secondary px-3 pb-2">Your recent login sessions.</p>
                    <div className="space-y-1">
                        {loginActivity.map((activity: LoginActivity) => (
                            <div key={activity.id} className="flex items-center p-3 rounded-lg hover:bg-secondary">
                                <Icon name={activity.device.includes('iPhone') ? 'DevicePhoneMobile' : 'ComputerDesktop'} className="w-8 h-8 text-text-secondary"/>
                                <div className="ml-4 flex-1">
                                    <p className="font-semibold text-text-primary">{activity.device} {activity.isCurrent && <span className="text-xs text-green-500">(Current)</span>}</p>
                                    <p className="text-sm text-text-secondary">{activity.location} · {activity.ipAddress}</p>
                                    <p className="text-xs text-text-secondary">{format(new Date(activity.timestamp), "MMM d, yyyy 'at' h:mm a")}</p>
                                </div>
                                {!activity.isCurrent && <button className="text-sm text-red-500 font-semibold">Log Out</button>}
                            </div>
                        ))}
                    </div>
                </div>
            </SettingsSection>

             <SettingsSection title="Session">
                 <SettingsItem icon="ArrowLeftOnRectangle" title="Logout" description="Log out of your Nexus account on this device.">
                    <button onClick={onLogout} className="text-sm text-red-500 font-semibold px-4 py-1.5 rounded-full hover:bg-red-500/10">Logout</button>
                </SettingsItem>
             </SettingsSection>
        </div>
    );
};

export default SettingsPage;
