import React, { useContext, useEffect, useState } from 'react';
import { DocotorContext } from '../../Context/DoctorContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const {
    backenUrl,
    dToken,
    profileData,
    setProfileData,
    getProfileData,
  } = useContext(DocotorContext);

  const [editMode, setEditMode] = useState(false);
  const [fee, setFee] = useState('');
  const [available, setAvailable] = useState(false);
  const [address, setAddress] = useState({ line1: '', line2: '' });

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setFee(profileData.fee);
      setAvailable(profileData.available);
      setAddress(profileData.address || { line1: '', line2: '' });
    }
  }, [profileData]);

  const handleSave = async () => {
    try {
      const {data} = await axios.post(
        `${backenUrl}/api/doctor/update-profile`,
        { fee, address, available },
        { headers: {  dToken } }
      );

      if (data.success) {
        getProfileData(); // refresh data
        setEditMode(false);
        toast.success(data.message)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    profileData && (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded shadow-xl p-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Image */}
          <div className="col-span-1 flex justify-center">
            <img
              src={profileData.image}
              alt="Doctor"
              className="w-40 h-40 rounded-full object-cover shadow-md border-4 border-blue-600"
            />
          </div>

          {/* Profile Info */}
          <div className="col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {profileData.name}
            </h2>
            <p className="text-gray-600 text-sm">
              {profileData.degree} - {profileData.speciality}
            </p>
            <p>
              <span className="inline-block bg-green-100 text-blue-600 text-sm px-3 py-1 rounded-full">
                {profileData.experience} Years Experience
              </span>
            </p>

            {/* About */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">About:</h3>
              <p className="text-gray-600">{profileData.about}</p>
            </div>

            {/* Fee */}
            <p className="text-gray-800 font-medium">
              Appointment Fee:{' '}
              {!editMode ? (
                <span className="text-blue-600 font-semibold">${fee}</span>
              ) : (
                <input
                  type="number"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="border px-2 py-1 rounded w-32"
                />
              )}
            </p>

            {/* Address */}
            <div>
              <h4 className="text-md font-semibold text-gray-700">Address:</h4>
              {!editMode ? (
                <p className="text-gray-600">
                  {address.line1}
                  <br />
                  {address.line2}
                </p>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={address.line1}
                    onChange={(e) =>
                      setAddress({ ...address, line1: e.target.value })
                    }
                    placeholder="Line 1"
                    className="border px-2 py-1 rounded w-full"
                  />
                  <input
                    type="text"
                    value={address.line2}
                    onChange={(e) =>
                      setAddress({ ...address, line2: e.target.value })
                    }
                    placeholder="Line 2"
                    className="border px-2 py-1 rounded w-full"
                  />
                </div>
              )}
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={available}
                onChange={() => setAvailable(!available)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-gray-700">Available</label>
            </div>

            {/* Edit/Save Buttons */}
            <div>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-400 transition duration-200"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-500 transition duration-200"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
