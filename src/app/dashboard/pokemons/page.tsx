import { PokemonsResponse } from "@/pokemons/interfaces/pokemons-response";
import { SimplePokemon } from "@/pokemons/interfaces/simple-pokemon";
import PokemonGrid from "@/pokemons/components/PokemonGrid";

// 🔑 Función para obtener pokemons
const getPokemons = async (
  limit = 151,
  offset = 0
): Promise<SimplePokemon[]> => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) throw new Error("Error al obtener los pokemons");

  const data: PokemonsResponse = await res.json();

  return data.results.map((pokemon) => ({
    id: pokemon.url.split("/").at(-2)!,
    name: pokemon.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url
      .split("/")
      .at(-2)!}.png`,
  }));
};

// 👇 Page Server Component
export default async function PokemonsPage() {
  const pokemons = await getPokemons();

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-yellow-200">Pokédex</h1>
      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
