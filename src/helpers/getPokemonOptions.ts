import pokemonService from "@/services/pokemon";
import { Pokemon } from "@/models/pokemon.model";

const getPokemons = (): number[] => {
  const pokemonsArr = Array.from(Array(650));
  return pokemonsArr.map((_, index) => index + 1);
};

const getPokemonNames = async (pokemons: number[]): Promise<Pokemon[]> => {
  if (pokemons.length !== 4) throw "Pokemons must be 4";
  const [a, b, c, d] = pokemons;

  const promiseArr = [
    pokemonService.getPokemon(a),
    pokemonService.getPokemon(b),
    pokemonService.getPokemon(c),
    pokemonService.getPokemon(d),
  ];

  const [p1, p2, p3, p4] = await Promise.all(promiseArr);
  return [
    { name: p1.name, id: p1.id },
    { name: p2.name, id: p2.id },
    { name: p3.name, id: p3.id },
    { name: p4.name, id: p4.id },
  ];
};

const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);

  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));

  return pokemons;
};

export default getPokemonOptions;
