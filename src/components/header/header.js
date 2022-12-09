import React from 'react'
import { PokemonLogo } from '../logo/pokemonLogo'
import * as C from './styles'


export const Header = () => {
    return (
        <>
            <C.HeaderWrapper>
                <C.Header>
                    <PokemonLogo />
                </C.Header>
            </C.HeaderWrapper>
        </>
    )
}
