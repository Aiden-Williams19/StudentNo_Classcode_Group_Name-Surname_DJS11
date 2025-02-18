import { useEffect, useState } from "react";

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
          <li key={show.id}>{show.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
