import { describe, it, expect, vi } from 'vitest';
import pokemonService from './pokemon';
import axios from 'axios';

vi.mock('axios');

// Assuming VITE_APP_API_URL is https://pokeapi.co/api/v2/pokemon
const API_URL = 'https://pokeapi.co/api/v2/pokemon';

describe('Pokemon Service', () => {
  describe('getPokemon', () => {
    it('should fetch a Pokemon by ID', async () => {
      const pokemonId = 1;
      const mockPokemonData = { id: 1, name: 'Bulbasaur' };
      const mockedAxios = axios as vi.Mocked<typeof axios>;
      mockedAxios.get.mockResolvedValueOnce({ data: mockPokemonData });

      // Pass the API_URL directly to the service method
      const result = await pokemonService.getPokemon(pokemonId, API_URL);

      expect(mockedAxios.get).toHaveBeenCalledOnce();
      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/${pokemonId}`);
      expect(result).toEqual(mockPokemonData);
    });
  });
});
