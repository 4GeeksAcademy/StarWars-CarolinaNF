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
      .then((res) => res.json())
      .then((result) => setData(result.result?.properties || {}))
      .catch((error) => {
        console.log("Error loading single:", error);
        setData({});
      });
  }, [type, id]);

  if (!data) return <h1 className="text-center mt-5">Loading...</h1>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={getImageURL(type, id)}
            className="img-fluid"
            alt={data.name || "Star Wars"}
            onError={(e) => {
              e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
            }}
          />
        </div>

        <div className="col-md-6">
          <h1>{data.name || "Unknown"}</h1>

          {type === "people" && (
            <div className="row text-danger text-center mt-4">
              <div className="col"><p>Height</p><p>{data.height || "N/A"}</p></div>
              <div className="col"><p>Mass</p><p>{data.mass || "N/A"}</p></div>
              <div className="col"><p>Hair</p><p>{data.hair_color || "N/A"}</p></div>
              <div className="col"><p>Eyes</p><p>{data.eye_color || "N/A"}</p></div>
              <div className="col"><p>Gender</p><p>{data.gender || "N/A"}</p></div>
            </div>
          )}

          {type === "planets" && (
            <div className="row text-danger text-center mt-4">
              <div className="col"><p>Climate</p><p>{data.climate || "N/A"}</p></div>
              <div className="col"><p>Terrain</p><p>{data.terrain || "N/A"}</p></div>
              <div className="col"><p>Population</p><p>{data.population || "N/A"}</p></div>
              <div className="col"><p>Diameter</p><p>{data.diameter || "N/A"}</p></div>
              <div className="col"><p>Gravity</p><p>{data.gravity || "N/A"}</p></div>
            </div>
          )}

          {type === "vehicles" && (
            <div className="row text-danger text-center mt-4">
              <div className="col"><p>Model</p><p>{data.model || "N/A"}</p></div>
              <div className="col"><p>Class</p><p>{data.vehicle_class || "N/A"}</p></div>
              <div className="col"><p>Manufacturer</p><p>{data.manufacturer || "N/A"}</p></div>
              <div className="col"><p>Cost</p><p>{data.cost_in_credits || "N/A"}</p></div>
              <div className="col"><p>Crew</p><p>{data.crew || "N/A"}</p></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};