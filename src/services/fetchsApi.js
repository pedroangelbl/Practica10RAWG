const API_KEY = "2f31c1c1150b4b6d99401f0eb046dee0"
const BASE_URL = "https://api.rawg.io/api"

// Función para obtener juegos populares
export const getGames = async () => {
  try {
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=20`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error fetching games:", error)
    throw error
  }
}

// Función para obtener detalles de un juego específico
export const getGameDetails = async (gameId) => {
  try {
    const response = await fetch(`${BASE_URL}/games/${gameId}?key=${API_KEY}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching game details:", error)
    throw error
  }
}

// Función para buscar juegos según el término de búsqueda
export const searchGames = async (searchTerm) => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&search=${searchTerm}&page_size=20`)

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
    }

        const data = await response.json()
        return data.results
    } catch (error) {
        console.error("Error searching games:", error)
        throw error
    }
}


// Función para obtener juegos por género
export const getGamesByGenre = async (genreId) => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&genres=${genreId}&page_size=20`)

        if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()
        return data.results
    } catch (error) {
        console.error("Error fetching games by genre:", error)
        throw error
    }
}
  
// Función para obtener próximos lanzamientos
export const getUpcomingGames = async () => {
    try {
        // Obtener la fecha actual y formatearla como YYYY-MM-DD
        const today = new Date()
        const formattedDate = today.toISOString().split("T")[0]

        // Obtener juegos que se lanzarán después de hoy
        const response = await fetch(
        `${BASE_URL}/games?key=${API_KEY}&dates=${formattedDate},2025-12-31&ordering=released&page_size=20`,
        )

        if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()
        return data.results
    } catch (error) {
        console.error("Error fetching upcoming games:", error)
        throw error
    }
}

// Función para obtener juegos por publisher
export const getGamesByPublisher = async (publisherId) => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&publishers=${publisherId}&page_size=20`)

        if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error fetching games by publisher:", error)
        throw error
    }
}

// Función para obtener detalles de un publisher
export const getPublisherDetails = async (publisherId) => {
    try {
        const response = await fetch(`${BASE_URL}/publishers/${publisherId}?key=${API_KEY}`)

        if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error fetching publisher details:", error)
        throw error
    }
}

// Función para obtener juegos por tag
export const getGamesByTag = async (tagId) => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&tags=${tagId}&page_size=20`)

        if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error fetching games by tag:", error)
        throw error
    }
}

// Función para obtener detalles de un tag
export const getTagDetails = async (tagId) => {
    try {
        const response = await fetch(`${BASE_URL}/tags/${tagId}?key=${API_KEY}`)

        if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error fetching tag details:", error)
        throw error
    }
}

// Función para obtener lista de publishers
export const getPublishers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}&page_size=20`)

        if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()
        return data.results
    } catch (error) {
        console.error("Error fetching publishers:", error)
        throw error
    }
    }

// Función para buscar publishers
export const searchPublishers = async (searchTerm) => {
    try {
        const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}&search=${searchTerm}&page_size=20`)

        if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()
        return data.results
    } catch (error) {
        console.error("Error searching publishers:", error)
        throw error
    }
}