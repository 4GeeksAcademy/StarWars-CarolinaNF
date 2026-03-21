const getState = ({ getStore, setStore }) => {
  return {
    store: {
      people: [],
      planets: [],
      vehicles: [],
      favorites: [],
    },
    actions: {
      getPeople: () => {
        fetch("https://www.swapi.tech/api/people")
          .then(res => res.json())
          .then(data => setStore({ people: data.results || [] }));
      },
      getPlanets: () => {
        fetch("https://www.swapi.tech/api/planets")
          .then(res => res.json())
          .then(data => setStore({ planets: data.results || [] }));
      },
      getVehicles: () => {
        fetch("https://www.swapi.tech/api/vehicles")
          .then(res => res.json())
          .then(data => setStore({ vehicles: data.results || [] }));
      },
      addFavorite: (name) => {
        const store = getStore();
        if (!store.favorites.includes(name)) setStore({ favorites: [...store.favorites, name] });
      },
      removeFavorite: (name) => {
        const store = getStore();
        setStore({ favorites: store.favorites.filter(item => item !== name) });
      }
    }
  }
}

export default getState;