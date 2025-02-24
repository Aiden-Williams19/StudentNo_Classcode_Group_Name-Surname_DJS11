import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Genre mapping
const genreTitles = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

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
              <p>
                <strong>Genres:</strong>{" "}
                {show.genres.map((genreId) => genreTitles[genreId]).join(", ")}
              </p>
              <p>Seasons: {show.seasons.length}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;