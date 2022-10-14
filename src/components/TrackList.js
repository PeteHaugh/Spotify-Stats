import { formatDuration } from "../utils";
import { StyledTrackList } from "../styles";
import { useState, useEffect, useRef } from "react";

const TrackList = ({ tracks }) => {
  const [play, setPlay] = useState(false);
  const [hover, setHover] = useState(0);

  const toggle = () => setPlay(!play);

  return (
    <>
      {tracks && tracks.length ? (
        <StyledTrackList onMouseLeave={() => setPlay(false)}>
          {tracks.map((track, i) => (
            <li
              className="track__item"
              key={i}
              onMouseEnter={() => {
                toggle();
                setHover(i);
              }}
              onMouseLeave={() => toggle()}
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
          ))}
        </StyledTrackList>
      ) : (
        <p className="empty-notice">No tracks available</p>
      )}
      {play && (
        <video controls="" autoplay="" name="media">
          <source src={tracks[hover].preview_url} type="audio/mpeg" />
        </video>
      )}
    </>
  );
};

export default TrackList;
