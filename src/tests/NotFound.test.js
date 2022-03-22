// test('', () => {});
import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Verifica a imagem que renderiza na tela', () => {
    renderWithRouter(<NotFound />);

    const notFound = screen.getByRole('heading', { name: /Page requested not found/i });
    const img = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });

    expect(notFound).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
