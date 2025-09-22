import FavoritesPokemons from "@/pokemons/components/FavoritePokemons";



export const metadata= {
    title: 'Favoritos',
    description: 'Pantalla de favoritos'
}



export default async function PokemonsPage() {

  return (
    <div className="flex flex-col items-center p-4">
      <FavoritesPokemons/>
    </div>
  );
}
