import React, { useEffect, useState } from "react"
import { json, Link } from "react-router-dom"
import { CardWrapper } from "../components/card/styles"
import * as C from './styles'

const url = 'https://pokeapi.co/api/v2/pokemon/'
const urlList = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'


async function getPokemonData(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemon = response.json()

    return pokemon
}

async function getPokemons() {
    const response = await fetch(urlList)
    const pokemonList = await response.json()
    const result = pokemonList.results

    return result
}

async function getAbilitiesDescription(url) {
    const response = await fetch(url)
    const abilitiesList = await response.json()
    const abilitiesUrl = abilitiesList.abilities.map(ability => ability.ability.url)

    const fetchAbilities = await fetch(abilitiesUrl[0])
    const abilityArray = await fetchAbilities.json()
    const abilityDescription = await abilityArray.flavor_text_entries[0].flavor_text
    // console.log(abilityDescription)
    return await abilityDescription
}


export const GetPokemonList = () => {
    const [pokemonList, setPokemonList] = useState([])
    const [pokemonTypes, setPokemonTypes] = useState([]) //new changes to show two types, refactor later

    useEffect(() => {
        const fetchData = async () => {
            const pokemons = await getPokemons()
            const pokemonNames = pokemons.map(pokemon => pokemon.name)
            const paginatedPokemons = pokemonNames.map(async (pokemonName) => await getPokemonData(pokemonName))
            const allPromises = await Promise.all(paginatedPokemons)
            setPokemonList(allPromises)

            //new changes to show two types, refactor later
            // fetch(`${url}${'rhydon'}`)
            //     .then((response) => response.json())
            //     .then(json => json.types)
            //     .then(types => setPokemonTypes(types))

        }
        fetchData()



    }, [])
    return (
        <>
            {
                pokemonList.map((pokez, index) =>
                    <Link key={index} to={`/pokemon/${pokez.name}`}>
                        <CardWrapper >
                            <C.Card>
                                <div>
                                    <C.Types>
                                        {pokez.types.map((type, index) => <span key={index}>{type.type.name}</span>)}
                                    </C.Types>
                                    <C.Number>#{pokez.id}</C.Number>
                                </div>
                                <C.Sprite src={pokez.sprites.other['official-artwork'].front_default}></C.Sprite>
                                <C.Name>{pokez.name}</C.Name>
                            </C.Card>
                        </CardWrapper>
                    </Link>
                )
            }

        </>
    )
}

export { getPokemonData }


export const PokemonDetails = ({ pokeDetailsName }) => {
    const [pokemonDetails, setPokemonDetails] = useState()
    const [pokemonTypes, setPokemonTypes] = useState([])
    const [pokemonAbilitiesDescription, setPokemonAbilitiesDescription] = useState()

    useEffect(() => {
        fetch(`${url}${pokeDetailsName}`)
            .then((response) => response.json())
            .then((json) => setPokemonDetails(json))


        fetch(`${url}${pokeDetailsName}`)
            .then((response) => response.json())
            .then(json => json.types)
            .then(types => setPokemonTypes(types))
            .then(setPokemonAbilitiesDescription(
                getAbilitiesDescription(`${url}${pokeDetailsName}`))
            )

        // fetch('https://pokeapi.co/api/v2/ability/65/')
        //     .then((response) => response.json())
        //     .then(json => json.flavor_text_entries)
        //     .then(description => setPokemonAbilitiesDescription(description))




    }, [])

    { console.log(pokemonAbilitiesDescription) }
    // getAbilitiesDescription(`${url}${pokeDetailsName}`)
    return (
        <div>
            {pokemonDetails && (
                <div>
                    <Link to={'/'}>
                        <CardWrapper>
                            <C.Card>
                                <div>
                                    <C.Number>#{pokemonDetails.id}</C.Number>
                                    <C.Types>
                                        {pokemonTypes.map((type, index) => <span key={index}>{type.type.name}</span>)}
                                    </C.Types>

                                </div>
                                <C.Sprite src={pokemonDetails.sprites.other['official-artwork'].front_default}></C.Sprite>
                                <C.Name>{pokemonDetails.name}</C.Name>
                            </C.Card>
                        </CardWrapper>
                    </Link>
                    {pokemonDetails.abilities.map((ability, index) =>
                        <p key={index}>
                            habilidades: {ability.ability.name} blá blá blé
                            {pokemonAbilitiesDescription[0]}
                        </p>
                    )}
                    {/* {pokemonAbilitiesDescription.url.map((url, index) =>
                        <p key={index}>

                        </p>
                    )} */}


                    {pokemonDetails.moves.map((move, index) =>
                        <p key={index}>
                            moves: {move.move.name}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}