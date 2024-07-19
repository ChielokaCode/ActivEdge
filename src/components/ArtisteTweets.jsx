import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ArtisteTweets = () => {
  const [artisteTweets, setArtisteTweets] = useState([]);
  const [comments, setComments] = useState({});
  const [visiblePostId, setVisiblePostId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}/posts`
        );
        const data = await response.json();
        setArtisteTweets(data);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchTweets();
  }, [userId]);

  const handleShowComment = async (postId) => {
    if (visiblePostId === postId) {
      setVisiblePostId(null);
    } else {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
        );
        const data = await response.json();
        setComments((prevComments) => ({ ...prevComments, [postId]: data }));
        setVisiblePostId(postId);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
  };

  const handleSubmit = async (event, postId) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/comments",
        {
          postId,
          body: newComment,
          name: "Anonymous", // Replace with actual data if available
          email: "anonymous@example.com", // Replace with actual data if available
        }
      );

      setComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), response.data],
      }));

      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleEditComment = async (event, commentId) => {
    event.preventDefault();

    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/comments/${commentId}`,
        {
          body: newComment,
        }
      );

      // Update comments state
      setComments((prevComments) => {
        const updatedComments = prevComments[visiblePostId].map((comment) =>
          comment.id === commentId ? { ...comment, body: newComment } : comment
        );
        return { ...prevComments, [visiblePostId]: updatedComments };
      });

      setNewComment("");
      setEditCommentId(null); // Reset edit state
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/comments/${commentId}`
      );

      // Update comments state
      setComments((prevComments) => {
        const filteredComments = prevComments[visiblePostId].filter(
          (comment) => comment.id !== commentId
        );
        return { ...prevComments, [visiblePostId]: filteredComments };
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="font-bold text-xl m-4 cursor-pointer"
        onClick={handleGoBack}
      >
        Go Back
      </button>
      <h1 className="text-3xl font-bold">Artiste Tweets</h1>
      <br />
      <div className="space-y-2">
        {artisteTweets.map((tweet) => (
          <div
            key={tweet.id}
            className="flex flex-col rounded-lg shadow-lg bg-white text-left cursor-pointer p-4 capitalize"
          >
            <div className="space-y-2">
              <h1 className="font-bold">Post Title:</h1>
              {tweet.title}
              <h1 className="font-bold">Post Body:</h1>
              {tweet.body}
            </div>

            {visiblePostId === tweet.id && (
              <form
                onSubmit={(e) => handleSubmit(e, tweet.id)}
                className="mt-4"
              >
                <label
                  htmlFor="comment"
                  className="block text-lg font-semibold"
                >
                  Post Comment:
                </label>
                <input
                  type="text"
                  id="comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write Comment here"
                  className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
                />
                <button
                  type="submit"
                  className="mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mb-2"
                >
                  Post
                </button>
              </form>
            )}

            <button
              className="hover:scale-90 cursor-pointer bg-green-300 p-4"
              onClick={() => handleShowComment(tweet.id)}
            >
              {visiblePostId === tweet.id ? "Hide Comments" : "Show Comments"}
            </button>

            {visiblePostId === tweet.id && (
              <div className="mt-4 space-y-2">
                {comments[tweet.id]?.map((comment) => (
                  <div
                    key={comment.id}
                    className="border p-2 rounded-lg bg-gray-100"
                  >
                    <h2 className="font-bold">{comment.name}</h2>
                    <p className="text-sm text-gray-600">{comment.email}</p>
                    <p className="mt-2">{comment.body}</p>

                    <div className="flex flex-col">
                      <form
                        onSubmit={(e) => handleEditComment(e, comment.id)}
                        className="mt-2"
                      >
                        <label
                          htmlFor={`edit-comment-${comment.id}`}
                          className="block text-lg font-semibold"
                        >
                          Edit Comment:
                        </label>
                        <input
                          type="text"
                          id={`edit-comment-${comment.id}`}
                          value={editCommentId === comment.id ? newComment : ""}
                          onChange={(e) => {
                            setNewComment(e.target.value);
                            setEditCommentId(comment.id);
                          }}
                          placeholder="Edit Comment here"
                          className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
                        />
                        <button
                          type="submit"
                          className="mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mb-2"
                        >
                          Edit
                        </button>
                      </form>
                      <button
                        className="hover:scale-90 cursor-pointer bg-red-300 p-4"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtisteTweets;
