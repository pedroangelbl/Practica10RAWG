/* Obtener todos los juegos */
export const getGames = async (setGames) => {
    try {
        const response = await fetch('https://api.rawg.io/api/games?key=2f31c1c1150b4b6d99401f0eb046dee0');
        const data = await response.json()
        setGames(data.results)
    } catch (error) {
        console.error('Error al obtener los juegos', error)
    }
}

/* Obtener detalles de un juego */
export const getGame = (setGame,id) => {
    fetch(`https://api.rawg.io/api/games/${id}?key=2f31c1c1150b4b6d99401f0eb046dee0`)
        .then(response => response.json())
        .then(data => setGame(data))
        .catch(error => console.error('Error al realizar la solicitud', error))
}