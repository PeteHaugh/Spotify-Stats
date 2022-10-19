import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import {
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks,
} from "../Spotify";
import {
  SectionWrapper,
  ArtistsGrid,
  TrackList,
  PlaylistsGrid,
  Loader,
  AppLayout,
} from "../components";
import { StyledHeader } from "../styles";
import styled from "styled-components";
import { SkipForward } from "phosphor-react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [play, setPlay] = useState(false);
  const [sequence, setSequence] = useState(0);

  const toggle = () => {
    setPlay(!play);
    setSequence(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);

      const userTopArtists = await getTopArtists();
      setTopArtists(userTopArtists.data);

      const userTopArtistsTracks = await getTopArtists();
      setTopArtists(userTopArtistsTracks.data);

      const userTopTracks = await getTopTracks();
      setTopTracks(userTopTracks.data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      <FreeButton onClick={() => toggle()}>Play</FreeButton>
      {profile && sequence === 0 && (
        <StyledHeader type="user">
          <div className="header__inner">
            {profile.images.length && profile.images[0].url && (
              <img
                className="header__img"
                src={profile.images[0].url}
                alt="Avatar"
              />
            )}
            <div>
              <div className="header__overline">Hello,</div>
              <h1 className="header__name">{profile.display_name}</h1>

              <h2 className="header__underline">Want to see you top tracks?</h2>
            </div>
          </div>
        </StyledHeader>
      )}

      {topTracks && sequence === 1 && (
        <MainDiv>
          <SectionWrapper title="Top tracks this month">
            {/* seeAllLink="/top-tracks" */}
            <TrackList tracks={topTracks.items.slice(0, 15)} play={play} />
          </SectionWrapper>
        </MainDiv>
      )}
    </>
  );
};

export default Profile;

const FreeButton = styled.button`
  position: absolute;
  z-index: 999;
  left: 830px;
  top: 600px;
  width: 80px;
  height: 80px;
  background-color: var(--black);
  border-radius: 2px;
`;

const MainDiv = styled.div`
  position: relative;
  height: 100vh;

  > div {
    background: var(--black);
    opacity: 0.7;
  }

  > div > h1 {
    position: absolute;
    bottom: 50px;
    left: 50px;
  }
`;
