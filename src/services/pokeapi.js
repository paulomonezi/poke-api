import React, { useEffect, useState } from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import * as C from "../components/card/styles"
import { ThemeContext, themes } from "../contexts/theme-context"
import loadingImage from '../images/loading/loading.gif'


const url = 'https://pokeapi.co/api/v2/pokemon/'
const urlList = 'https://pokeapi.co/api/v2/pokemon?limit=500&offset=0'

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

    return await abilityDescription
}

export const GetPokemonList = () => {
    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        const fetchData = async () => {
            const pokemons = await getPokemons()
            const pokemonNames = pokemons.map(pokemon => pokemon.name)
            const paginatedPokemons = pokemonNames.map(async (pokemonName) => await getPokemonData(pokemonName))
            const allPromises = await Promise.all(paginatedPokemons)
            setPokemonList(allPromises)
            
            setIsLoading(false)
        }
        fetchData()

    }, [])

    if (isLoading) {
        return (
          <div>
            <img src={loadingImage} alt="loading gif"/>
            <span>Loading...</span>
          </div>
        );
      }
    return (
        <>

            {
                pokemonList.map((pokemon, index) =>
                    <Link key={index} to={`/pokemon/${pokemon.name}`}>
                        <C.CardWrapper >
                            <C.Card style={{color: theme.color, backgroundColor: theme.background}}>
                                <div>
                                    <C.Types>
                                        {pokemon.types.map((type, index) => <span key={index}>{type.type.name}</span>)}
                                    </C.Types>
                                    <C.Number>#{pokemon.id}</C.Number>
                                </div>
                                <C.Sprite src={pokemon.sprites.other['official-artwork'].front_default}></C.Sprite>
                                <C.Name>{pokemon.name}</C.Name>
                            </C.Card>
                        </C.CardWrapper>
                    </Link>
                )
            
            }
        </>
    )
}

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

        fetch('https://pokeapi.co/api/v2/ability/65/')
            .then((response) => response.json())
            .then(json => json.flavor_text_entries)
            .then(description => setPokemonAbilitiesDescription(description[0].flavor_text))
    }, [])

    return (
        <div>
            {pokemonDetails && (
                <div>
                    <Link to={'/'}>
                        <C.CardWrapper>
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
                        </C.CardWrapper>
                    </Link>
                    {pokemonDetails.abilities.map((ability, index) =>
                        <p key={index}>
                            habilidades: {ability.ability.name} blá blá blé
                            {/* Rendering just the first letter, see whats hapening */}
                            {pokemonAbilitiesDescription[0]}
                        </p>
                    )}
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

export { getPokemonData }