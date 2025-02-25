import { useState } from "react";

function Favourites() {
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );
  const [sortBy, setSortBy] = useState("title-asc"); 

  const toggleFavourite = (episode) => {
    const updatedFavourites = favourites.filter((fav) => fav.id !== episode.id);
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  const sortedFavourites = [...favourites].sort((a, b) => {
    if (sortBy === "title-asc") return a.title.localeCompare(b.title); // A-Z
    if (sortBy === "title-desc") return b.title.localeCompare(a.title); // Z-A
    if (sortBy === "date-recent") return new Date(b.date) - new Date(a.date); // Most recent
    if (sortBy === "date-oldest") return new Date(a.date) - new Date(b.date); // Oldest
    return 0;
  });

  const groupedFavourites = sortedFavourites.reduce((acc, episode) => {
    if (!acc[episode.showTitle]) acc[episode.showTitle] = {};
    if (!acc[episode.showTitle][episode.seasonTitle])
      acc[episode.showTitle][episode.seasonTitle] = [];
    acc[episode.showTitle][episode.seasonTitle].push(episode);
    return acc;
  }, {});

  return (
    <div className="container">
      <h1>Favourites</h1>

      <select
        className="sort-dropdown"
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="date-recent">Most Recent</option>
        <option value="date-oldest">Oldest</option>
      </select>

      {Object.entries(groupedFavourites).map(([showTitle, seasons]) => (
        <div key={showTitle} className="favourites-group">
          <h2>{showTitle}</h2>
          {Object.entries(seasons).map(([seasonTitle, episodes]) => (
            <div key={seasonTitle} className="season-group">
              <h3>{seasonTitle}</h3>
              <ul className="episode-list">
                {episodes.map((episode) => (
                  <li key={episode.id} className="episode-item">
                    <h4>{episode.title}</h4>
                    <p>Favourited on: {episode.date}</p>
                    <button onClick={() => toggleFavourite(episode)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Favourites;