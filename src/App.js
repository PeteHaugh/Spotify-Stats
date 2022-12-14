import { useState, useEffect, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { accessToken, logout } from "./Spotify";
import {
  Login,
  Playlists,
  Profile,
  Playlist,
  TopArtists,
  TopTracks,
} from "./pages";
import { GlobalStyle } from "./styles";
import { AppLayout } from "./components/index";
import styled from "styled-components/macro";

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="app">
      <GlobalStyle />

      {!token ? (
        <Login />
      ) : (
        <>
          <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
          <Router>
            <ScrollToTop />

            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/top-artists" element={<TopArtists />}></Route>
                <Route path="/top-tracks" element={<TopTracks />}></Route>
                <Route path="/" element={<Profile />}></Route>
              </Route>
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
