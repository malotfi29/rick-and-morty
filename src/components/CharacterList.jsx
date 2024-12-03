import { FiEye, FiEyeOff } from "react-icons/fi";
import Character from "./Character";

function CharacterList({ characters,onSelectCharacter,selectedId }) {
  return (
    <div className="character-list">
      {characters.map((character) => (
        <Character
          key={character.id}
          character={character}
          
        >
          <div onClick={()=>onSelectCharacter(character.id)}  className="eye">
       {selectedId===character.id ? <FiEyeOff /> :  <FiEye />}
      </div>
        </Character>
      ))}
    </div>
  );
}

export default CharacterList;
