import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((data) => setShow(data));
  }, [id]);

  if (!show) return <p>Loading...</p>;

  return (
    <div>
      <h1>{show.title}</h1>
      <p>{show.description}</p>

      <h2>Seasons</h2>
      <ul>
        {show.seasons.map((season, index) => (
          <li key={index} onClick={() => setSelectedSeason(season)}>
            {season.title}
          </li>
        ))}
      </ul>

      {selectedSeason && (
        <div>
          <h3>{selectedSeason.title}</h3>
          <ul>
            {selectedSeason.episodes.map((episode) => (
              <li key={episode.id}>{episode.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


export default ShowDetails;
