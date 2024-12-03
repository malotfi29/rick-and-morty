import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { FiArrowUpCircle } from "react-icons/fi";

function CharacterDetails({ selectedId, onAddToFavorites, isAddedToFav }) {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function selectCharacter() {
      try {
        setIsLoading(true);
        setCharacter(null);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodeData].flat().slice(0, 5));
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) selectCharacter();
  }, [selectedId]);

  if (isLoading) return <Loader />;

  if (!character || !selectedId)
    return (
      <div style={{ color: "white", fontSize: "1.5rem" }}>
        Please select a character
      </div>
    );

  return (
    <div>
      <CharacterSubInfo
        character={character}
        onAddToFavorites={onAddToFavorites}
        isAddedToFav={isAddedToFav}
      />
      <CharacterEpisode episodes={episodes} />
    </div>
  );
}

export default CharacterDetails;

function CharacterSubInfo({ character, onAddToFavorites, isAddedToFav }) {
  return (
    <div className="character-details">
      <img src={character.image} alt={character.name} />
      <div className="details">
        <h3>
          <span>{character.gender === "Male" ? "🧑" : "👩"}</span>
          <span>{character.name}</span>
        </h3>
        <div className="situation">
          <div
            className={`status ${
              character.status === "Dead" ? "red" : "green"
            }`}
          ></div>
          <span>
            {character.status}-{character.species}
          </span>
        </div>
        <div className="character-location">
          <p className="location-title">Last known location</p>
          <p>{character.location.name}</p>
        </div>
        {isAddedToFav ? (
          <p>Already added to favorites</p>
        ) : (
          <button className="btn" onClick={() => onAddToFavorites(character)}>
            Add to favorites
          </button>
        )}
      </div>
    </div>
  );
}

function CharacterEpisode({ episodes }) {
  const [sortBy, setSortBy] = useState(true);
  let sortedEpisodes;
  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  }else{
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes</h2>
        <button onClick={() => setSortBy((is) => !is)}>
          <FiArrowUpCircle className="icon" style={{rotate:sortBy? "0deg" : "180deg"}} />
        </button>
      </div>
      {sortedEpisodes.map((episode, index) => (
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
