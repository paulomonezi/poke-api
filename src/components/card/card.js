import React from 'react'
import { GetPokemonData, GetPokemonList } from '../../services/pokeapi'
import * as C from './styles'

export const Card = () => {
    return (
        <>
        <C.CardWrapper>
        <GetPokemonData></GetPokemonData>
        <GetPokemonList></GetPokemonList>
        </C.CardWrapper>
        </>
    )
}
