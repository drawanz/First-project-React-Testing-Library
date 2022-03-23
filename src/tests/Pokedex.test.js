import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes do Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica se página contém um heading h2 com o texto Encountered pokémons', () => {
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });

    expect(heading).toBeInTheDocument();
  });

  it(`Verifica se é exibido o próximo Pokémon da lista quando o botão Próximo 
    pokémon é clicado.`, () => {
    pokemons.forEach(({ name }, index) => {
      const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
      if (index === pokemons.length - 1) {
        const pokemon = screen.getByText(name);
        expect(pokemon).toBeInTheDocument();
        userEvent.click(buttonNext);
        expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
      } else {
        const pokemon = screen.getByText(name);
        expect(pokemon).toBeInTheDocument();
        userEvent.click(buttonNext);
      }
    });
  });

  it('Verifica se é mostrado apenas um Pokémon por vez.', () => {
    const img = screen.getAllByRole('img');

    expect(img).toHaveLength(1);
  });

  it('Verifica se a Pokédex tem os botões de filtro.', () => {
    pokemons.forEach(({ type }) => {
      const buttonAll = screen.getByRole('button', { name: /all/i });
      const buttonFilter = screen.getByRole('button', { name: type });
      const filterButtons = screen.getAllByTestId('pokemon-type-button');
      const lengthFilterButtons = 7;

      expect(buttonFilter).toBeInTheDocument();
      userEvent.click(buttonFilter);
      const pokemonType = screen.getAllByText(type);
      expect(buttonAll).toBeInTheDocument();
      expect(filterButtons).toHaveLength(lengthFilterButtons);
      // console.log(filterButtons.length);
      expect(pokemonType[0]).toBeInTheDocument();
    });
  });

  it('', () => {
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);

    pokemons.forEach(({ name }) => {
      const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
      const pokemon = screen.getByText(name);
      expect(pokemon).toBeInTheDocument();
      userEvent.click(buttonNext);
    });
  });
});
