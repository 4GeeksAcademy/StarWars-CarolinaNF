import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const getImageURL = (type, uid) => {
  if (type === "people") return `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`;
  if (type === "planets") return `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`;
  if (type === "vehicles") return `https://starwars-visualguide.com/assets/img/vehicles/${uid}.jpg`;
  return "https://starwars-visualguide.com/assets/img/placeholder.jpg";
};

export const Single = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/${type}/${id}`)
      .then(res => res.json())
      .then(result => setData(result.result?.properties || {}))
      .catch(() => setData({}));
  }, [type, id]);

  if (!data) return <h1 className="text-center mt-5">Loading...</h1>;

  const { name="Unknown", height="N/A", mass="N/A", hair_color="N/A", eye_color="N/A", gender="N/A" } = data;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={getImageURL(type, id)}
            className="img-fluid"
            onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
          />
        </div>
        <div className="col-md-6">
          <h1>{name}</h1>
          <div className="row text-danger text-center mt-4">
            <div className="col"><p>Height</p><p>{height}</p></div>
            <div className="col"><p>Mass</p><p>{mass}</p></div>
            <div className="col"><p>Hair</p><p>{hair_color}</p></div>
            <div className="col"><p>Eyes</p><p>{eye_color}</p></div>
            <div className="col"><p>Gender</p><p>{gender}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};