import { useContext, useState } from 'react';
import PlanetsContext from '../context/Context';

function Table() {
  const { planets } = useContext(PlanetsContext);
  const [inputSearch, setInputSearch] = useState('');

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => setInputSearch(target.value) }
      />
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
          { planets
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
