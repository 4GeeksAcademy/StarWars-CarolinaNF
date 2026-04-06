const getState = ({ getStore, setStore }) => {
  const safeFetchJson = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    return await res.json();
  };

  const fetchDetailedItems = async (endpoint, limit = 5) => {
    const data = await safeFetchJson(`https://www.swapi.tech/api/${endpoint}`);
    const baseResults = (data.results || []).slice(0, limit);

    const detailedResults = [];

    for (const item of baseResults) {
      try {
        const detailData = await safeFetchJson(item.url);
        detailedResults.push({
          uid: item.uid,
          name: item.name,
          ...detailData.result.properties
        });
      } catch (error) {
        console.log(`Error loading detail for ${item.name}:`, error);
        detailedResults.push({
          uid: item.uid,
          name: item.name
        });
      }
    }

    return detailedResults;
  };

  return {
    store: {
      people: [],
      planets: [],
      vehicles: [],
      favorites: [],
    },

    actions: {
      getPeople: async () => {
        try {
          const people = await fetchDetailedItems("people", 5);
          setStore({ people });
        } catch (error) {
          console.log("Error loading people:", error);
          setStore({ people: [] });
        }
      },

      getPlanets: async () => {
        try {
          const planets = await fetchDetailedItems("planets", 5);
          setStore({ planets });
        } catch (error) {
          console.log("Error loading planets:", error);
          setStore({ planets: [] });
        }
      },

      getVehicles: async () => {
        try {
          const vehicles = await fetchDetailedItems("vehicles", 5);
          setStore({ vehicles });
        } catch (error) {
          console.log("Error loading vehicles:", error);
          setStore({ vehicles: [] });
        }
      },

      addFavorite: (name) => {
        const store = getStore();
        if (!store.favorites.includes(name)) {
          setStore({ favorites: [...store.favorites, name] });
        }
      },

      removeFavorite: (name) => {
        const store = getStore();
        setStore({
          favorites: store.favorites.filter((item) => item !== name)
        });
      }
    }
  };
};

export default getState;