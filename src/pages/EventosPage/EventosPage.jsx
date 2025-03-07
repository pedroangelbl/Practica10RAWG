import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../events';
import { setEvents, addUserEvent, removeUserEvent } from '../../redux/eventRedux/eventSlice';

export default function Eventos() {
    const dispatch = useDispatch();
    const { events, userEvents } = useSelector(state => state.events);

    useEffect(() => {
        fetchEvents().then(data => dispatch(setEvents(data)));
    }, [dispatch]);

    const handleJoinEvent = (event) => {
        dispatch(addUserEvent(event));
    };

    const handleLeaveEvent = (eventId) => {
        dispatch(removeUserEvent(eventId));
    };

    return (
        <section className="flex flex-col items-center gap-10 py-10">
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-center">Eventos de Videojuegos</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl px-5">
                {events.map(event => (
                    <div key={event.id} className="card group block rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                        <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-white truncate">{event.title}</h2>
                            <p className="text-gray-400">{event.location}</p>
                            <div className="mt-4">
                                {userEvents.some(ue => ue.id === event.id) ? (
                                    <button
                                        onClick={() => handleLeaveEvent(event.id)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                    >
                                        Cancelar participación
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleJoinEvent(event)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Apuntarse
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}