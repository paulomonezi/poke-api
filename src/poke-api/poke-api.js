const baseUrl = 'https://pokeapi.co/api/v2/'
const initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'

const response = fetch(initialUrl)
    .then(response => {
        return response.json()
    }).then(json =>{
        console.log(json)
    })

// function fetchPokemonData(pokemon){
//     baseUrl
// }

export { baseUrl, initialUrl }

