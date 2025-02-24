import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((res) => res.json())
      .then((data) => {
        setShows(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Available Shows</h1>
      <div className="show-list">
        {shows.map((show) => (
          <div key={show.id} className="show-card">
            <Link to={`/show/${show.id}`}>
              <img src={show.image} alt={show.title} />
              <h2>{show.title}</h2>
              <p>Seasons: {show.seasons.length}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;