import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";
import CustomForm from "./CustomForm";

const ArtisteTweets = () => {
  const [artisteTweets, setArtisteTweets] = useState([]);
  const [comments, setComments] = useState({});
  const [visiblePostId, setVisiblePostId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [newCommentError, setNewCommentError] = useState("");
  const [editCommentError, setEditCommentError] = useState("");
  const [userProfile, setUserProfile] = useState({});
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

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchUsers = async () => {
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

    //Validation check to check that no null values
    if (newComment.trim() === "") {
      setNewCommentError("Comment cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/comments",
        {
          postId,
          body: newComment,
          name: userProfile.name,
          email: userProfile.email,
        }
      );

      setComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), response.data],
      }));

      setNewComment("");
      setNewCommentError(""); // Clear error message
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleEditComment = async (event, commentId) => {
    event.preventDefault();

    //Validation check to check that no null values
    if (editComment.trim() === "") {
      setEditCommentError("Comment cannot be empty");
      return;
    }

    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/comments/${commentId}`,
        {
          body: editComment,
        }
      );

      setComments((prevComments) => {
        const updatedComments = prevComments[visiblePostId].map((comment) =>
          comment.id === commentId ? { ...comment, body: editComment } : comment
        );
        return { ...prevComments, [visiblePostId]: updatedComments };
      });

      setEditComment("");
      setEditCommentId(null);
      setEditCommentError(""); // Clear error message
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/comments/${commentId}`
      );

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

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
    setNewCommentError(""); // Clear error message while typing
  };

  const handleEditCommentChange = (event) => {
    setEditComment(event.target.value);
    setEditCommentError(""); // Clear error message while typing
  };

  const startEditComment = (comment) => {
    setEditCommentId(comment.id);
    setEditComment(comment.body); // Set the comment body for editing
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
              <CustomForm
                onSubmit={(e) => handleSubmit(e, tweet.id)}
                formStyling="mt-4"
                htmlFor={"comment"}
                labelStyling={"block text-lg font-semibold"}
                labelText={"Post Comment:"}
                inputId={"comment"}
                inputValue={newComment}
                inputOnChange={handleNewCommentChange}
                inputPlaceholder={"Write Comment here"}
                inputClassName={`mt-2 p-2 border border-gray-300 rounded-lg w-full ${
                  newCommentError ? "border-red-500" : ""
                }`}
                commentError={
                  newCommentError && (
                    <p className="text-red-500 text-sm">{newCommentError}</p>
                  )
                }
                buttonText={"Post"}
              />
            )}

            <Button
              styling="hover:bg-green-400 text-center cursor-pointer bg-green-300 p-4 m-2"
              onClick={() => handleShowComment(tweet.id)}
              text={
                visiblePostId === tweet.id ? "Hide Comments" : "Show Comments"
              }
            />

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
                      {editCommentId === comment.id ? (
                        <CustomForm
                          onSubmit={(e) => handleEditComment(e, comment.id)}
                          formStyling="mt-2"
                          htmlFor={`edit-comment-${comment.id}`}
                          labelStyling={"block text-lg font-semibold"}
                          labelText={"Edit Comment:"}
                          inputId={`edit-comment-${comment.id}`}
                          inputValue={editComment}
                          inputOnChange={handleEditCommentChange}
                          inputPlaceholder={"Edit Comment here"}
                          inputClassName={`mt-2 p-2 border border-gray-300 rounded-lg w-full ${
                            editCommentError ? "border-red-500" : ""
                          }`}
                          commentError={
                            editCommentError && (
                              <p className="text-red-500 text-sm">
                                {editCommentError}
                              </p>
                            )
                          }
                          buttonText={"Edit"}
                        />
                      ) : (
                        <Button
                          styling={
                            "mt-2 text-center bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 mb-2 text-black"
                          }
                          onClick={() => startEditComment(comment)}
                          text={"Edit"}
                        />
                      )}
                      <Button
                        styling="hover:bg-red-400 text-center cursor-pointer bg-red-300 p-4"
                        onClick={() => handleDeleteComment(comment.id)}
                        text="Delete"
                      />
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
