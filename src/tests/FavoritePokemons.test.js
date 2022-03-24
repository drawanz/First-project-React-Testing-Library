import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Verifica o componente <FavoritePokemons.js />', () => {
  it('Verifica se o componente está vazio', () => {
    renderWithRouter(<FavoritePokemons />);

    const favorites = screen.getByRole('heading', { name: /Favorite pokémons/i });
    const noFavorites = screen.getByText(/No favorite pokemon found/i);

    expect(favorites).toBeInTheDocument();
    expect(noFavorites).toBeInTheDocument();
  });

  it('Verifica se o componente possui pokemons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const checkbox = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(checkbox);

    const favorites = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorites);

    const favoritesHeading = screen
      .getByRole('heading', { name: /Favorite pokémons/i });
    const pikachu = screen.getByText(/pikachu/i);

    expect(favoritesHeading).toBeInTheDocument();
    expect(pikachu).toBeInTheDocument();
  });
});
