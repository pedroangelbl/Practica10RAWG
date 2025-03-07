// events.js
// Añade o modifica los eventos al gusto
// Las imágenes pueden ser las que tengas en la carpeta public
export const events = [
    {
        id: 1,
        title: "Gaming Expo 2025",
        location: "New York",
        image: "https://next-play.com.au/wp-content/uploads/2024/06/The-Game-Expo-2025.png",
    },
    {
        id: 2,
        title: "Indie Game Developers Meetup",
        location: "San Francisco",
        image: "https://img.sxsw.com/2013/spg_images/IAP15624.png",
    },
    {
        id: 3,
        title: "Esports Championship",
        location: "Los Angeles",
        image: "https://weezevent.com/wp-content/uploads/2018/10/15140712/compet_esport.jpg",
    },
];

// Simula una petición API que devuelve los eventos después de un pequeño retraso.
export const fetchEvents = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(events);
        }, 500); // Simula un retraso de 500 milisegundos
    });
};