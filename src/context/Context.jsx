import { createContext } from 'react';

const INITIAL_STATE = {
  planets: [],
};

const PlanetsContext = createContext(INITIAL_STATE);

export default PlanetsContext;
