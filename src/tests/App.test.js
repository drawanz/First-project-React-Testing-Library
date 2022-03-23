import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testes do App.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica se o conjunto de links de navegação existe', () => {
    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    const linkFavoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  it('Ao clicar em home, deve ser redirecionado para a página inicial', () => {
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const encounteredPokemons = screen
      .getByRole('heading', { name: /encountered pokémons/i });
    expect(encounteredPokemons).toBeInTheDocument();
  });

  it('Ao clicar em about, deve ser redirecionado para a página about', () => {
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const about = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(about).toBeInTheDocument();
  });

  it(`Ao clicar em favorite pokémons, dele ser redirecionado para a página 
    favorite pokémons`, () => {
    const linkFavoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavoritePokemons).toBeInTheDocument();

    userEvent.click(linkFavoritePokemons);

    const encounteredPokemons = screen
      .getByRole('heading', { name: /Favorite pokémons/i });
    expect(encounteredPokemons).toBeInTheDocument();
  });

  it('Verifica o redirecionamento para NotFound', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/abc');
    const notFound = screen
      .getByRole('heading', { name: /Page requested not found /i });
    expect(notFound).toBeInTheDocument();
  });
});
