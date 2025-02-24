import { useState } from "react";

function Favourites() {
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );

  const toggleFavourite = (episode) => {
    const updatedFavourites = favourites.filter((fav) => fav.id !== episode.id);
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <div>
      <h1>Favourites</h1>
      <ul>
        {favourites.map((episode) => (
          <li key={episode.id}>
            <h3>{episode.title}</h3>
            <p>Favourited on: {episode.date}</p>
            <button onClick={() => toggleFavourite(episode)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favourites;