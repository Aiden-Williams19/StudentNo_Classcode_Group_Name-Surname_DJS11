import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
        setLoading(false);
      });
  }, [id]);

  const toggleFavourite = (episode) => {
    let updatedFavourites;

    // Check if the episode is already in favourites
    if (favourites.some((fav) => fav.id === episode.id)) {
      // Remove the episode from favourites
      updatedFavourites = favourites.filter((fav) => fav.id !== episode.id);
    } else {
      // Add the episode to favourites
      updatedFavourites = [...favourites, { ...episode, date: new Date().toLocaleString() }];
    }

    // Update state and localStorage
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{show.title}</h1>
      <p>{show.description}</p>

      <h2>Seasons</h2>
      <ul>
        {show.seasons.map((season) => (
          <li key={season.id} onClick={() => setSelectedSeason(season)}>
            {season.title}
          </li>
        ))}
      </ul>

      {selectedSeason && (
        <div>
          <h3>{selectedSeason.title}</h3>
          <ul>
            {selectedSeason.episodes.map((episode) => (
              <li key={episode.id}>
                {episode.title}
                <button onClick={() => toggleFavourite(episode)}>
                  {favourites.some((fav) => fav.id === episode.id) ? "⭐" : "☆"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShowDetails;