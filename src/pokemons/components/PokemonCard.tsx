'use client'

import React from "react";
import { SimplePokemon } from "../interfaces/simple-pokemon";
import Image from "next/image";
import Link from "next/link";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavorite } from "@/store/pokemons/pokemons";

interface Props {
  pokemon: SimplePokemon;
}


const PokemonCard = ({ pokemon }: Props) => {

  
  
  const { id, name } = pokemon;

  const isFavorite = useAppSelector( state => !!state.pokemons.favorites[id] );
  const dispatch = useAppDispatch();

  const onToggle = () => {
    dispatch( toggleFavorite(pokemon) );
  }
  

  return (
    <div className="flex justify-center items-center">
      <div className="w-60 bg-gradient-to-br from-yellow-100 via-white to-yellow-200 rounded-2xl shadow-xl border-4 border-yellow-400 p-3 relative hover:scale-105 transition-transform duration-300">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="capitalize text-lg font-bold text-gray-800">{name}</h2>
          <span className="text-sm font-bold text-gray-700">#{id}</span>
        </div>


        <div className="relative bg-white rounded-lg border-2 border-gray-200 p-2 mb-3">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            width={200}
            height={200}
            alt={name}
            className="object-contain"
          />
        </div>


        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1 text-red-600 cursor-pointer" onClick={onToggle}>

            {
              isFavorite
              ?  <IoHeart/>  : <IoHeartOutline/>
            }

            {
              isFavorite ? 'Es favorito' : 'No es favorito' 
            }
          </div>
          <span className="text-xs font-semibold bg-yellow-300 px-2 py-1 rounded-full">
            Básico
          </span>
        </div>


        <div className="text-center">
          <Link
            href={`pokemon/${id}`}
            className="inline-block w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm font-bold py-2 rounded-xl shadow hover:from-yellow-500 hover:to-yellow-700 transition"
          >
            Más información
          </Link>
        </div>


        <div className="absolute inset-0 rounded-2xl border-2 border-yellow-500 opacity-30 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default PokemonCard;
