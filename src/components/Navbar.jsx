import React, { useContext } from "react";
import { Context } from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
          style={{ width: "100px" }}
        />
        <div className="dropdown ms-auto">
          <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
            Favorites {store.favorites.length}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {store.favorites.length === 0 && <li className="dropdown-item text-center">No favorites yet</li>}
            {store.favorites.map(item => (
              <li key={item} className="dropdown-item d-flex justify-content-between">
                {item}
                <span onClick={() => actions.removeFavorite(item)} style={{cursor:"pointer"}}>🗑</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};