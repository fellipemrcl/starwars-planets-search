import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import Provider from '../context/Provider';
import { mockData } from './helpers/mockData';
import userEvent from '@testing-library/user-event';

const PLANET_SEARCH = 'tatooine';

describe('Testando o App', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    await act(async () => {
      render(
        <Provider>
          <App />
        </Provider>
      );
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  })

  it('Testa se a página exibe os elementos corretamente', () => {
    screen.getByPlaceholderText('Pesquise um planeta');
    screen.getByText(/coluna:/i);
    screen.getByText(/operador:/i);
    screen.getByRole('button', { name: /filtrar/i });
  });

  it('Testa se o Fetch é chamado ao renderizar a página', async () => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('Testa se os filtros são aplicados corretamente', async () => {
    const planetSearchInput = screen.getByTestId('name-filter');
    const columnFilterSelect = screen.getByTestId('column-filter');
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');
    expect(planetSearchInput).toBeInTheDocument();
    expect(columnFilterSelect).toBeInTheDocument();
    expect(comparisonFilterSelect).toBeInTheDocument();
    expect(valueFilterInput).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
    userEvent.type(planetSearchInput, PLANET_SEARCH);
    expect(planetSearchInput).toHaveValue(PLANET_SEARCH);
    await screen.findByRole('cell', { name: /tatooine/i });
    userEvent.clear(planetSearchInput);
    userEvent.selectOptions(columnFilterSelect, 'diameter');
    expect(columnFilterSelect).toHaveValue('diameter');
    userEvent.selectOptions(comparisonFilterSelect, 'menor que');
    expect(comparisonFilterSelect).toHaveValue('menor que');
    userEvent.type(valueFilterInput, '8000');
    userEvent.click(filterButton);
    await screen.findByRole('cell', { name: /hoth/i });
    await screen.findByRole('cell', { name: /endor/i });
    userEvent.clear(valueFilterInput);
    userEvent.selectOptions(columnFilterSelect, 'population');
    expect(columnFilterSelect).toHaveValue('population');
    userEvent.selectOptions(comparisonFilterSelect, 'maior que');
    expect(comparisonFilterSelect).toHaveValue('maior que');
    userEvent.type(valueFilterInput, '1000');
    userEvent.click(filterButton);
    await screen.findByRole('cell', { name: /endor/i });
    userEvent.clear(valueFilterInput);
    userEvent.selectOptions(columnFilterSelect, 'rotation_period');
    userEvent.selectOptions(comparisonFilterSelect, 'igual a');
    userEvent.type(valueFilterInput, '18');
    userEvent.click(filterButton);
    await screen.findByRole('cell', { name: /endor/i });
  });
}); 
