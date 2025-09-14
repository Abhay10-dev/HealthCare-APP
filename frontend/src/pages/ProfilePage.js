import React, { useState } from 'react';
import { User, Phone, Mail, Calendar, Heart, AlertTriangle, Upload, Save, Edit, XCircle, PlusCircle, Trash2, Camera } from 'lucide-react';

const ProfilePage = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    age: user?.age || '',
    bloodGroup: user?.bloodGroup || '',
    allergies: user?.allergies.join(', ') || '',
    conditions: user?.conditions.join(', ') || '',
    emergencyContacts: user?.emergencyContacts || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmergencyContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = formData.emergencyContacts.map((contact, i) =>
      i === index ? { ...contact, [name]: value } : contact
    );
    setFormData(prev => ({ ...prev, emergencyContacts: updatedContacts }));
  };

  const addEmergencyContact = () => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, { name: '', relationship: '', phone: '' }],
    }));
  };

  const removeEmergencyContact = (index) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // In a real app, you would send this data to your backend
    const updatedUser = {
      ...user,
      ...formData,
      allergies: formData.allergies.split(', ').map(item => item.trim()).filter(item => item !== ''),
      conditions: formData.conditions.split(', ').map(item => item.trim()).filter(item => item !== ''),
      profileImage: profileImage,
    };
    setUser(updatedUser);
    setIsEditing(false);
    alert('Profile updated successfully!');
    console.log('Saving profile:', updatedUser);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Image Section */}
        <div className="md:col-span-1 flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg">
          <div className="relative w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-16 h-16 text-gray-500" />
            )}
            {isEditing && (
              <label htmlFor="profile-image-upload" className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
                <Camera className="w-5 h-5 text-white" />
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
          <p className="text-gray-600 text-sm">{user?.email}</p>
        </div>

        {/* Personal Details Section */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Personal Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? 'focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? 'focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? 'focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? 'focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? 'focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'}`}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Allergies (comma-separated)</label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                readOnly={!isEditing}
                rows="2"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? 'focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'}`}
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Medical Conditions (comma-separated)</label>
              <textarea
                name="conditions"
                value={formData.conditions}
                onChange={handleChange}
                readOnly={!isEditing}
                rows="2"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? 'focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'}`}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency SOS Details Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Emergency SOS Details</h3>
        {formData.emergencyContacts.length === 0 && !isEditing ? (
          <p className="text-gray-600">No emergency contacts added.</p>
        ) : (
          formData.emergencyContacts.map((contact, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-md relative">
              {isEditing && (
                <button
                  type="button"
                  onClick={() => removeEmergencyContact(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                <input
                  type="text"
                  name="name"
                  value={contact.name}
                  onChange={(e) => handleEmergencyContactChange(index, e)}
                  readOnly={!isEditing}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? 'focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Relationship</label>
                <input
                  type="text"
                  name="relationship"
                  value={contact.relationship}
                  onChange={(e) => handleEmergencyContactChange(index, e)}
                  readOnly={!isEditing}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? 'focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={contact.phone}
                  onChange={(e) => handleEmergencyContactChange(index, e)}
                  readOnly={!isEditing}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${isEditing ? 'focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'}`}
                />
              </div>
            </div>
          ))
        )}
        {isEditing && (
          <button
            type="button"
            onClick={addEmergencyContact}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm mt-4"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add Emergency Contact</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;