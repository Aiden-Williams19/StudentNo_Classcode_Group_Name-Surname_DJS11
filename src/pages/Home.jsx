import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("title-asc"); 

  useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((res) => res.json())
      .then((data) => {
        const sortedShows = data.sort((a, b) => a.title.localeCompare(b.title));
        setShows(sortedShows);
        setLoading(false);
      });
  }, []);

  const filteredShows = selectedGenre
    ? shows.filter((show) => show.genres.includes(Number(selectedGenre)))
    : shows;

  const sortedShows = [...filteredShows].sort((a, b) => {
    if (sortBy === "title-asc") return a.title.localeCompare(b.title); 
    if (sortBy === "title-desc") return b.title.localeCompare(a.title); 
    if (sortBy === "date-recent") return new Date(b.updated) - new Date(a.updated);
    if (sortBy === "date-oldest") return new Date(a.updated) - new Date(b.updated); 
    return 0;
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Available Shows</h1>

      <div style={{ marginBottom: "1rem" }}>
        <select
          className="season-dropdown"
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{ marginRight: "1rem", padding: "0.5rem" }}
        >
          <option value="">All Genres</option>
          {Object.entries(genreTitles).map(([id, title]) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>

        <select
          className="season-dropdown"
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: "0.5rem" }}
        >
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="date-recent">Most Recent</option>
          <option value="date-oldest">Oldest</option>
        </select>
      </div>

      <div className="show-list">
        {sortedShows.map((show) => (
          <div key={show.id} className="show-card">
            <Link to={`/show/${show.id}`}>
              <img src={show.image} alt={show.title} />
              <h2>{show.title}</h2>
              <p>
                <strong>Genres:</strong>{" "}
                {show.genres.map((genreId) => genreTitles[genreId]).join(", ")}
              </p>
              <p>Seasons: {show.seasons.length}</p>
              <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;