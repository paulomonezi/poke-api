import React from 'react'
import * as C from './styles'
import { getImage } from '../../services/poke-api/poke-api'

export const Card = () => {
    return (
        <>
            <C.PokemonCard>

            </C.PokemonCard>
            {getImage()}
            <div>Card</div>
            <div>Card</div>
            <div>Card</div>
        </>
    )
}
