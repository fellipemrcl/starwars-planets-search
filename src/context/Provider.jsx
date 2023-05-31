import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import PlanetsContext from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const { results } = data;
      const filteredData = results.filter((result) => delete result.residents);
      setPlanets(filteredData);
    };
    fetchApi();
  }, []);

  const value = useMemo(() => ({
    planets,
    setPlanets,
  }), [planets]);

  return (
    <PlanetsContext.Provider value={ value }>
      {children}
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
