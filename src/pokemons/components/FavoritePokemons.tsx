"use client"
import { useAppSelector } from '@/store'
import React from 'react'
import PokemonGrid from './PokemonGrid';
import { useState } from 'react';
import { IoHeartOutline } from 'react-icons/io5';

const FavoritePokemons = () => {

  const favoritePokemons = useAppSelector( state => Object.values( state.pokemons.favorites ) );

  return (
    <>
    {/* // <PokemonGrid pokemons={pokemons} /> */}
      {
        favoritePokemons.length === 0  ?( < NoFavorites /> ):  (<PokemonGrid pokemons={favoritePokemons} />)
      }
      
      


    </>
  )
}

export default FavoritePokemons


export const NoFavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline size={100} className='text-red-500' />
      <span className='text-red-500'>No hay favoritos</span>
    </div>
  )
}
