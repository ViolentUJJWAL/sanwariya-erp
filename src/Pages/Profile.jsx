import React, { useState } from 'react';
import { User, Lock, Edit, Save, Mail, Phone, Shield, Key, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '1234567890'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSecurityToggle = (setting) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const renderProfileSection = () => (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-orange-600">Profile Details</h2>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)} 
            className="text-orange-600 hover:bg-orange-100 p-2 rounded-full"
          >
            <Edit size={24} />
          </button>
        ) : (
          <button 
            onClick={() => setIsEditing(false)} 
            className="text-green-600 hover:bg-green-100 p-2 rounded-full"
          >
            <Save size={24} />
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="text-gray-600 flex items-center">
              <User className="mr-2 text-orange-600" /> Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-orange-300 rounded"
              />
            ) : (
              <p className="font-semibold">{profile.name}</p>
            )}
          </div>

          <div>
            <label className="text-gray-600 flex items-center">
              <Mail className="mr-2 text-orange-600" /> Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-orange-300 rounded"
              />
            ) : (
              <p className="font-semibold">{profile.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-gray-600 flex items-center">
              <Phone className="mr-2 text-orange-600" /> Phone Number
            </label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-orange-300 rounded"
              />
            ) : (
              <p className="font-semibold">{profile.phone}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-orange-600 border-b pb-4">Security Settings</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Two-Factor Authentication</h3>
            <p className="text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <div className="flex items-center">
            <label className="switch">
              <input
                type="checkbox"
                checked={securitySettings.twoFactorAuth}
                onChange={() => handleSecurityToggle('twoFactorAuth')}
              />
              <span className="slider round bg-orange-500"></span>
            </label>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Login Notifications</h3>
            <p className="text-gray-600">Receive email alerts for new logins</p>
          </div>
          <div className="flex items-center">
            <label className="switch">
              <input
                type="checkbox"
                checked={securitySettings.loginNotifications}
                onChange={() => handleSecurityToggle('loginNotifications')}
              />
              <span className="slider round bg-orange-500"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg">
        <button 
          className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 flex items-center justify-center"
          onClick={() => {/* Logout logic */}}
        >
          <LogOut className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded ${activeTab === 'profile' ? 'bg-orange-600 text-white' : 'bg-white text-orange-600'}`}
            >
              Profile
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2 rounded ${activeTab === 'security' ? 'bg-orange-600 text-white' : 'bg-white text-orange-600'}`}
            >
              Security
            </button>
          </div>
        </div>

        {activeTab === 'profile' ? renderProfileSection() : renderSecuritySection()}
      </div>

      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        input:checked + .slider {
          background-color: #f97316;
        }
        input:checked + .slider:before {
          transform: translateX(26px);
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;