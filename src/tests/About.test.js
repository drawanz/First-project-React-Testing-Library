import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import About from '../components/About';

describe('Testes do componente About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('Verifica se a página contém as informações sobre a Pokédex.', () => {
    const textOne = screen.getByText(/this application simulates a pokédex/i);

    expect(textOne).toBeInTheDocument();
  });

  it('Verifica se a página contém as informações sobre a Pokédex.', () => {
    const textTwo = screen.getByText(/One can filter Pokémons by type/i);

    expect(textTwo).toBeInTheDocument();
  });

  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const heading = screen.getByRole('heading', { name: /about pokédex/i });

    expect(heading).toBeInTheDocument();
  });

  it('Verifica se a página contém imagem', () => {
    const img = screen.getByRole('img', { name: /pokédex/i });

    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
