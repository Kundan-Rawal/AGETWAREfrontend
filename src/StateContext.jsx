import React from "react";

const StateContext = React.createContext({
  activePage: "home",
  setActivePage: () => {},
});

export default StateContext;
