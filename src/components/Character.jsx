import { character } from "../../data/data";


function Character({ character,children }) {
  return (
    <div className="character">
      <div className="image">
        <img src={character.image} alt={character.name} />
      </div>
      <div className="detail">
        <div className="name">
          <span>{character.gender === "Male" ? "🧑" : "👩"}</span>
          <span>{character.name}</span>
        </div>
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
      </div>
      {children}
    </div>
  );
}

export default Character;
