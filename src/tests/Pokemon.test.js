// test('', () => {});
import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('', () => {
  // beforeEach(() => {
  //   renderWithRouter(<App />);
  // });

  it('Teste se é renderizado um card com o nome de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(pokemons[0].name);
    const pikachuType = screen.getByTestId('pokemon-type');

    expect(pikachu).toBeInTheDocument();
    expect(pikachuType.innerHTML).toBe('Electric');
  });

  it('Teste se é renderizado um card com o peso de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pikachuWeight = screen
      .getByText(`Average weight: ${pokemons[0].averageWeight.value} ${pokemons[0]
        .averageWeight.measurementUnit}`);

    expect(pikachuWeight).toBeInTheDocument();
  });

  it('A imagem do Pokémon deve ser exibida.', () => {
    renderWithRouter(<App />);
    const img = screen.getByRole('img', { name: `${pokemons[0].name} sprite` });

    expect(img.src).toBe(pokemons[0].image);
    expect(img.alt).toBe(`${pokemons[0].name} sprite`);
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação 
  para exibir detalhes`, () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByText(/more details/i);

    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);

    const summary = screen.getByRole('heading', { name: /Summary/i });
    const locationsPikachu = screen
      .getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(summary).toBeInTheDocument();
    expect(locationsPikachu).toBeInTheDocument();
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push({ pathname: `/pokemons/${pokemons[0].id}` });

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    const isFavorite = screen
      .getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(isFavorite.src).toBe('http://localhost/star-icon.svg');
    expect(isFavorite).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(isFavorite).not.toBeInTheDocument();
  });
});
