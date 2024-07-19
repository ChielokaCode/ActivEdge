import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchUsers = async () => {
      console.log(userId);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    // Call the fetch function
    fetchUsers();
  }, [userId]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Artiste Profile</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">Name:</h2>
            <span className="ml-2 text-gray-700">{userProfile.name}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Username:</h2>
            <span className="ml-2 text-gray-700">{userProfile.username}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Email:</h2>
            <span className="ml-2 text-gray-700">{userProfile.email}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Phone:</h2>
            <span className="ml-2 text-gray-700">{userProfile.phone}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Website:</h2>
            <span className="ml-2 text-gray-700">{userProfile.website}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Company:</h2>
            <span className="ml-2 text-gray-700">
              {userProfile.company?.name}
            </span>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Catch Phrase:</h3>
              <span className="ml-2 text-gray-700">
                {userProfile.company?.catchPhrase}
              </span>
              <h3 className="text-lg font-semibold">BS:</h3>
              <span className="ml-2 text-gray-700">
                {userProfile.company?.bs}
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Address:</h2>
            <div className="ml-4 space-y-2">
              <div>
                <h3 className="text-lg font-semibold">Street:</h3>
                <span className="ml-2 text-gray-700">
                  {userProfile.address?.street}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Suite:</h3>
                <span className="ml-2 text-gray-700">
                  {userProfile.address?.suite}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">City:</h3>
                <span className="ml-2 text-gray-700">
                  {userProfile.address?.city}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Zipcode:</h3>
                <span className="ml-2 text-gray-700">
                  {userProfile.address?.zipcode}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Geo:</h3>
                <div className="ml-4">
                  <h4 className="text-md font-medium">Lat:</h4>
                  <span className="ml-2 text-gray-700">
                    {userProfile.address?.geo?.lat}
                  </span>
                  <h4 className="text-md font-medium">Lng:</h4>
                  <span className="ml-2 text-gray-700">
                    {userProfile.address?.geo?.lng}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
