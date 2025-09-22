import { Pokemon } from "@/pokemons/interfaces/pokemon";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";
import Image from "next/image";
import { typeColors, typeIcons } from "@/utils/pokemon-style";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const static151Pokemons = Array.from({ length: 151 }).map((v, i) => `${i + 1}`);

  return static151Pokemons.map(id => ({
    id: id
  }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, name } = await getPokemon(params.id);
  return {
    title: `#${id} - ${name}`,
    description: `Página del Pokémon ${name}`,
  };
}

export const getPokemon = async (id: string): Promise<Pokemon> => {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    cache: "force-cache",
  });

  if (!resp.ok) {
    notFound();
  }

  const pokemon: Pokemon = await resp.json();
  return pokemon;
};

export default async function PokemonPage({ params }: Props) {
  const pokemon = await getPokemon(params.id);

  const hp = pokemon.stats.find((stat) => stat.stat.name === "hp")?.base_stat ?? 0;
  const types = pokemon.types.map((t) => t.type.name);
  const artwork = pokemon.sprites?.other?.["official-artwork"]?.front_default || "/placeholder.png";
  const artworkShiny =
    pokemon.sprites?.other?.["official-artwork"]?.front_shiny || "/placeholder.png";
  const moves = pokemon.moves.slice(0, 2);

  const mainType = types[0];
  const colors = typeColors[mainType] ?? typeColors.normal;
  const Icon = typeIcons[mainType] ?? Star;

  return (
    <>
      <div
        className={` min-h-screen bg-gradient-to-br ${colors.from} ${colors.to} p-4 flex items-center justify-center`}
      >
        <div className="flex flex-col md:flex-row gap-6 py-4 px-5 ">
          {/* Carta Normal */}
          <div
            className={`pokemon-card rounded-2xl p-3 max-w-sm w-full transform hover:scale-105 transition-transform duration-300 border-4 ${colors.border}`}
          >
            <div className="pokemon-card-inner rounded-xl p-6 h-full bg-white/70 backdrop-blur-sm">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className={`text-2xl font-bold mb-1 capitalize ${colors.text}`}>
                    {pokemon.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className={`text-3xl font-bold ${colors.text}`}>{hp}</span>
                    <Heart className={`w-6 h-6 ${colors.text} fill-current`} />
                  </div>
                </div>
                <div className="text-right">
                  {types.map((type) => (
                    <Badge
                      key={type}
                      className={`${colors.text} bg-white/60 border ${colors.border} capitalize`}
                    >
                      {type}
                    </Badge>
                  ))}
                  <div className="text-sm text-muted-foreground">#{pokemon.id}</div>
                </div>
              </div>

              {/* Imagen normal */}
              <div
                className={`relative mb-6 bg-gradient-to-br ${colors.from} ${colors.to} rounded-lg p-4 border-4 ${colors.border}`}
              >
                <Image
                  width={300}
                  height={300}
                  src={artwork}
                  alt={pokemon.name}
                  className="w-full h-48 object-contain relative z-10"
                />
                <div
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-white/70 border ${colors.border}`}
                >
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
              </div>

              {/* Attacks */}
              <div className="space-y-4 mb-6">
                {moves.map((move, index) => (
                  <div
                    key={index}
                    className={`border-2 ${colors.border} rounded-lg p-3 bg-white/60`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center bg-white border ${colors.border}`}
                        >
                          <Icon className={`w-4 h-4 ${colors.text}`} />
                        </div>
                        <span className="font-semibold capitalize">{move.move.name}</span>
                      </div>
                      <span className={`text-2xl font-bold ${colors.text}`}>
                        {pokemon.stats[1]?.base_stat ?? 30}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Un movimiento característico de {pokemon.name}.
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t-2 border-border pt-4 flex justify-between items-end text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">
                    <strong>Altura:</strong> {pokemon.height / 10} m
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Peso:</strong> {pokemon.weight / 10} kg
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className={`w-4 h-4 ${colors.text} fill-current`} />
                    <span className="font-bold">Rara</span>
                  </div>
                  <p className="text-muted-foreground">Pokédex #{pokemon.id}</p>
                </div>
              </div>

              {/* Footer pequeño */}
              <div className="mt-4 pt-2 border-t border-border text-xs text-muted-foreground text-center">
                <p>
                  Datos obtenidos de la{" "}
                  <a href="https://pokeapi.co/" className="underline">
                    PokeAPI
                  </a>
                </p>
                <p className="mt-1">
                  © 1995-2024 Nintendo / Creatures Inc. / GAME FREAK inc.
                </p>
              </div>
            </div>
          </div>
          <div
            className={`pokemon-card rounded-2xl p-3 max-w-sm w-full transform hover:scale-105 transition-transform duration-300 border-4 ${colors.border}`}
          >
            <div className="pokemon-card-inner rounded-xl p-6 h-full bg-white/70 backdrop-blur-sm">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className={`text-2xl font-bold mb-1 capitalize ${colors.text}`}>
                    {pokemon.name} ✨
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className={`text-3xl font-bold ${colors.text}`}>{hp}</span>
                    <Heart className={`w-6 h-6 ${colors.text} fill-current`} />
                  </div>
                </div>
                <div className="text-right">
                  {types.map((type) => (
                    <Badge
                      key={type}
                      className={`${colors.text} bg-white/60 border ${colors.border} capitalize`}
                    >
                      {type}
                    </Badge>
                  ))}
                  <div className="text-sm text-muted-foreground">#{pokemon.id}</div>
                </div>
              </div>

              {/* Imagen shiny */}
              <div
                className={`relative mb-6 bg-gradient-to-br ${colors.from} ${colors.to} rounded-lg p-4 border-4 ${colors.border}`}
              >
                <Image
                  width={300}
                  height={300}
                  src={artworkShiny}
                  alt={`${pokemon.name} shiny`}
                  className="w-full h-48 object-contain relative z-10"
                />
                <div
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-white/70 border ${colors.border}`}
                >
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
              </div>

              {/* Attacks */}
              <div className="space-y-4 mb-6">
                {moves.map((move, index) => (
                  <div
                    key={index}
                    className={`border-2 ${colors.border} rounded-lg p-3 bg-white/60`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center bg-white border ${colors.border}`}
                        >
                          <Icon className={`w-4 h-4 ${colors.text}`} />
                        </div>
                        <span className="font-semibold capitalize">{move.move.name}</span>
                      </div>
                      <span className={`text-2xl font-bold ${colors.text}`}>
                        {pokemon.stats[1]?.base_stat ?? 30}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Un movimiento característico de {pokemon.name}.
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t-2 border-border pt-4 flex justify-between items-end text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">
                    <strong>Altura:</strong> {pokemon.height / 10} m
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Peso:</strong> {pokemon.weight / 10} kg
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className={`w-4 h-4 ${colors.text} fill-current`} />
                    <span className="font-bold">Rara</span>
                  </div>
                  <p className="text-muted-foreground">Pokédex #{pokemon.id}</p>
                </div>
              </div>

              {/* Footer pequeño */}
              <div className="mt-4 pt-2 border-t border-border text-xs text-muted-foreground text-center">
                <p>
                  Datos obtenidos de la{" "}
                  <a href="https://pokeapi.co/" className="underline">
                    PokeAPI
                  </a>
                </p>
                <p className="mt-1">
                  © 1995-2024 Nintendo / Creatures Inc. / GAME FREAK inc.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* Carta Shiny */}

    </>
  );
}
