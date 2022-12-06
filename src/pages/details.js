import { PokemonDetails } from "../services/pokeapi"
import { useParams } from "react-router-dom"

const Details = () => {
   const { name } = useParams()

   return <PokemonDetails pokeDetailsName={name} />
}

export { Details }