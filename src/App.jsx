import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./output.css";

const ArtisteList = React.lazy(() => import("./components/ArtisteList"));
const UserProfile = React.lazy(() => import("./components/UserProfile"));
const ArtisteAlbum = React.lazy(() => import("./components/ArtisteAlbum"));
const AlbumDetails = React.lazy(() => import("./components/AlbumDetails"));
const ArtisteTweets = React.lazy(() => import("./components/ArtisteTweets"));

function App() {
  return (
    <div className="m-4">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-[100vh]">
                    Loading...
                  </div>
                }
              >
                <ArtisteList />
              </Suspense>
            }
          />
          <Route
            path="/user-profile/:userId"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-[100vh]">
                    Loading...
                  </div>
                }
              >
                <UserProfile />
              </Suspense>
            }
          />
          <Route
            path="/user-album/:userId"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-[100vh]">
                    Loading...
                  </div>
                }
              >
                <ArtisteAlbum />
              </Suspense>
            }
          />
          <Route
            path="/album-details/:albumId"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-[100vh]">
                    Loading...
                  </div>
                }
              >
                <AlbumDetails />
              </Suspense>
            }
          />
          <Route
            path="/user-tweets/:userId"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-[100vh]">
                    Loading...
                  </div>
                }
              >
                <ArtisteTweets />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
