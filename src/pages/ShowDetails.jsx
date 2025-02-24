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

    if (favourites.some((fav) => fav.id === episode.id)) {
      updatedFavourites = favourites.filter((fav) => fav.id !== episode.id);
    } else {
      updatedFavourites = [...favourites, { ...episode, date: new Date().toLocaleString() }];
    }

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{show.title}</h1>
      <p>{show.description}</p>

      <select onChange={(e) => setSelectedSeason(show.seasons[e.target.value])}>
        <option value="">Select a Season</option>
        {show.seasons.map((season, index) => (
          <option key={index} value={index}>{season.title}</option>
        ))}
      </select>

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