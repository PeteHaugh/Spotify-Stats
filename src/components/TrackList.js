import { formatDuration } from "../utils";
import { StyledTrackList } from "../styles";
import { useState } from "react";
import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TrackList = ({ tracks, play }) => {
  const [selected, setSelected] = useState(0);

  return (
    <>
      {tracks && tracks.length ? (
        <StyledTrackList>
          <TransitionGroup>
            {tracks.map((track, i) => (
              <CSSTransition
                key={i}
                timeout={0}
                transitionName="item"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                <li
                  className={
                    selected === i ? "track__item__selected" : "track__item"
                  }
                  key={i}
                  onClick={() => {
                    setSelected(i);
                  }}
                >
                  <div className="track__item__num">{i + 1}</div>
                  <div className="track__item__title-group">
                    {track.album.images.length && track.album.images[2] && (
                      <div className="track__item__img">
                        <img src={track.album.images[2].url} alt={track.name} />
                      </div>
                    )}
                    <div className="track__item__name-artist">
                      <div className="track__item__name overflow-ellipsis">
                        {track.name}
                      </div>
                      <div className="track__item__artist overflow-ellipsis">
                        {track.artists.map((artist, i) => (
                          <span key={i}>
                            {artist.name}
                            {i !== track.artists.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="track__item__album overflow-ellipsis">
                    {track.album.name}
                  </div>
                  <div className="track__item__duration">
                    {formatDuration(track.duration_ms)}
                  </div>
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </StyledTrackList>
      ) : (
        <p className="empty-notice">No tracks available</p>
      )}

      <Spacer>
        {play && (
          <video display="none" controls="" autoplay="" name="media">
            <source src={tracks[selected].preview_url} type="audio/mpeg" />
          </video>
        )}
      </Spacer>
    </>
  );
};

export default TrackList;

const Spacer = styled.div`
  height: 200px;
  width: 50px;
`;
