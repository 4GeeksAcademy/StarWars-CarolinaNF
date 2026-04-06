import React, { useContext } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const getImageURL = (type, uid) => {
  if (type === "people") return `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`;
  if (type === "planets") return `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`;
  if (type === "vehicles") return `https://starwars-visualguide.com/assets/img/vehicles/${uid}.jpg`;
  return "https://starwars-visualguide.com/assets/img/placeholder.jpg";
};

const Card = ({ name, gender, hair, eyes, type, id }) => {
  const { actions } = useContext(Context);

  return (
    <div className="card" style={{ minWidth: "250px" }}>
      <img
        src={getImageURL(type, id)}
        className="card-img-top"
        alt={name}
        style={{ height: "200px", objectFit: "cover" }}
        onError={(e) => {
          e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
        }}
      />

      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Gender: {gender || "unknown"}</p>
        <p className="card-text">Hair: {hair || "unknown"}</p>
        <p className="card-text">Eyes: {eyes || "unknown"}</p>

        <div className="d-flex justify-content-between">
          <Link to={`/single/${type}/${id}`}>
            <button className="btn btn-outline-primary">Learn more!</button>
          </Link>

          <button
            className="btn btn-outline-warning"
            onClick={() => actions.addFavorite(name)}
          >
            ❤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;