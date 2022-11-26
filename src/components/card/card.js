import React from 'react'
import { GetPokemonData } from '../../services/pokeapi'
import * as C from './styles'

export const Card = () => {
    return (
        <>
        <C.PokemonCard>
        <GetPokemonData></GetPokemonData>
        </C.PokemonCard>
        
        </>
    )
}
