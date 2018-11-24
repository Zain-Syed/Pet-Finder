import React from "react";

const SearchContext = React.createContext({
  location: "New York City, NY",
  animal: "",
  breed: "",
  breeds: [],
  handleAnimalChange() {},
  handleBreedChange() {},
  handleLocationChange() {},
  getBreeds() {}
});

// always use Provider above Consumer => never use Consumer without Provider
export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;
