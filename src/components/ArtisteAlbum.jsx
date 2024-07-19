import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ArtisteAlbum = () => {
  const [artisteAlbum, setArtisteAlbum] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchUsers = async () => {
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

  const handleAlbumDetails = (albumId) => {
    navigate(`/album-details/${albumId}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4">
      <button className="font-bold text-xl" onClick={handleGoBack}>
        Go Back
      </button>
      <h1 className="text-3xl font-bold">Artiste Albums</h1>
      <br />
      <div className="space-y-2">
        {artisteAlbum.map((album) => (
          <div
            key="{album.id}"
            className="flex flex-col rounded-lg shadow-lg bg-white text-left cursor-pointer p-4 capitalize"
          >
            <h1 className="font-bold">Album Title: </h1>
            {album.title}
            <div className="flex justify-evenly">
              <button
                className="hover:scale-110 bg-green-300 p-4"
                onClick={() => handleAlbumDetails(album.id)}
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
