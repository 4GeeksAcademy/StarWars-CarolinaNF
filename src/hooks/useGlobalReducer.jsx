import React, { createContext, useState, useRef } from "react";
import getState from "../store";

export const Context = createContext(null);

const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    const stateRef = useRef();

    const [state, setState] = useState(() => {
      const initialState = getState({
        getStore: () => stateRef.current.store,
        getActions: () => stateRef.current.actions,
        setStore: (updatedStore) => {
          setState((prevState) => {
            const newState = {
              store: { ...prevState.store, ...updatedStore },
              actions: { ...prevState.actions }
            };
            stateRef.current = newState;
            return newState;
          });
        }
      });

      stateRef.current = initialState;
      return initialState;
    });

    return (
      <Context.Provider value={state}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };

  return StoreWrapper;
};

export default injectContext;