import React, { useEffect, useState } from "react";
import { CardWrapper } from "../components/card/styles";
import * as C from "./styles"

const url = 'https://pokeapi.co/api/v2/pokemon/1'

export const GetPokemonData = () => {
    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setPokemon(json))
    }, [])
    return (
        <div>
            {pokemon && (
                <div>
                    <C.Card>
                        <div>
                            <C.Type>{pokemon.types[0].type.name}</C.Type>
                            <C.Number>#{pokemon.id}</C.Number>
                        </div>
                        <C.Sprite src={pokemon.sprites.other['official-artwork'].front_default}></C.Sprite>
                        <C.Name>{pokemon.name}</C.Name>
                    </C.Card>
                </div>
            )}
        </div>
    )
}

const urlList = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'

export const GetPokemonList = () => {
    const [pokemonList, setPokemonList] = useState()

    useEffect(() => {
        fetch(urlList)
            .then((response) => response.json())
            .then((json) => setPokemonList(json))

    }, [])
    // return (
    //     <>
    //         {pokemonList && (
    //             pokemonList.results.map((pokemon, index) => {
    //                 return (
    //                     <CardWrapper key={index}>
    //                         <C.Card>
    //                             <div>
    //                                 <C.Type>{pokemon.url}</C.Type>
    //                                 <C.Number>#{pokemon.id}</C.Number>
    //                             </div>
    //                             <C.Sprite></C.Sprite>
    //                             <C.Name>{pokemon.name}</C.Name>
    //                         </C.Card>
    //                     </CardWrapper>
    //                 )
    //             })

    //         )}
    //     </>
    // )
}
