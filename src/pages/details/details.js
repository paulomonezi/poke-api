import { PokemonDetails } from "../../services/pokeapi"
import { useParams } from "react-router-dom"
import { Header } from "../../components/header/header"
import { Footer } from "../../components/footer/footer"

const Details = () => {
   const { name } = useParams()

   return (
      <>
         <Header />
         <PokemonDetails pokeDetailsName={name} />
         <Footer />
      </>
   )
}

export { Details }