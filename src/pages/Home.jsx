import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((res) => res.json())
      .then((data) => setShows(data));
  }, []);

  return (
    <div>
      <h1>Available Shows</h1>
      <ul>
            {shows.map((show) => (
            <li key={show.id}>
                <Link to={`/show/${show.id}`}>{show.title}</Link>
            </li>
        ))}
        </ul>
    </div>
  );
}

export default Home;
