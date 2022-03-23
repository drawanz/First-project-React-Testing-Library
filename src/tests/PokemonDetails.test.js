import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa Pokemon Details', () => {
  it('Verifica se é renderizado um card com o nome de determinado pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    history.push({ pathname: `/pokemons/${pokemons[0].id}` });

    const pikachuDetails = screen.getByRole('heading', { name: /Pikachu Details/i });
    const summary = screen.getByRole('heading', { name: /Summary/i });
    const resume = screen.getByText(pokemons[0].summary);

    expect(moreDetails).not.toBeInTheDocument();
    expect(pikachuDetails).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(resume).toBeInTheDocument();
  });

  it('Verifica se existe na página mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push({ pathname: `/pokemons/${pokemons[0].id}` });

    const locations = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
    const locationsImg = screen.getAllByRole('img', { name: /Pikachu location/i });
    const textFirstLocation = screen.getByText(/kanto viridian forest/i);
    const textSecondLocation = screen.getByText(/kanto power plant/i);

    expect(locations).toBeInTheDocument();
    expect(locationsImg).toHaveLength(2);
    expect(locationsImg[0].src).toBe(pokemons[0].foundAt[0].map);
    expect(locationsImg[0].alt).toBe('Pikachu location');
    expect(locationsImg[1].src).toBe(pokemons[0].foundAt[1].map);
    expect(locationsImg[1].alt).toBe('Pikachu location');
    expect(textFirstLocation).toBeInTheDocument();
    expect(textSecondLocation).toBeInTheDocument();
  });

  it(`Verifica se o usuário pode favoritar um pokémon através da página de 
    detalhes`, () => {
    const { history } = renderWithRouter(<App />);
    history.push({ pathname: `/pokemons/${pokemons[0].id}` });
    const checkbox = screen.getByText(/pokémon favoritado\?/i);

    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const favorite = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favorite).toBeInTheDocument();
    userEvent.click(checkbox);

    expect(favorite).not.toBeInTheDocument();
  });
});
