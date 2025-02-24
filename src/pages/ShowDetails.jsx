import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );
  const [loading, setLoading] = useState(true);
  const [currentPlaying, setCurrentPlaying] = useState(null);

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

  const handlePlay = (audioId) => {
    if (currentPlaying && currentPlaying !== audioId) {
      const previousAudio = document.getElementById(currentPlaying);
      if (previousAudio) {
        previousAudio.pause();
        previousAudio.currentTime = 0;
      }
    }
    setCurrentPlaying(audioId);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container show-details">
      <Link to="/">Back to Shows</Link>
      <h1>{show.title}</h1>
      <img src={show.image} alt={show.title} style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }} />
      <p>{show.description}</p>

      <h2>Seasons</h2>
      <select
        className="season-dropdown"
        onChange={(e) => setSelectedSeason(show.seasons[e.target.value])}
      >
        <option value="">Select a Season</option>
        {show.seasons.map((season, index) => (
          <option key={season.id} value={index}>
            {season.title}
          </option>
        ))}
      </select>

      {selectedSeason && (
        <div>
          <h3>{selectedSeason.title}</h3>
          <img src={selectedSeason.image} alt={selectedSeason.title} style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }} />
          <ul className="episode-list">
            {selectedSeason.episodes.map((episode) => (
              <li key={episode.id} className="episode-item">
                <h3>{episode.title}</h3>
                <button onClick={() => toggleFavourite(episode)}>
                  {favourites.some((fav) => fav.id === episode.id) ? "⭐" : "☆"}
                </button>
                <audio
                  className="audio-player"
                  id={`audio-${episode.id}`}
                  controls
                  onPlay={() => handlePlay(`audio-${episode.id}`)}
                >
                  <source src={episode.file} type="audio/mpeg" />
                </audio>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShowDetails;