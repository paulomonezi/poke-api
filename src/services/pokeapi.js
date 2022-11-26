import React, { useEffect, useState } from "react";
import * as C from "./styles"

const url = 'https://pokeapi.co/api/v2/pokemon/100'

export const GetPokemonData = () => {
    const [pokemon, setPokemon] = useState(null)

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setPokemon(json))
    }, [])
    return (
        <div>
            {pokemon && (
                <div>
                    <C.CardWrapper>
                    {console.log(pokemon.types[0].type.name)}
                    <C.Sprite src={pokemon.sprites.front_default}></C.Sprite>
                    <h1>{pokemon.name}</h1>
                    <span>#{pokemon.id}</span>
                    <span>{pokemon.types[0].type.name}</span>
                    <span>{pokemon.abilities[0].ability.name}</span>
                    <span>{pokemon.abilities[1].ability.name}</span>
                    <span>{pokemon.moves[0].move.name}</span>
                    <span>{pokemon.moves[1].move.name}</span>
                    <span>{pokemon.moves[2].move.name}</span>
                    <span>{pokemon.moves[3].move.name}</span>
                    </C.CardWrapper>
                </div>
            )}
        </div>
    )
}
