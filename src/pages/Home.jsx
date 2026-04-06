import React, { useEffect, useContext } from "react";
import { Context } from "../hooks/useGlobalReducer";
import Card from "../components/Card";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getPeople();
    actions.getPlanets();
    actions.getVehicles();
  }, []);

  return (
    <div className="container">
      <h2 className="text-danger mt-4">Characters</h2>
      <div className="d-flex overflow-auto gap-3 pb-3">
        {store.people.map((person) => (
          <Card
            key={person.uid}
            name={person.name}
            type="people"
            id={person.uid}
            gender={person.gender}
            hair={person.hair_color}
            eyes={person.eye_color}
          />
        ))}
      </div>

      <h2 className="text-danger mt-4">Planets</h2>
      <div className="d-flex overflow-auto gap-3 pb-3">
        {store.planets.map((planet) => (
          <Card
            key={planet.uid}
            name={planet.name}
            type="planets"
            id={planet.uid}
            gender={planet.climate}
            hair={planet.terrain}
            eyes={planet.population}
          />
        ))}
      </div>

      <h2 className="text-danger mt-4">Vehicles</h2>
      <div className="d-flex overflow-auto gap-3 pb-3">
        {store.vehicles.map((vehicle) => (
          <Card
            key={vehicle.uid}
            name={vehicle.name}
            type="vehicles"
            id={vehicle.uid}
            gender={vehicle.model}
            hair={vehicle.vehicle_class}
            eyes={vehicle.crew}
          />
        ))}
      </div>
    </div>
  );
};