import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const AlbumDetails = () => {
  const [albumDetails, setAlbumDetails] = useState([]);
  const { albumId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchUsers = async () => {
      console.log(albumId);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
        );
        const data = await response.json();
        setAlbumDetails(data);
      } catch (error) {
        console.error("Error fetching album details:", error);
      }
    };

    // Call the fetch function
    fetchUsers();
  }, [albumId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="font-bold text-xl cursor-pointer"
        onClick={handleGoBack}
      >
        Go Back
      </button>
      <h1 className="text-3xl font-bold mb-4 mt-4">Album Details</h1>
      <div className="space-y-4">
        {albumDetails.map((album) => (
          <div
            key={album.id}
            className="flex items-center rounded-lg shadow-lg bg-white p-4"
          >
            <Link to={album.url}>
              <img
                src={album.thumbnailUrl}
                alt={album.title}
                className="w-32 h-32 rounded-lg object-cover mr-4"
              />
            </Link>
            <div>
              <h2 className="text-xl font-semibold">Photo Title:</h2>
              <p className="text-lg capitalize">{album.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumDetails;
