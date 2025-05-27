import { describe, it, expect, vi } from 'vitest';
import { getPokemons, getPokemonNames, getPokemonOptions } from './getPokemonOptions';
import pokemonService from '../services/pokemon';

// Mock pokemonService
vi.mock('../services/pokemon');

describe('getPokemonOptions helpers', () => {
  // Test suite for getPokemons()
  describe('getPokemons', () => {
    it('should return an array of 650 numbers', () => {
      const pokemons = getPokemons();
      expect(Array.isArray(pokemons)).toBe(true);
      expect(pokemons.length).toBe(650);
      expect(pokemons[0]).toBe(1);
      expect(pokemons[pokemons.length - 1]).toBe(650);
    });
  });

  // Test suite for getPokemonNames(pokemons: number[])
  describe('getPokemonNames', () => {
    const mockedPokemonService = pokemonService as vi.Mocked<typeof pokemonService>;

    it('should return an array of four Pokemon objects with name and id', async () => {
      const inputIds = [1, 2, 3, 4];
      mockedPokemonService.getPokemon.mockImplementation(async (id: number) => ({
        name: `Pokemon ${id}`,
        id: id,
        // The actual service might return more properties, but for the test, name and id are sufficient
      }));

      const result = await getPokemonNames(inputIds);

      expect(mockedPokemonService.getPokemon).toHaveBeenCalledTimes(4);
      expect(mockedPokemonService.getPokemon).toHaveBeenCalledWith(1);
      expect(mockedPokemonService.getPokemon).toHaveBeenCalledWith(2);
      expect(mockedPokemonService.getPokemon).toHaveBeenCalledWith(3);
      expect(mockedPokemonService.getPokemon).toHaveBeenCalledWith(4);

      expect(result).toEqual([
        { name: 'Pokemon 1', id: 1 },
        { name: 'Pokemon 2', id: 2 },
        { name: 'Pokemon 3', id: 3 },
        { name: 'Pokemon 4', id: 4 },
      ]);
    });

    it('should throw an error if less than 4 pokemons are provided', async () => {
      const inputIds = [1, 2, 3];
      await expect(getPokemonNames(inputIds)).rejects.toMatch('Pokemons must be 4');
    });

    it('should throw an error if more than 4 pokemons are provided', async () => {
      const inputIds = [1, 2, 3, 4, 5];
      await expect(getPokemonNames(inputIds)).rejects.toMatch('Pokemons must be 4');
    });
  });

  // Test suite for getPokemonOptions()
  describe('getPokemonOptions', () => {
    const mockedPokemonService = pokemonService as vi.Mocked<typeof pokemonService>;

    it('should return four Pokemon options', async () => {
      // Mock getPokemon to return predictable data
      mockedPokemonService.getPokemon.mockImplementation(async (id: number) => ({
        name: `Pokemon ${id}`,
        id: id,
      }));

      const options = await getPokemonOptions();

      expect(Array.isArray(options)).toBe(true);
      expect(options.length).toBe(4);
      options.forEach(option => {
        expect(option).toHaveProperty('name');
        expect(option).toHaveProperty('id');
        expect(typeof option.name).toBe('string');
        expect(typeof option.id).toBe('number');
      });

      // Verify that getPokemon was called (indirectly via getPokemonNames)
      // The exact number of calls to getPokemon within getPokemonOptions
      // depends on how getPokemonNames is called, which should be with 4 IDs.
      expect(mockedPokemonService.getPokemon).toHaveBeenCalled();
      // We can't easily predict the exact IDs due to shuffling,
      // but we know 4 unique pokemons should be fetched.
      // Resetting mock calls from previous tests for getPokemonNames
      mockedPokemonService.getPokemon.mockClear();
      await getPokemonOptions(); // Call again after clearing mocks
      expect(mockedPokemonService.getPokemon).toHaveBeenCalledTimes(4);


    });
  });
});
