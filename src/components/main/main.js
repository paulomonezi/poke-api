import React from 'react'
import { GetPokemonList } from '../../services/pokeapi'
import { MainContainer, MainWrapper } from './styles'

export const Main = () => {
    return (
        <MainWrapper>
            <MainContainer>
                <GetPokemonList />
            </MainContainer>
        </MainWrapper>
    )
}
