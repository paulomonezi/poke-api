const baseUrl = 'https://pokeapi.co/api/v2/'
const initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'


const getImage = (url) => {
    const response = fetch(initialUrl)
        .then(response => {
            return response.json()
        }).then(jsonResponse => {

            fetch(jsonResponse.results[0].url)
                .then(pokemon => {

                    return pokemon.json()
                }).then(pokemonData => {
                    var pokeImg = pokemonData.sprites.other['official-artwork'].front_default
                    console.log(pokeImg)
                })

        })
}

export { getImage }
// async function getPokeImage(){
//     const response = fetch(initialUrl)
//     return await response.json()
// }