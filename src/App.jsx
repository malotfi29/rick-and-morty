import { useEffect, useRef, useState } from "react";
import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Episodes from "./components/Episodes";
import Navbar from "./components/Navbar";
import { allCharacters, character, episodes } from "/data/data";
import Loader from "./components/Loader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "./components/Modal";

function App() {
  

    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    const [favorites, setFavorites] = useState(
      () => JSON.parse(localStorage.getItem("FAVORITES")) || []
      );

    useEffect(() => {
      async function fetchData() {
        try {
          setIsLoading(true);
          const { data } = await axios.get(
            `https://rickandmortyapi.com/api/character?name=${query}`
          );

          setCharacters(data.results.slice(0, 5));
        } catch (err) {
          setCharacters([]);
          toast.error(err.response.data.error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    }, [query]);

  useEffect(()=>{
    localStorage.setItem("FAVORITES",JSON.stringify(favorites))
  },[favorites])
    const handleSelectCharacter = (id) => {
      setSelectedId((prevId) => (prevId === id ? null : id));
    };

    const handleFavorites = (character) => {
      setFavorites((prevFav) => [...prevFav, character]);
    };
    const isAddedToFav = favorites.map((fav) => fav.id).includes(selectedId);

    const handleDeleteFavorites = (id) => {
      setFavorites((prevFav) => prevFav.filter((fav) => fav.id !== id));
    };

    return (
      <div className="app">
        <Toaster />
        <Navbar
          characters={characters}
          query={query}
          setQuery={setQuery}
          favorites={favorites}
          onDeleteFavorite={handleDeleteFavorites}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <CharacterList
            characters={characters}
            onSelectCharacter={handleSelectCharacter}
            selectedId={selectedId}
          />
        )}
        <CharacterDetails
          selectedId={selectedId}
          character={character}
          isLoading={isLoading}
          onAddToFavorites={handleFavorites}
          isAddedToFav={isAddedToFav}
        />
        {/* <Episodes episodes={episodes} character={character} /> */}
      </div>
    );
}

export default App;
