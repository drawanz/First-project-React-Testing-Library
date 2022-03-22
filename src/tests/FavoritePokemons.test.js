// test('', () => {});
import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Verifica se o componente está vazio', () => {
    renderWithRouter(<FavoritePokemons />);

    const favorites = screen.getByRole('heading', { name: /Favorite pokémons/i });
    const noFavorites = screen.getByText(/No favorite pokemon found/i);

    expect(favorites).toBeInTheDocument();
    expect(noFavorites).toBeInTheDocument();
  });

  // it('Verifica se o componente possui favoritos', () => {
  //   renderWithRouter(<FavoritePokemons />);

  //   const favorites = screen.getByRole('heading', { name: /Favorite pokémons/i });
  //   const noFavorites = screen.getByText(/No favorite pokemon found/i);

  //   expect(favorites).toBeInTheDocument();
  //   expect(noFavorites).not.toBeInTheDocument();
  // });
});
