import React, { useEffect } from "react";
import { FiArrowUpCircle } from "react-icons/fi";

function Episodes({ episodes,character }) {
  if (!character) return null;

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes</h2>
        <button>
          <FiArrowUpCircle className="icon" />
        </button>
      </div>
      {episodes.map((episode, index) => (
        <div className="episode-detail" key={episode.id}>
          <div>
            <span>{String(index + 1).padStart(2, "0")}- </span>
            <span>{episode.episode}: </span>
            <span style={{ fontWeight: "bold" }}>{episode.name}</span>
          </div>
          <span className="btn">{episode.air_date}</span>
        </div>
      ))}
    </div>
  );
}

export default Episodes;
