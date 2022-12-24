import React, { useEffect, useState } from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import * as C from "../components/card/styles"
import { ThemeContext, themes } from "../contexts/theme-context"
import loadingImage from '../images/loading/loading.gif'

const url = 'https://pokeapi.co/api/v2/pokemon/'
const urlList = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'

const getPokemonData = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemon = response.json()
    return pokemon
}

const getPokemons = async () => {
    const response = await fetch(urlList)
    const pokemonList = await response.json()
    return pokemonList.results
}

const getAbilitiesDescription = async (url) => {
    const response = await fetch(url)
    const abilitiesList = await response.json()
    const abilitiesUrl = abilitiesList.abilities.map((ability) => ability.ability.url)
    const fetchAbilities = await fetch(abilitiesUrl[0])
    const abilityArray = await fetchAbilities.json()
    return abilityArray.flavor_text_entries[0].flavor_text
}

export const GetPokemonList = () => {
    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        const fetchData = async () => {
            const pokemons = await getPokemons()
            const pokemonNames = pokemons.map((pokemon) => pokemon.name)
            const paginatedPokemons = pokemonNames.map(async (pokemonName) =>
                await getPokemonData(pokemonName)
            )
            const allPromises = await Promise.all(paginatedPokemons)
            setPokemonList(allPromises)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    if (isLoading) {
        return (
            <div>
                <img src={loadingImage} alt="loading gif" />
                <span>Loading...</span>
            </div>
        )
    }
    return (
        <>
            {pokemonList.map((pokemon, index) => (
                <Link key={index} to={`/pokemon/${pokemon.name}`}>
                    <C.CardWrapper>
                        <C.Card style={{ color: theme.color, backgroundColor: theme.background }}>
                            <div>
                                <C.Types>
                                    {pokemon.types.map((type, index) => (
                                        <span key={index}>{type.type.name}</span>
                                    ))}
                                </C.Types>
                                <C.Number>#{pokemon.id}</C.Number>
                            </div>
                            <C.Sprite src={pokemon.sprites.other['official-artwork'].front_default}></C.Sprite>
                            <C.Name>{pokemon.name}</C.Name>
                        </C.Card>
                    </C.CardWrapper>
                </Link>
            ))}
        </>
    )
}

export const PokemonDetails = ({ pokeDetailsName }) => {
    const [pokemonDetails, setPokemonDetails] = useState()
    const [pokemonTypes, setPokemonTypes] = useState([])
    const [pokemonAbilityName, setPokemonAbilityName] = useState([])
    const [pokemonAbilitiesDescription, setPokemonAbilitiesDescription] = useState([])
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${url}${pokeDetailsName}`)
            const json = await response.json()
            setPokemonDetails(json)
            setPokemonTypes(json.types)
            const abilitiesResponse = await fetch(`${url}${pokeDetailsName}`)
            const abilitiesJson = await abilitiesResponse.json()
            const abilitiesUrl = abilitiesJson.abilities.map((ability) => ability.ability.url)
            const abilityArray = await fetch(abilitiesUrl[0]).
                then((res) => res.json())
            const abilityName = [abilityArray.name]
            setPokemonAbilitiesDescription(`${abilityArray.flavor_text_entries[0].flavor_text}`)
            setPokemonAbilityName(abilityName)
        }
        fetchData()
    }, [pokeDetailsName])

    if (!pokemonDetails || !pokemonTypes || !pokemonAbilitiesDescription || !pokemonAbilityName) {
        return null
    }

    return (
        <div>
            <Link to={'/'}>
                <C.CardWrapper>
                    <C.Card style={{ color: theme.color, backgroundColor: theme.background }}>
                        <C.Sprite src={pokemonDetails.sprites.front_default}></C.Sprite>
                        {/* <C.Name>{pokemonDetails.name}</C.Name>
                        <C.Number>#{pokemonDetails.id}</C.Number>
                        <C.Types>
                            {pokemonTypes.map((type, index) => (
                                <span key={index}>{type.type.name}</span>
                            ))}
                        </C.Types> */}
                        <C.Types>{`${pokemonAbilitiesDescription}`}</C.Types>
                        
                        <C.Name>{pokemonAbilityName.map((name, index) => (<span key={index}>{name}</span>))}</C.Name>
                    </C.Card>
                </C.CardWrapper>
            </Link>
        </div>
    )
}