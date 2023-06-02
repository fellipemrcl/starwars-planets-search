import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/Context';

function Table() {
  const { planets } = useContext(PlanetsContext);
  const [inputSearch, setInputSearch] = useState('');
  const [columnsFilterOptions, setColumnFilterOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [comparisonFilterOptions, setComparisonFilterOptions] = useState([
    'maior que',
    'menor que',
    'igual a',
  ]);
  const [columnsFilter, setColumnsFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    setFilteredPlanets(planets);
  }, [planets]);

  const handleFilter = () => {
    const filteredData = filteredPlanets.filter((planet) => {
      const planetValue = parseFloat(planet[columnsFilter]);
      const targetValue = parseFloat(valueFilter);

      if (!Number.isNaN(planetValue) && !Number.isNaN(targetValue)) {
        if (comparisonFilter === 'maior que') {
          return planetValue > targetValue;
        } if (comparisonFilter === 'menor que') {
          return planetValue < targetValue;
        } if (comparisonFilter === 'igual a') {
          return planetValue === targetValue;
        }
      }

      return false;
    });

    setFilteredPlanets(filteredData);
    const filteredColumnsOptions = columnsFilterOptions
      .filter((columnOption) => columnOption !== columnsFilter);
    const filteredComparisonOptions = comparisonFilterOptions
      .filter((comparisonOption) => comparisonOption !== comparisonFilter);
    setColumnFilterOptions(filteredColumnsOptions);
    setComparisonFilterOptions(filteredComparisonOptions);
  };

  return (
    <div>
      <div>
        <input
          placeholder="Pesquise um planeta"
          type="text"
          data-testid="name-filter"
          onChange={ ({ target }) => setInputSearch(target.value) }
        />
        <label htmlFor="columnFilter">
          Coluna:
          <select
            data-testid="column-filter"
            value={ columnsFilter }
            onChange={ ({ target }) => setColumnsFilter(target.value) }
            id="columnFilter"
          >
            {columnsFilterOptions.map((columnOption, index) => (
              <option
                key={ index }
                value={ columnOption }
              >
                {columnOption}

              </option>
            ))}
          </select>
        </label>
        <label htmlFor="comparisonFilter">
          Operador:
          <select
            data-testid="comparison-filter"
            value={ comparisonFilter }
            onChange={ ({ target }) => setComparisonFilter(target.value) }
            id="comparisonFilter"
          >
            {comparisonFilterOptions.map((comparisonOption, index) => (
              <option
                key={ index }
                value={ comparisonOption }
              >
                {comparisonOption}

              </option>
            ))}
          </select>
        </label>
        <label htmlFor="valueFilter">
          <input
            type="number"
            data-testid="value-filter"
            value={ valueFilter }
            onChange={ ({ target }) => setValueFilter(target.value) }
            id="valueFilter"
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleFilter }
        >
          Filtrar

        </button>
      </div>
      <table>
        <thead>
          {planets && planets.length > 0 && (
            <tr>
              {Object.keys(planets[0]).map((key, i) => (
                <th key={ i } scope="col">
                  {key}
                </th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          { filteredPlanets
            .filter((planet) => planet.name.toLowerCase().includes(inputSearch))
            .map((planet, i) => (
              <tr key={ i }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
