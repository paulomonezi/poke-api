import React, { useEffect, useState } from "react"
import { CardWrapper } from "../components/card/styles"
import * as C from './styles'

const url = 'https://pokeapi.co/api/v2/pokemon/'
const urlList = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'


async function getPokemonData(name) {
    const response = await fetch(`${url}${name}`)
    const pokemon = response.json()

    return pokemon
}

async function getPokemons() {
    const response = await fetch(urlList)
    const pokemonList = await response.json()
    const results = pokemonList.results

    return results
}



export const GetPokemonList = () => {
    const [pokemonList, setPokemonList] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const pokemons = await getPokemons()
            const pokemonNames = pokemons.map(pokemon => pokemon.name)
            const paginatedPokemons = pokemonNames.map(async (pokemonName) => await getPokemonData(pokemonName))
            const allPromises = await Promise.all(paginatedPokemons)
            console.log(allPromises)
        }
        fetchData()
    }, [])
    return (
        <>
            {pokemonList && (
                pokemonList.results.map((pokemon, index) => {
                    return (
                        <CardWrapper key={index}>
                            <h1>allPromises.name</h1>
                            <C.Card>
                                <div>
                                    <C.Type>{pokemon.url}</C.Type>
                                </div>
                                <C.Sprite></C.Sprite>
                                <C.Name>{pokemon.name}</C.Name>
                            </C.Card>
                        </CardWrapper>
                    )
                })
            )}
        </>
    )
}
