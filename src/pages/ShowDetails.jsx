import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);

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
    </div>
  );
}

export default ShowDetails;
