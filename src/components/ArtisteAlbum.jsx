import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArtisteAlbum = () => {
  const [artisteAlbum, setArtisteAlbum] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchUsers = async () => {
      console.log(userId);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
        );
        const data = await response.json();
        setArtisteAlbum(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    // Call the fetch function
    fetchUsers();
  }, [userId]);

  const handleAlbumDetails = (AlbumId) => {
    Navigate(`/album-details/${AlbumId}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">ArtisteAlbum</h1>
      <br />
      <div className="space-y-2">
        {artisteAlbum.map((user) => (
          <div
            key="{user.id}"
            className="flex flex-col rounded-lg shadow-lg bg-gray-300 text-left cursor-pointer p-4 capitalize"
          >
            {user.title}
            <div className="flex justify-between">
              <button
                className="hover:scale-110 bg-green-300 p-4"
                onClick={() => handleAlbumDetails(user.id)}
              >
                View Album Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtisteAlbum;
