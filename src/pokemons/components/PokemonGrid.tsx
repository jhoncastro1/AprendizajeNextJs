import React from 'react'
import { SimplePokemon } from '../interfaces/simple-pokemon'
import Image from 'next/image';
import PokemonCard from './PokemonCard';

interface Props{
    pokemons: SimplePokemon[];

}

const PokemonGrid = ({pokemons}: Props) => {
    return (
        <>
            <div className="flex flex-wrap gap-10 items-center justify-center">


                {
                    pokemons.map(pokemon => (
                        <div key={pokemon.id}>
                            <PokemonCard pokemon={pokemon}/>
                        </div>
                    ))
                }


            </div>
        </>
    )
}

export default PokemonGrid
