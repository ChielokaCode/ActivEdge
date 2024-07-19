import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ArtisteList = () => {
  const [users, setUsers] = useState([]);
  const [isDataLoad, setDataLoad] = useState(false);
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUsers(data);
        setDataLoad(true);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching users:", error);
        setDataLoad(false);
        setError("Failed to load users. Please try again later.");
      }
    };

    // Call the fetch function
    fetchUsers();
  }, []);

  const handleUserProfile = (userId) => {
    navigate(`/user-profile/${userId}`);
  };

  const handleUserAlbum = (userId) => {
    navigate(`/user-album/${userId}`);
  };

  const handleUserTweets = (userId) => {
    navigate(`/user-tweets/${userId}`);
  };

  return (
    <div className="container mx-auto p-4 space-y-3">
      <h1 className="text-3xl font-bold">Artiste List</h1>
      <br />
      <br />
      {error && <div className="text-red-500">{error}</div>}
      {isDataLoad ? (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col rounded-lg shadow-lg bg-white text-left cursor-pointer p-4"
            >
              <h1 className="font-bold">{user.name}</h1>
              <div className="flex justify-evenly">
                <button
                  className="hover:scale-110 bg-green-300 p-4"
                  onClick={() => handleUserAlbum(user.id)}
                >
                  View Album
                </button>
                <button
                  className="hover:scale-110 bg-green-300 p-4"
                  onClick={() => handleUserProfile(user.id)}
                >
                  View Profile
                </button>
                <button
                  className="hover:scale-110 bg-green-300 p-4"
                  onClick={() => handleUserTweets(user.id)}
                >
                  Show Tweets
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !error && <div>Loading...</div> // Show loading message only if there's no error
      )}
    </div>
  );
};

export default ArtisteList;
