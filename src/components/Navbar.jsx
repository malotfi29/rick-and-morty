import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import Modal from "./Modal";
import Character from "./Character";
import { FaRegTrashAlt } from "react-icons/fa";

function Navbar({ characters, query, setQuery, favorites, onDeleteFavorite }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="navbar">
      <Modal onOpen={setIsOpen} open={isOpen} title="List of favorites">
        {favorites.map((item) => (
          <Character key={item.id}
            character={item}
            selectedId="1"
            onSelectCharacter={() => {}}
          >
            <div className="trash" onClick={()=>onDeleteFavorite(item.id)}>
              <FaRegTrashAlt />
            </div>
          </Character>
        ))}
      </Modal>
      <span className="logo">LOGO😍</span>
      <input
        type="text"
        className="search"
        placeholder="search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <span>Found {characters.length} characters</span>
      <span className="heart" onClick={() => setIsOpen((is) => !is)}>
        <CiHeart />
        <span>{favorites.length}</span>
      </span>
    </div>
  );
}

export default Navbar;
