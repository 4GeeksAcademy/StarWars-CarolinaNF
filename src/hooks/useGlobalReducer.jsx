import React, { createContext, useState } from "react";
import getState from "../store";

export const Context = createContext(null);

const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    const [state, setState] = useState(() =>
      getState({
        getStore: () => state?.store,
        getActions: () => state?.actions,
        setStore: (updatedStore) =>
          setState((prev) => ({
            store: { ...prev.store, ...updatedStore },
            actions: { ...prev.actions },
          })),
      })
    );

    return (
      <Context.Provider value={state}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };

  return StoreWrapper;
};

export default injectContext;